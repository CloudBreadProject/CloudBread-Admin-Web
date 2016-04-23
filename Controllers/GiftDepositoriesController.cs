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
    builder.EntitySet<GiftDepositories>("GiftDepositories");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class GiftDepositoriesController : ODataController
    {
        private CBEntities db = new CBEntities();
        Logging.CBLoggerBuilder logBuilder = new Logging.CBLoggerBuilder("GiftDepositories");

        // GET: odata/GiftDepositories
        [EnableQuery]
        public IQueryable<GiftDepositories> GetGiftDepositories()
        {
            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.GET));
            return db.GiftDepositories;
        }

        // GET: odata/GiftDepositories(5)
        [EnableQuery]
        public SingleResult<GiftDepositories> GetGiftDepositories([FromODataUri] string key)
        {
            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.GETbyIID));
            return SingleResult.Create(db.GiftDepositories.Where(giftDepositories => giftDepositories.GiftDepositoryID == key));
        }

        // PUT: odata/GiftDepositories(5)
        public IHttpActionResult Put([FromODataUri] string key, Delta<GiftDepositories> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            GiftDepositories giftDepositories = db.GiftDepositories.Find(key);
            if (giftDepositories == null)
            {
                return NotFound();
            }

            patch.Put(giftDepositories);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GiftDepositoriesExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            Logging.CBLoggers logMsg = logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.PUT, JsonConvert.SerializeObject(patch));
            Logging.RunLog(logMsg);
            return Updated(giftDepositories);
        }

        // POST: odata/GiftDepositories
        public IHttpActionResult Post(GiftDepositories giftDepositories)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.GiftDepositories.Add(giftDepositories);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (GiftDepositoriesExists(giftDepositories.GiftDepositoryID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            Logging.CBLoggers logMsg = logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.POST, JsonConvert.SerializeObject(giftDepositories));
            Logging.RunLog(logMsg);
            return Created(giftDepositories);
        }

        // PATCH: odata/GiftDepositories(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] string key, Delta<GiftDepositories> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            GiftDepositories giftDepositories = db.GiftDepositories.Find(key);
            if (giftDepositories == null)
            {
                return NotFound();
            }

            patch.Patch(giftDepositories);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GiftDepositoriesExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            Logging.CBLoggers logMsg = logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.PATCH, JsonConvert.SerializeObject(patch));
            Logging.RunLog(logMsg);
            return Updated(giftDepositories);
        }

        // DELETE: odata/GiftDepositories(5)
        public IHttpActionResult Delete([FromODataUri] string key)
        {
            GiftDepositories giftDepositories = db.GiftDepositories.Find(key);
            if (giftDepositories == null)
            {
                return NotFound();
            }

            db.GiftDepositories.Remove(giftDepositories);
            db.SaveChanges();

            Logging.CBLoggers logMsg = logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.PATCH, key);
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

        private bool GiftDepositoriesExists(string key)
        {
            return db.GiftDepositories.Count(e => e.GiftDepositoryID == key) > 0;
        }
    }
}
