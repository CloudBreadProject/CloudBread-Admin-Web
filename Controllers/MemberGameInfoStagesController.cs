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
    builder.EntitySet<MemberGameInfoStages>("MemberGameInfoStages");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class MemberGameInfoStagesController : ODataController
    {
        private CBEntities db = new CBEntities();

        // GET: odata/MemberGameInfoStages
        [EnableQuery]
        public IQueryable<MemberGameInfoStages> GetMemberGameInfoStages()
        {
            return db.MemberGameInfoStages;
        }

        // GET: odata/MemberGameInfoStages(5)
        [EnableQuery]
        public SingleResult<MemberGameInfoStages> GetMemberGameInfoStages([FromODataUri] string key)
        {
            return SingleResult.Create(db.MemberGameInfoStages.Where(memberGameInfoStages => memberGameInfoStages.MemberGameInfoStageID == key));
        }

        // PUT: odata/MemberGameInfoStages(5)
        public IHttpActionResult Put([FromODataUri] string key, Delta<MemberGameInfoStages> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            MemberGameInfoStages memberGameInfoStages = db.MemberGameInfoStages.Find(key);
            if (memberGameInfoStages == null)
            {
                return NotFound();
            }

            patch.Put(memberGameInfoStages);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberGameInfoStagesExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(memberGameInfoStages);
        }

        // POST: odata/MemberGameInfoStages
        public IHttpActionResult Post(MemberGameInfoStages memberGameInfoStages)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.MemberGameInfoStages.Add(memberGameInfoStages);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (MemberGameInfoStagesExists(memberGameInfoStages.MemberGameInfoStageID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Created(memberGameInfoStages);
        }

        // PATCH: odata/MemberGameInfoStages(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] string key, Delta<MemberGameInfoStages> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            MemberGameInfoStages memberGameInfoStages = db.MemberGameInfoStages.Find(key);
            if (memberGameInfoStages == null)
            {
                return NotFound();
            }

            patch.Patch(memberGameInfoStages);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberGameInfoStagesExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(memberGameInfoStages);
        }

        // DELETE: odata/MemberGameInfoStages(5)
        public IHttpActionResult Delete([FromODataUri] string key)
        {
            MemberGameInfoStages memberGameInfoStages = db.MemberGameInfoStages.Find(key);
            if (memberGameInfoStages == null)
            {
                return NotFound();
            }

            db.MemberGameInfoStages.Remove(memberGameInfoStages);
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

        private bool MemberGameInfoStagesExists(string key)
        {
            return db.MemberGameInfoStages.Count(e => e.MemberGameInfoStageID == key) > 0;
        }
    }
}
