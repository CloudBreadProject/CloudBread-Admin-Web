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

namespace CloudBread_Admin_Web.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using CloudBread_Admin_Web;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<CloudBreadErrorLog>("CloudBreadErrorLogs");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class CloudBreadErrorLogsController : ODataController
    {
        private CBEntities db = new CBEntities();

        // GET: odata/CloudBreadErrorLogs
        [EnableQuery]
        public IQueryable<CloudBreadErrorLog> GetCloudBreadErrorLogs()
        {
            return db.CloudBreadErrorLog;
        }

        // GET: odata/CloudBreadErrorLogs(5)
        [EnableQuery]
        public SingleResult<CloudBreadErrorLog> GetCloudBreadErrorLog([FromODataUri] int key)
        {
            return SingleResult.Create(db.CloudBreadErrorLog.Where(cloudBreadErrorLog => cloudBreadErrorLog.Id == key));
        }

        // PUT: odata/CloudBreadErrorLogs(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<CloudBreadErrorLog> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CloudBreadErrorLog cloudBreadErrorLog = db.CloudBreadErrorLog.Find(key);
            if (cloudBreadErrorLog == null)
            {
                return NotFound();
            }

            patch.Put(cloudBreadErrorLog);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CloudBreadErrorLogExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(cloudBreadErrorLog);
        }

        // POST: odata/CloudBreadErrorLogs
        public IHttpActionResult Post(CloudBreadErrorLog cloudBreadErrorLog)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CloudBreadErrorLog.Add(cloudBreadErrorLog);
            db.SaveChanges();

            return Created(cloudBreadErrorLog);
        }

        // PATCH: odata/CloudBreadErrorLogs(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<CloudBreadErrorLog> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CloudBreadErrorLog cloudBreadErrorLog = db.CloudBreadErrorLog.Find(key);
            if (cloudBreadErrorLog == null)
            {
                return NotFound();
            }

            patch.Patch(cloudBreadErrorLog);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CloudBreadErrorLogExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(cloudBreadErrorLog);
        }

        // DELETE: odata/CloudBreadErrorLogs(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            CloudBreadErrorLog cloudBreadErrorLog = db.CloudBreadErrorLog.Find(key);
            if (cloudBreadErrorLog == null)
            {
                return NotFound();
            }

            db.CloudBreadErrorLog.Remove(cloudBreadErrorLog);
            db.SaveChanges();

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

        private bool CloudBreadErrorLogExists(int key)
        {
            return db.CloudBreadErrorLog.Count(e => e.Id == key) > 0;
        }
    }
}
