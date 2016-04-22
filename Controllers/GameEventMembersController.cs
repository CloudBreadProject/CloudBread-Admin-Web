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
    builder.EntitySet<GameEventMember>("GameEventMembers");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class GameEventMembersController : ODataController
    {
        private CBEntities db = new CBEntities();
        CBLoggerBuilder logBuilder = new CBLoggerBuilder("GameEventMembers");

        // GET: odata/GameEventMembers
        [EnableQuery]
        public IQueryable<GameEventMember> GetGameEventMembers()
        {
            Logging.RunLog(logBuilder.build(this, CBLoggerBuilder.LevelType.INFO, CBLoggerBuilder.LoggerType.GET));
            return db.GameEventMember;
        }

        // GET: odata/GameEventMembers(5)
        [EnableQuery]
        public SingleResult<GameEventMember> GetGameEventMember([FromODataUri] string key)
        {
            Logging.RunLog(logBuilder.build(this, CBLoggerBuilder.LevelType.INFO, CBLoggerBuilder.LoggerType.GETbyIID));
            return SingleResult.Create(db.GameEventMember.Where(gameEventMember => gameEventMember.GameEventMemberID == key));
        }

        // PUT: odata/GameEventMembers(5)
        public IHttpActionResult Put([FromODataUri] string key, Delta<GameEventMember> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            GameEventMember gameEventMember = db.GameEventMember.Find(key);
            if (gameEventMember == null)
            {
                return NotFound();
            }

            patch.Put(gameEventMember);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameEventMemberExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            Logging.RunLog(logBuilder.build(this, CBLoggerBuilder.LevelType.INFO, CBLoggerBuilder.LoggerType.PUT, JsonConvert.SerializeObject(patch)));
            return Updated(gameEventMember);
        }

        // POST: odata/GameEventMembers
        public IHttpActionResult Post(GameEventMember gameEventMember)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.GameEventMember.Add(gameEventMember);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (GameEventMemberExists(gameEventMember.GameEventMemberID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            Logging.RunLog(logBuilder.build(this, CBLoggerBuilder.LevelType.INFO, CBLoggerBuilder.LoggerType.POST, JsonConvert.SerializeObject(gameEventMember)));
            return Created(gameEventMember);
        }

        // PATCH: odata/GameEventMembers(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] string key, Delta<GameEventMember> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            GameEventMember gameEventMember = db.GameEventMember.Find(key);
            if (gameEventMember == null)
            {
                return NotFound();
            }

            patch.Patch(gameEventMember);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameEventMemberExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            Logging.RunLog(logBuilder.build(this, CBLoggerBuilder.LevelType.INFO, CBLoggerBuilder.LoggerType.PATCH, JsonConvert.SerializeObject(patch)));
            return Updated(gameEventMember);
        }

        // DELETE: odata/GameEventMembers(5)
        public IHttpActionResult Delete([FromODataUri] string key)
        {
            GameEventMember gameEventMember = db.GameEventMember.Find(key);
            if (gameEventMember == null)
            {
                return NotFound();
            }

            db.GameEventMember.Remove(gameEventMember);
            db.SaveChanges();

            Logging.RunLog(logBuilder.build(this, CBLoggerBuilder.LevelType.INFO, CBLoggerBuilder.LoggerType.DELETE, key));
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

        private bool GameEventMemberExists(string key)
        {
            return db.GameEventMember.Count(e => e.GameEventMemberID == key) > 0;
        }
    }
}
