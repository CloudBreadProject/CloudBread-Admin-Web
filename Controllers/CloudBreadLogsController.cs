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
    builder.EntitySet<CloudBreadLog>("CloudBreadLogs");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class CloudBreadLogsController : ODataController
    {
        private CBEntities db = new CBEntities();

        // GET: odata/CloudBreadLogs
        [EnableQuery]
        public IQueryable<CloudBreadLog> GetCloudBreadLogs()
        {
            return db.CloudBreadLog;
        }

        // GET: odata/CloudBreadLogs(5)
        [EnableQuery]
        public SingleResult<CloudBreadLog> GetCloudBreadLog([FromODataUri] int key)
        {
            return SingleResult.Create(db.CloudBreadLog.Where(cloudBreadLog => cloudBreadLog.Id == key));
        }

        // PUT: odata/CloudBreadLogs(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<CloudBreadLog> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CloudBreadLog cloudBreadLog = db.CloudBreadLog.Find(key);
            if (cloudBreadLog == null)
            {
                return NotFound();
            }

            patch.Put(cloudBreadLog);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CloudBreadLogExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(cloudBreadLog);
        }

        // POST: odata/CloudBreadLogs
        public IHttpActionResult Post(CloudBreadLog cloudBreadLog)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CloudBreadLog.Add(cloudBreadLog);
            db.SaveChanges();

            return Created(cloudBreadLog);
        }

        // PATCH: odata/CloudBreadLogs(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<CloudBreadLog> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CloudBreadLog cloudBreadLog = db.CloudBreadLog.Find(key);
            if (cloudBreadLog == null)
            {
                return NotFound();
            }

            patch.Patch(cloudBreadLog);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CloudBreadLogExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(cloudBreadLog);
        }

        // DELETE: odata/CloudBreadLogs(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            CloudBreadLog cloudBreadLog = db.CloudBreadLog.Find(key);
            if (cloudBreadLog == null)
            {
                return NotFound();
            }

            db.CloudBreadLog.Remove(cloudBreadLog);
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

        private bool CloudBreadLogExists(int key)
        {
            return db.CloudBreadLog.Count(e => e.Id == key) > 0;
        }
    }
}
