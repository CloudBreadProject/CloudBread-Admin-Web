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
    builder.EntitySet<GameEvents>("GameEvents");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class GameEventsController : ODataController
    {
        private CBEntities db = new CBEntities();
        Logging.CBLoggerBuilder logBuilder = new Logging.CBLoggerBuilder("GameEventsController");

        // GET: odata/GameEvents
        [EnableQuery]
        public IQueryable<GameEvents> GetGameEvents()
        {
            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.GET));
            return db.GameEvents;
        }

        // GET: odata/GameEvents(5)
        [EnableQuery]
        public SingleResult<GameEvents> GetGameEvents([FromODataUri] string key)
        {
            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.GETbyIID));
            return SingleResult.Create(db.GameEvents.Where(gameEvents => gameEvents.GameEventID == key));
        }

        // PUT: odata/GameEvents(5)
        public IHttpActionResult Put([FromODataUri] string key, Delta<GameEvents> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            GameEvents gameEvents = db.GameEvents.Find(key);
            if (gameEvents == null)
            {
                return NotFound();
            }

            patch.Put(gameEvents);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameEventsExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.PUT, JsonConvert.SerializeObject(patch)));
            return Updated(gameEvents);
        }

        // POST: odata/GameEvents
        public IHttpActionResult Post(GameEvents gameEvents)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.GameEvents.Add(gameEvents);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (GameEventsExists(gameEvents.GameEventID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.POST, JsonConvert.SerializeObject(gameEvents)));
            return Created(gameEvents);
        }

        // PATCH: odata/GameEvents(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] string key, Delta<GameEvents> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            GameEvents gameEvents = db.GameEvents.Find(key);
            if (gameEvents == null)
            {
                return NotFound();
            }

            patch.Patch(gameEvents);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameEventsExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.PATCH, JsonConvert.SerializeObject(patch)));
            return Updated(gameEvents);
        }

        // DELETE: odata/GameEvents(5)
        public IHttpActionResult Delete([FromODataUri] string key)
        {
            GameEvents gameEvents = db.GameEvents.Find(key);
            if (gameEvents == null)
            {
                return NotFound();
            }

            db.GameEvents.Remove(gameEvents);
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

        private bool GameEventsExists(string key)
        {
            return db.GameEvents.Count(e => e.GameEventID == key) > 0;
        }
    }
}
