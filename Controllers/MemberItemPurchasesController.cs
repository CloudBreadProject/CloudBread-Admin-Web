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
    builder.EntitySet<MemberItemPurchases>("MemberItemPurchases");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class MemberItemPurchasesController : ODataController
    {
        private CBEntities db = new CBEntities();

        // GET: odata/MemberItemPurchases
        [EnableQuery]
        public IQueryable<MemberItemPurchases> GetMemberItemPurchases()
        {
            return db.MemberItemPurchases;
        }

        // GET: odata/MemberItemPurchases(5)
        [EnableQuery]
        public SingleResult<MemberItemPurchases> GetMemberItemPurchases([FromODataUri] string key)
        {
            return SingleResult.Create(db.MemberItemPurchases.Where(memberItemPurchases => memberItemPurchases.MemberItemPurchaseID == key));
        }

        // PUT: odata/MemberItemPurchases(5)
        public IHttpActionResult Put([FromODataUri] string key, Delta<MemberItemPurchases> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            MemberItemPurchases memberItemPurchases = db.MemberItemPurchases.Find(key);
            if (memberItemPurchases == null)
            {
                return NotFound();
            }

            patch.Put(memberItemPurchases);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberItemPurchasesExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(memberItemPurchases);
        }

        // POST: odata/MemberItemPurchases
        public IHttpActionResult Post(MemberItemPurchases memberItemPurchases)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.MemberItemPurchases.Add(memberItemPurchases);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (MemberItemPurchasesExists(memberItemPurchases.MemberItemPurchaseID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Created(memberItemPurchases);
        }

        // PATCH: odata/MemberItemPurchases(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] string key, Delta<MemberItemPurchases> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            MemberItemPurchases memberItemPurchases = db.MemberItemPurchases.Find(key);
            if (memberItemPurchases == null)
            {
                return NotFound();
            }

            patch.Patch(memberItemPurchases);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberItemPurchasesExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(memberItemPurchases);
        }

        // DELETE: odata/MemberItemPurchases(5)
        public IHttpActionResult Delete([FromODataUri] string key)
        {
            MemberItemPurchases memberItemPurchases = db.MemberItemPurchases.Find(key);
            if (memberItemPurchases == null)
            {
                return NotFound();
            }

            db.MemberItemPurchases.Remove(memberItemPurchases);
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

        private bool MemberItemPurchasesExists(string key)
        {
            return db.MemberItemPurchases.Count(e => e.MemberItemPurchaseID == key) > 0;
        }
    }
}
