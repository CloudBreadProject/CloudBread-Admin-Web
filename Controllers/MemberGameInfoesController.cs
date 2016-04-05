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
    builder.EntitySet<MemberGameInfoes>("MemberGameInfoes");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class MemberGameInfoesController : ODataController
    {
        private CBEntities db = new CBEntities();

        // GET: odata/MemberGameInfoes
        [EnableQuery]
        public IQueryable<MemberGameInfoes> GetMemberGameInfoes()
        {
            return db.MemberGameInfoes;
        }

        // GET: odata/MemberGameInfoes(5)
        [EnableQuery]
        public SingleResult<MemberGameInfoes> GetMemberGameInfoes([FromODataUri] string key)
        {
            return SingleResult.Create(db.MemberGameInfoes.Where(memberGameInfoes => memberGameInfoes.MemberID == key));
        }

        // PUT: odata/MemberGameInfoes(5)
        public IHttpActionResult Put([FromODataUri] string key, Delta<MemberGameInfoes> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            MemberGameInfoes memberGameInfoes = db.MemberGameInfoes.Find(key);
            if (memberGameInfoes == null)
            {
                return NotFound();
            }

            patch.Put(memberGameInfoes);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberGameInfoesExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(memberGameInfoes);
        }

        // POST: odata/MemberGameInfoes
        public IHttpActionResult Post(MemberGameInfoes memberGameInfoes)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.MemberGameInfoes.Add(memberGameInfoes);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (MemberGameInfoesExists(memberGameInfoes.MemberID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Created(memberGameInfoes);
        }

        // PATCH: odata/MemberGameInfoes(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] string key, Delta<MemberGameInfoes> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            MemberGameInfoes memberGameInfoes = db.MemberGameInfoes.Find(key);
            if (memberGameInfoes == null)
            {
                return NotFound();
            }

            patch.Patch(memberGameInfoes);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberGameInfoesExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(memberGameInfoes);
        }

        // DELETE: odata/MemberGameInfoes(5)
        public IHttpActionResult Delete([FromODataUri] string key)
        {
            MemberGameInfoes memberGameInfoes = db.MemberGameInfoes.Find(key);
            if (memberGameInfoes == null)
            {
                return NotFound();
            }

            db.MemberGameInfoes.Remove(memberGameInfoes);
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

        private bool MemberGameInfoesExists(string key)
        {
            return db.MemberGameInfoes.Count(e => e.MemberID == key) > 0;
        }
    }
}
