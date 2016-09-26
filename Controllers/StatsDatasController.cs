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
    builder.EntitySet<StatsData>("StatsDatas");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class StatsDatasController : ODataController
    {
        private CBEntities db = new CBEntities();
        Logging.CBLoggerBuilder logBuilder = new Logging.CBLoggerBuilder("StatsDatas");

        // GET: odata/StatsDatas
        [EnableQuery]
        public IQueryable<StatsData> GetStatsDatas()
        {
            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.GET));
            return db.StatsData;
        }

        // GET: odata/StatsDatas(5)
        [EnableQuery]
        public SingleResult<StatsData> GetStatsData([FromODataUri] string key)
        {
            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.GETbyIID));
            return SingleResult.Create(db.StatsData.Where(statsData => statsData.StatID == key));
        }

        // PUT: odata/StatsDatas(5)
        public IHttpActionResult Put([FromODataUri] string key, Delta<StatsData> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            StatsData statsData = db.StatsData.Find(key);
            if (statsData == null)
            {
                return NotFound();
            }

            patch.Put(statsData);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StatsDataExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.PUT, JsonConvert.SerializeObject(patch)));
            return Updated(statsData);
        }

        // POST: odata/StatsDatas
        public IHttpActionResult Post(StatsData statsData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.StatsData.Add(statsData);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (StatsDataExists(statsData.StatID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.POST, JsonConvert.SerializeObject(statsData)));
            return Created(statsData);
        }

        // PATCH: odata/StatsDatas(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] string key, Delta<StatsData> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            StatsData statsData = db.StatsData.Find(key);
            if (statsData == null)
            {
                return NotFound();
            }

            patch.Patch(statsData);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StatsDataExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.PATCH, JsonConvert.SerializeObject(patch)));
            return Updated(statsData);
        }

        // DELETE: odata/StatsDatas(5)
        public IHttpActionResult Delete([FromODataUri] string key)
        {
            StatsData statsData = db.StatsData.Find(key);
            if (statsData == null)
            {
                return NotFound();
            }

            db.StatsData.Remove(statsData);
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

        private bool StatsDataExists(string key)
        {
            return db.StatsData.Count(e => e.StatID == key) > 0;
        }
    }
}
