using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.OData.Builder;
using System.Web.Http.OData.Extensions;
using CloudBread_Admin_Web;

namespace CloudBread_Admin_Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            /// added config Odata service
            ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
            builder.EntitySet<AdminMembers>("AdminMembers");
            builder.EntitySet<CloudBreadAdminLog>("CloudBreadAdminLogs");
            builder.EntitySet<CloudBreadErrorLog>("CloudBreadErrorLogs");
            builder.EntitySet<CloudBreadLog>("CloudBreadLogs");
            builder.EntitySet<CouponMember>("CouponMembers");
            builder.EntitySet<Coupon>("Coupons");
            builder.EntitySet<GameEventMember>("GameEventMembers");
            builder.EntitySet<GameEvents>("GameEvents");
            builder.EntitySet<GiftDepositories>("GiftDepositories");
            builder.EntitySet<ItemLists>("ItemLists");
            builder.EntitySet<MemberAccountBlockLog>("MemberAccountBlockLogs");
            builder.EntitySet<MemberGameInfoes>("MemberGameInfoes");
            builder.EntitySet<MemberGameInfoStages>("MemberGameInfoStages");
            builder.EntitySet<MemberItemPurchases>("MemberItemPurchases");
            builder.EntitySet<MemberItems>("MemberItems");
            builder.EntitySet<Members>("Members");
            builder.EntitySet<Notices>("Notices");
            builder.EntitySet<ServerInfo>("ServerInfoes");
            builder.EntitySet<StatsData>("StatsDatas");

            config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());

            /// added for global error detail description by default
            config.IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Always;

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
