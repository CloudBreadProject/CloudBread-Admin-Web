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
    builder.EntitySet<CloudBreadAdminLog>("CloudBreadAdminLogs");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class CloudBreadAdminLogsController : ODataController
    {
        private CBEntities db = new CBEntities();

        // GET: odata/CloudBreadAdminLogs
        [EnableQuery]
        public IQueryable<CloudBreadAdminLog> GetCloudBreadAdminLogs()
        {
            return db.CloudBreadAdminLog;
        }

        // GET: odata/CloudBreadAdminLogs(5)
        [EnableQuery]
        public SingleResult<CloudBreadAdminLog> GetCloudBreadAdminLog([FromODataUri] int key)
        {
            return SingleResult.Create(db.CloudBreadAdminLog.Where(cloudBreadAdminLog => cloudBreadAdminLog.Id == key));
        }

        // PUT: odata/CloudBreadAdminLogs(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<CloudBreadAdminLog> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CloudBreadAdminLog cloudBreadAdminLog = db.CloudBreadAdminLog.Find(key);
            if (cloudBreadAdminLog == null)
            {
                return NotFound();
            }

            patch.Put(cloudBreadAdminLog);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CloudBreadAdminLogExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(cloudBreadAdminLog);
        }

        // POST: odata/CloudBreadAdminLogs
        public IHttpActionResult Post(CloudBreadAdminLog cloudBreadAdminLog)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CloudBreadAdminLog.Add(cloudBreadAdminLog);
            db.SaveChanges();

            return Created(cloudBreadAdminLog);
        }

        // PATCH: odata/CloudBreadAdminLogs(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<CloudBreadAdminLog> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CloudBreadAdminLog cloudBreadAdminLog = db.CloudBreadAdminLog.Find(key);
            if (cloudBreadAdminLog == null)
            {
                return NotFound();
            }

            patch.Patch(cloudBreadAdminLog);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CloudBreadAdminLogExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(cloudBreadAdminLog);
        }

        // DELETE: odata/CloudBreadAdminLogs(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            CloudBreadAdminLog cloudBreadAdminLog = db.CloudBreadAdminLog.Find(key);
            if (cloudBreadAdminLog == null)
            {
                return NotFound();
            }

            db.CloudBreadAdminLog.Remove(cloudBreadAdminLog);
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

        private bool CloudBreadAdminLogExists(int key)
        {
            return db.CloudBreadAdminLog.Count(e => e.Id == key) > 0;
        }
    }
}
