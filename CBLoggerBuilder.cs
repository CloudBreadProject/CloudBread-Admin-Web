using CloudBreadAdminWebAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Http.OData;

namespace CloudBread_Admin_Web
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
}