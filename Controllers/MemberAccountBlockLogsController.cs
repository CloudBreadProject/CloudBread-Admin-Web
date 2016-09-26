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
using Newtonsoft.Json;

namespace CloudBread_Admin_Web.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using CloudBread_Admin_Web;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<MemberAccountBlockLog>("MemberAccountBlockLogs");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class MemberAccountBlockLogsController : ODataController
    {
        private CBEntities db = new CBEntities();
        Logging.CBLoggerBuilder logBuilder = new Logging.CBLoggerBuilder("MemberAcountBlockLogs");

        // GET: odata/MemberAccountBlockLogs
        [EnableQuery]
        public IQueryable<MemberAccountBlockLog> GetMemberAccountBlockLogs()
        {
            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.GET));
            return db.MemberAccountBlockLog;
        }

        // GET: odata/MemberAccountBlockLogs(5)
        [EnableQuery]
        public SingleResult<MemberAccountBlockLog> GetMemberAccountBlockLog([FromODataUri] string key)
        {
            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.GETbyIID));
            return SingleResult.Create(db.MemberAccountBlockLog.Where(memberAccountBlockLog => memberAccountBlockLog.MemberAccountBlockID == key));
        }

        // PUT: odata/MemberAccountBlockLogs(5)
        public IHttpActionResult Put([FromODataUri] string key, Delta<MemberAccountBlockLog> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            MemberAccountBlockLog memberAccountBlockLog = db.MemberAccountBlockLog.Find(key);
            if (memberAccountBlockLog == null)
            {
                return NotFound();
            }

            patch.Put(memberAccountBlockLog);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberAccountBlockLogExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.PUT, JsonConvert.SerializeObject(patch)));
            return Updated(memberAccountBlockLog);
        }

        // POST: odata/MemberAccountBlockLogs
        public IHttpActionResult Post(MemberAccountBlockLog memberAccountBlockLog)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.MemberAccountBlockLog.Add(memberAccountBlockLog);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (MemberAccountBlockLogExists(memberAccountBlockLog.MemberAccountBlockID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.POST, JsonConvert.SerializeObject(memberAccountBlockLog)));
            return Created(memberAccountBlockLog);
        }

        // PATCH: odata/MemberAccountBlockLogs(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] string key, Delta<MemberAccountBlockLog> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            MemberAccountBlockLog memberAccountBlockLog = db.MemberAccountBlockLog.Find(key);
            if (memberAccountBlockLog == null)
            {
                return NotFound();
            }

            patch.Patch(memberAccountBlockLog);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberAccountBlockLogExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.PATCH, JsonConvert.SerializeObject(patch)));
            return Updated(memberAccountBlockLog);
        }

        // DELETE: odata/MemberAccountBlockLogs(5)
        public IHttpActionResult Delete([FromODataUri] string key)
        {
            MemberAccountBlockLog memberAccountBlockLog = db.MemberAccountBlockLog.Find(key);
            if (memberAccountBlockLog == null)
            {
                return NotFound();
            }

            db.MemberAccountBlockLog.Remove(memberAccountBlockLog);
            db.SaveChanges();

            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.DELETE, key));
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

        private bool MemberAccountBlockLogExists(string key)
        {
            return db.MemberAccountBlockLog.Count(e => e.MemberAccountBlockID == key) > 0;
        }
    }
}
