using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using Microsoft.WindowsAzure.Storage.Queue;
using Microsoft.WindowsAzure.Storage.RetryPolicies;
using CloudBreadAdminWeb.globals;

namespace CloudBread_Admin_Web
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);

            try
            {
                /// On start up, CreateIfNotExists CloudBreadAdminLog table on Azure Table Storage
                /// On start up, CreateIfNotExists messagestoadminlog table on Azure Queue Service
                if (globalVal.StorageConnectionString != "")
                {
                    /// this table is used for CloudBread admin log saving
                    /// Azure Storage connection retry policy
                    var retryPolicy = new ExponentialRetry(TimeSpan.FromSeconds(2), 10);
                    CloudStorageAccount storageAccount = CloudStorageAccount.Parse(globalVal.StorageConnectionString);
                    CloudTableClient tableClient = storageAccount.CreateCloudTableClient();
                    tableClient.DefaultRequestOptions.RetryPolicy = retryPolicy;
                    var cloudTable = tableClient.GetTableReference("CloudBreadAdminLog");
                    cloudTable.CreateIfNotExists();

                    /// this queue is used for CloudBread queue method admin log saving
                    CloudQueueClient queueClient = storageAccount.CreateCloudQueueClient();
                    queueClient.DefaultRequestOptions.RetryPolicy = retryPolicy;
                    CloudQueue queue = queueClient.GetQueueReference("messagestoadminlog");      /// must be lowercase
                    queue.CreateIfNotExists();

                }

            }
            catch (System.Exception ex)
            {

                throw ex;
            }
        }
    }
}
