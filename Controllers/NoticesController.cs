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
using System.Security.Claims;
using Newtonsoft.Json;
using CloudBreadAdminWebAuth;

namespace CloudBread_Admin_Web.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using CloudBread_Admin_Web;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Notices>("Notices");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class NoticesController : ODataController
    {
        private CBEntities db = new CBEntities();
        Logging.CBLoggers logMsg = new Logging.CBLoggers();

        // GET: odata/Notices
        [EnableQuery]
        public IQueryable<Notices> GetNotices()
        {
            // Get the sid of the current user
            string sid = CBAuth.getMemberID(this.User as ClaimsPrincipal);

            logMsg.memberID = sid;
            logMsg.Level = "INFO";
            logMsg.Logger = "Notices-GET";
            logMsg.Message = this.Request.RequestUri.PathAndQuery.ToString();
            Logging.RunLog(logMsg);


            return db.Notices;
        }

        // GET: odata/Notices(5)
        [EnableQuery]
        public SingleResult<Notices> GetNotices([FromODataUri] string key)
        {
            // Get the sid of the current user
            string sid = CBAuth.getMemberID(this.User as ClaimsPrincipal);

            logMsg.memberID = sid;
            logMsg.Level = "INFO";
            logMsg.Logger = "Notices-GETbyID";
            logMsg.Message = this.Request.RequestUri.PathAndQuery.ToString();
            Logging.RunLog(logMsg);

            return SingleResult.Create(db.Notices.Where(notices => notices.NoticeID == key));
        }

        // PUT: odata/Notices(5)
        public IHttpActionResult Put([FromODataUri] string key, Delta<Notices> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Notices notices = db.Notices.Find(key);
            if (notices == null)
            {
                return NotFound();
            }

            patch.Put(notices);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoticesExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // Get the sid of the current user
            string sid = CBAuth.getMemberID(this.User as ClaimsPrincipal);

            logMsg.memberID = sid;
            logMsg.Level = "INFO";
            logMsg.Logger = "Notices-PUT";
            logMsg.Message = JsonConvert.SerializeObject(patch);
            Logging.RunLog(logMsg);

            return Updated(notices);
        }

        // POST: odata/Notices
        public IHttpActionResult Post(Notices notices)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Notices.Add(notices);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (NoticesExists(notices.NoticeID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            // Get the sid of the current user
            string sid = CBAuth.getMemberID(this.User as ClaimsPrincipal);

            logMsg.memberID = sid;
            logMsg.Level = "INFO";
            logMsg.Logger = "Notices-POST";
            logMsg.Message = JsonConvert.SerializeObject(notices);
            Logging.RunLog(logMsg);

            return Created(notices);
        }

        // PATCH: odata/Notices(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] string key, Delta<Notices> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Notices notices = db.Notices.Find(key);
            if (notices == null)
            {
                return NotFound();
            }

            patch.Patch(notices);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoticesExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // Get the sid of the current user
            string sid = CBAuth.getMemberID(this.User as ClaimsPrincipal);

            logMsg.memberID = sid;
            logMsg.Level = "INFO";
            logMsg.Logger = "Notices-PATCH";
            logMsg.Message = JsonConvert.SerializeObject(patch);
            Logging.RunLog(logMsg);

            return Updated(notices);
        }

        // DELETE: odata/Notices(5)
        public IHttpActionResult Delete([FromODataUri] string key)
        {
            Notices notices = db.Notices.Find(key);
            if (notices == null)
            {
                return NotFound();
            }

            db.Notices.Remove(notices);
            db.SaveChanges();

            // Get the sid of the current user
            string sid = CBAuth.getMemberID(this.User as ClaimsPrincipal);

            logMsg.memberID = sid;
            logMsg.Level = "INFO";
            logMsg.Logger = "Notices-DELETE";
            logMsg.Message = key;
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

        private bool NoticesExists(string key)
        {
            return db.Notices.Count(e => e.NoticeID == key) > 0;
        }
    }
}
