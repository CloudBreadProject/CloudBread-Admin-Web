/**
* @file CBLogger.cs
* @brief Processing CloudBread log related task class. \n
* @author Dae Woo Kim
* @todo class structure change. AQS, ATS logic change. async model change
*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;

using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using Microsoft.WindowsAzure.Storage.Queue;
using Microsoft.WindowsAzure.Storage.RetryPolicies;

//using System.Web.Configuration;
using Newtonsoft.Json;
using CloudBreadAdminWeb.globals;
using Microsoft.Practices.TransientFaultHandling;
using Microsoft.Practices.EnterpriseLibrary.WindowsAzure.TransientFaultHandling.SqlAzure;
using System.Web.Http.OData;
using CloudBreadAdminWebAuth;
using System.Security.Claims;
//using CloudBreadRedis;

namespace CloudBread_Admin_Web
{
    public class Logging
    {

        public class CBLoggerBuilder
        {
            public enum LoggerType { GET, GETbyIID, PUT, POST, PATCH, DELETE };
            public enum LevelType { INFO };

            public static Logging.CBLoggers Build(string sid, LevelType level, string logger, string message)
            {
                Logging.CBLoggers logMessage = new Logging.CBLoggers();

                logMessage.memberID = sid;
                logMessage.Level = level.ToString();
                logMessage.Logger = logger;
                logMessage.Message = message;

                return logMessage;
            }

            private string _controllerTag;

            public CBLoggerBuilder(string controllerTag)
            {
                this._controllerTag = controllerTag;
            }

            public Logging.CBLoggers build(ODataController controller, LevelType level, LoggerType type, string message = null)
            {
                string sid = CBAuth.getMemberID(controller.User as ClaimsPrincipal);
                string logger = _controllerTag + "-" + type.ToString();

                if (message == null)
                {
                    switch (type)
                    {
                        case LoggerType.GET:
                        case LoggerType.GETbyIID:
                            message = controller.Request.RequestUri.PathAndQuery.ToString();
                            break;
                        default:
                            message = "No Message";
                            break;
                    }
                }

                return CBLoggerBuilder.Build(sid, level, logger, message);
            }
        }

        /**
        * @class CBLoggers 
        * @brief Processing CloudBread log related task class. \n
        */
        public class CBLoggers
        {
            public string memberID { get; set; }
            public string jobID { get; set; }       /// Used in Scheduled job 
            public string Date { get; set; }
            public string Thread { get; set; }
            public string Level { get; set; }
            public string Logger { get; set; }
            public string Message { get; set; }
            public string Exception { get; set; }
        }

        /**
        * @class CBATSMessageEntity 
        * @brief Entity class for log structure - including ATS \n
        */
        public class CBATSMessageEntity : TableEntity
        {
            public CBATSMessageEntity(string pkey, string rkey)
            {
                this.PartitionKey = pkey;
                this.RowKey = rkey;
            }
            public string MemberID { get; set; }
            public string jobID { get; set; }
            public string Date { get; set; }        /// todo : change to datetime. w/ CB v2 project
            public string Thread { get; set; }
            public string Level { get; set; }
            public string Logger { get; set; }
            public string Message { get; set; }
            public string Exception { get; set; }

        }

        /**
        * @brief Save log task processor. \n
        */
        public static bool RunLog(CBLoggers message)
        {
            if (globalVal.CloudBreadLoggerSetting != "")
            {
                if (string.IsNullOrEmpty(message.memberID))
                {
                    message.memberID = "";      /// in case of non-member triggered job
                }

                /// critical error case, save in ATS CloudBreadErrorLog 
                if (message.Level.ToUpper() == "ERROR")
                {
                    try
                    {
                        /// Save error log on Azure Table Storage
                        {
                            /// Azure Table Storage connection retry policy
                            var tableStorageRetryPolicy = new ExponentialRetry(TimeSpan.FromSeconds(2), 10);
                            CloudStorageAccount storageAccountT = CloudStorageAccount.Parse(globalVal.StorageConnectionString);
                            CloudTableClient tableClient = storageAccountT.CreateCloudTableClient();
                            tableClient.DefaultRequestOptions.RetryPolicy = tableStorageRetryPolicy;
                            CloudTable table = tableClient.GetTableReference("CloudBreadErrorLog");
                            CBATSMessageEntity Message = new CBATSMessageEntity(message.memberID, Guid.NewGuid().ToString());
                            Message.jobID = message.jobID;
                            Message.Date = DateTimeOffset.UtcNow.ToString("yyyy-MM-ddTHH:mm:ss.fffffffZ");
                            //Message.Date = DateTimeOffset.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ");
                            Message.Thread = message.Thread;
                            Message.Level = message.Level;
                            Message.Logger = message.Logger;
                            Message.Message = message.Message;
                            Message.Exception = message.Exception;
                            TableOperation insertOperation = TableOperation.Insert(Message);
                            table.Execute(insertOperation);
                        }
                    }
                    catch (Exception)
                    {
                        /// Catch fail to log on database. Most case database connection or login fail issue.  
                        throw;
                    }
                }
                else
                {


                    /// Regarding to web.config logger settting, save logs on specific storage
                    try
                    {
                        switch (globalVal.CloudBreadLoggerSetting)
                        {
                            case "SQL":
                                /// Save log on SQL
                                string strQuery = string.Format("insert into dbo.CloudBreadAdminLog(memberid, jobID, [Thread], [Level], [Logger], [Message], [Exception]) values('{0}','{1}','{2}','{3}','{4}','{5}','{6}')",
                                    message.memberID,
                                    message.jobID,
                                    message.Thread,
                                    message.Level,
                                    message.Logger,
                                    message.Message,
                                    message.Exception
                                    );

                                /// Database connection retry policy
                                RetryPolicy retryPolicy = new RetryPolicy<SqlAzureTransientErrorDetectionStrategy>(globalVal.conRetryCount, TimeSpan.FromSeconds(globalVal.conRetryFromSeconds));
                                SqlConnection connection = new SqlConnection(globalVal.DBConnectionString);
                                {
                                    connection.OpenWithRetry(retryPolicy);
                                    SqlCommand command = new SqlCommand(strQuery, connection);
                                    int rowcount = command.ExecuteNonQueryWithRetry(retryPolicy);
                                    connection.Close();
                                    break;
                                }

                            case "ATS":
                                /// Save log on Azure Table Storage
                                {
                                    /// Azure Table Storage connection retry policy
                                    var tableStorageRetryPolicy = new ExponentialRetry(TimeSpan.FromSeconds(2), 10);
                                    CloudStorageAccount storageAccountT = CloudStorageAccount.Parse(globalVal.StorageConnectionString);
                                    CloudTableClient tableClient = storageAccountT.CreateCloudTableClient();
                                    tableClient.DefaultRequestOptions.RetryPolicy = tableStorageRetryPolicy;
                                    CloudTable table = tableClient.GetTableReference("CloudBreadAdminLog");
                                    CBATSMessageEntity Message = new CBATSMessageEntity(message.memberID, Guid.NewGuid().ToString());       //memberid를 파티션키로 쓴다.
                                    Message.jobID = message.jobID;
                                    Message.Date = DateTimeOffset.UtcNow.ToString("yyyy-MM-ddTHH:mm:ss.fffffffZ");
                                    Message.Thread = message.Thread;
                                    Message.Level = message.Level;
                                    Message.Logger = message.Logger;
                                    Message.Message = message.Message;
                                    Message.Exception = message.Exception;
                                    TableOperation insertOperation = TableOperation.Insert(Message);
                                    table.Execute(insertOperation);
                                    break;
                                }

                            /// AQS does not need CloudBread-Admin-Web
                            //case "AQS":
                            //    /// Save log on Azure Queue Storage
                            //    {
                            //        /// Azure Queue Storage connection retry policy
                            //        var queueStorageRetryPolicy = new ExponentialRetry(TimeSpan.FromSeconds(2), 10);
                            //        CloudStorageAccount storageAccount = CloudStorageAccount.Parse(globalVal.StorageConnectionString);
                            //        CloudQueueClient queueClient = storageAccount.CreateCloudQueueClient();
                            //        queueClient.DefaultRequestOptions.RetryPolicy = queueStorageRetryPolicy;
                            //        CloudQueue queue = queueClient.GetQueueReference("messagestoadminlog");      /// must be lower case
                            //        CBATSMessageEntity Message = new CBATSMessageEntity(message.memberID, Guid.NewGuid().ToString());
                            //        Message.jobID = message.jobID;
                            //        Message.Date = DateTimeOffset.UtcNow.ToString("yyyy-MM-ddTHH:mm:ss.fffffffZ");
                            //        Message.Thread = message.Thread;
                            //        Message.Level = message.Level;
                            //        Message.Logger = message.Logger;
                            //        Message.Message = message.Message;
                            //        Message.Exception = message.Exception;
                            //        CloudQueueMessage Qmessage = new CloudQueueMessage(JsonConvert.SerializeObject(Message));
                            //        queue.AddMessage(Qmessage);
                            //        break;
                            //    }

                            /// redis does not need CloudBread-Admin-Web
                            //case "redis":
                            //    /// todolist - save log on Azure Redis Cache
                            //    /// yyyymmdd:memberid:Controller:GUID
                            //    {
                            //        string redisKey = "";
                            //        string redisVal = "";
                            //        message.Date = DateTimeOffset.UtcNow.ToString("yyyy-MM-ddTHH:mm:ss.fffffffZ");
                            //        redisKey = DateTime.Now.ToUniversalTime().ToString("yyyyMMddHHmm") + ":" + message.memberID + ":" + message.Logger + ":" + Guid.NewGuid().ToString();   // guid - too long key size
                            //        redisVal = JsonConvert.SerializeObject(message);
                            //        CBRedis.saveRedisLog(redisKey, redisVal, globalVal.CloudBreadGameLogExpTimeDays);
                            //    }
                            //    break;

                            //case "DocDB":
                            //    /// @todo save log data on Azure DocumentDB
                            //    break;

                            default:
                                /// case do nothing
                                break;
                        }
                    }
                    catch (Exception)
                    {
                        /// catch save log error here.
                        throw;
                    }
                }
            }
                return true;
        }
    }
}
