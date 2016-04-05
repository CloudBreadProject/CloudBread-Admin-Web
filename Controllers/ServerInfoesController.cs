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
    builder.EntitySet<ServerInfo>("ServerInfoes");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class ServerInfoesController : ODataController
    {
        private CBEntities db = new CBEntities();

        // GET: odata/ServerInfoes
        [EnableQuery]
        public IQueryable<ServerInfo> GetServerInfoes()
        {
            return db.ServerInfo;
        }

        // GET: odata/ServerInfoes(5)
        [EnableQuery]
        public SingleResult<ServerInfo> GetServerInfo([FromODataUri] string key)
        {
            return SingleResult.Create(db.ServerInfo.Where(serverInfo => serverInfo.InfoID == key));
        }

        // PUT: odata/ServerInfoes(5)
        public IHttpActionResult Put([FromODataUri] string key, Delta<ServerInfo> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ServerInfo serverInfo = db.ServerInfo.Find(key);
            if (serverInfo == null)
            {
                return NotFound();
            }

            patch.Put(serverInfo);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServerInfoExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(serverInfo);
        }

        // POST: odata/ServerInfoes
        public IHttpActionResult Post(ServerInfo serverInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ServerInfo.Add(serverInfo);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ServerInfoExists(serverInfo.InfoID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Created(serverInfo);
        }

        // PATCH: odata/ServerInfoes(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] string key, Delta<ServerInfo> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ServerInfo serverInfo = db.ServerInfo.Find(key);
            if (serverInfo == null)
            {
                return NotFound();
            }

            patch.Patch(serverInfo);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServerInfoExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(serverInfo);
        }

        // DELETE: odata/ServerInfoes(5)
        public IHttpActionResult Delete([FromODataUri] string key)
        {
            ServerInfo serverInfo = db.ServerInfo.Find(key);
            if (serverInfo == null)
            {
                return NotFound();
            }

            db.ServerInfo.Remove(serverInfo);
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

        private bool ServerInfoExists(string key)
        {
            return db.ServerInfo.Count(e => e.InfoID == key) > 0;
        }
    }
}
