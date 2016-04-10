using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using CloudBread_Admin_Web;
using CloudBreadAdminWebAuth;
using System.Security.Claims;
using Newtonsoft.Json;

namespace CloudBread_Admin_Web.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using CloudBread_Admin_Web;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<AdminMembers>("AdminMembers");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class AdminMembersController : ODataController
    {
        private CBEntities db = new CBEntities();
        Logging.CBLoggers logMsg = new Logging.CBLoggers();

        const string controllerName = "AdminMembers";

        // GET: odata/AdminMembers
        [EnableQuery]
        public IQueryable<AdminMembers> GetAdminMembers()
        {
            CBLoggerBuilder.Build(ref logMsg, this.User as ClaimsPrincipal, controllerName, 
                CBLoggerBuilder.LevelType.INFO, CBLoggerBuilder.LoggerType.GET, this.Request.RequestUri.PathAndQuery.ToString());
            Logging.RunLog(logMsg);


            return db.AdminMembers;
        }

        // GET: odata/AdminMembers(5)
        [EnableQuery]
        public SingleResult<AdminMembers> GetAdminMembers([FromODataUri] string key)
        {
            string sid = CBAuth.getMemberID(this.User as ClaimsPrincipal);

            logMsg.memberID = sid;
            logMsg.Level = "INFO";
            logMsg.Logger = "AdminMembers-GETbyID";
            logMsg.memberID = this.Request.RequestUri.PathAndQuery.ToString();
            Logging.RunLog(logMsg);

            return SingleResult.Create(db.AdminMembers.Where(adminMembers => adminMembers.AdminMemberID == key));
        }

        // PUT: odata/AdminMembers(5)
        public IHttpActionResult Put([FromODataUri] string key, Delta<AdminMembers> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            AdminMembers adminMembers = db.AdminMembers.Find(key);
            if (adminMembers == null)
            {
                return NotFound();
            }

            patch.Put(adminMembers);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdminMembersExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            string sid = CBAuth.getMemberID(this.User as ClaimsPrincipal);

            logMsg.memberID = sid;
            logMsg.Level = "INFO";
            logMsg.Logger = "AdminMembers-PUT";
            logMsg.memberID = JsonConvert.SerializeObject(patch);
            Logging.RunLog(logMsg);

            return Updated(adminMembers);
        }

        // POST: odata/AdminMembers
        public IHttpActionResult Post(AdminMembers adminMembers)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AdminMembers.Add(adminMembers);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (AdminMembersExists(adminMembers.AdminMemberID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            string sid = CBAuth.getMemberID(this.User as ClaimsPrincipal);

            logMsg.memberID = sid;
            logMsg.Level = "INFO";
            logMsg.Logger = "AdminMembers-POST";
            logMsg.memberID = JsonConvert.SerializeObject(adminMembers);
            Logging.RunLog(logMsg);

            return Created(adminMembers);
        }

        // PATCH: odata/AdminMembers(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] string key, Delta<AdminMembers> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            AdminMembers adminMembers = db.AdminMembers.Find(key);
            if (adminMembers == null)
            {
                return NotFound();
            }

            patch.Patch(adminMembers);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdminMembersExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            string sid = CBAuth.getMemberID(this.User as ClaimsPrincipal);

            logMsg.memberID = sid;
            logMsg.Level = "INFO";
            logMsg.Logger = "AdminMembers-PATCH";
            logMsg.memberID = JsonConvert.SerializeObject(patch);
            Logging.RunLog(logMsg);

            return Updated(adminMembers);
        }

        // DELETE: odata/AdminMembers(5)
        public IHttpActionResult Delete([FromODataUri] string key)
        {
            AdminMembers adminMembers = db.AdminMembers.Find(key);
            if (adminMembers == null)
            {
                return NotFound();
            }

            db.AdminMembers.Remove(adminMembers);
            db.SaveChanges();

            string sid = CBAuth.getMemberID(this.User as ClaimsPrincipal);

            logMsg.memberID = sid;
            logMsg.Level = "INFO";
            logMsg.Logger = "AdminMembers-DELETE";
            logMsg.memberID = key;
            Logging.RunLog(logMsg);

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AdminMembersExists(string key)
        {
            return db.AdminMembers.Count(e => e.AdminMemberID == key) > 0;
        }
    }
}
