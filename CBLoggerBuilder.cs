using CloudBreadAdminWebAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;

namespace CloudBread_Admin_Web
{
    public class CBLoggerBuilder
    {
        public enum LoggerType { GET, GETbyIID, PUT, POST, PATCH, DELETE };
        public enum LevelType { INFO };

        public static void Build(ref Logging.CBLoggers logMsg, ClaimsPrincipal claims,
            string controllerName, LevelType levelType, LoggerType loggerType,  string message)
        {
            logMsg.memberID = CBAuth.getMemberID(claims);
            logMsg.Level = levelType.ToString();
            logMsg.Logger = controllerName + "-" + loggerType.ToString();
            logMsg.Message = message;
        }
    }
}