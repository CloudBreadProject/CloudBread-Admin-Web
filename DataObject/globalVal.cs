using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;

namespace CloudBreadAdminWeb.globals
{
    public class globalVal
    {
        public static string DBConnectionString = ConfigurationManager.ConnectionStrings["CloudBreadDBConString"].ConnectionString;
        public static string StorageConnectionString = ConfigurationManager.ConnectionStrings["CloudBreadStorageConString"].ConnectionString;
        public static string CloudBreadLoggerSetting = ConfigurationManager.AppSettings["CloudBreadLoggerSetting"].ToString();
        public static string CloudBreadCryptSetting = ConfigurationManager.AppSettings["CloudBreadCryptSetting"].ToString();
        public static string CloudBreadCryptKey = ConfigurationManager.AppSettings["CloudBreadCryptKey"].ToString();       // 16자가 아니면 padding 처리
        public static string CloudBreadCryptIV = ConfigurationManager.AppSettings["CloudBreadCryptIV"].ToString();     // 16자가 아니면 padding 처리
        //public static int CloudBreadAdminWebListPageSize = int.Parse(ConfigurationManager.AppSettings["CloudBreadAdminWebListPageSize"].ToString());
        public static int conRetryCount = int.Parse(ConfigurationManager.AppSettings["CloudBreadconRetryCount"]);    /// adding v2.0.0
        public static int conRetryFromSeconds = int.Parse(ConfigurationManager.AppSettings["CloudBreadconRetryFromSeconds"]);     /// adding v2.0.0
    }
}