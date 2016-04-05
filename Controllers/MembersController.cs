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
    builder.EntitySet<Members>("Members");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class MembersController : ODataController
    {
        private CBEntities db = new CBEntities();

        // GET: odata/Members
        [EnableQuery]
        public IQueryable<Members> GetMembers()
        {
            return db.Members;
        }

        // GET: odata/Members(5)
        [EnableQuery]
        public SingleResult<Members> GetMembers([FromODataUri] string key)
        {
            return SingleResult.Create(db.Members.Where(members => members.MemberID == key));
        }

        // PUT: odata/Members(5)
        public IHttpActionResult Put([FromODataUri] string key, Delta<Members> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Members members = db.Members.Find(key);
            if (members == null)
            {
                return NotFound();
            }

            patch.Put(members);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MembersExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(members);
        }

        // POST: odata/Members
        public IHttpActionResult Post(Members members)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Members.Add(members);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (MembersExists(members.MemberID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Created(members);
        }

        // PATCH: odata/Members(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] string key, Delta<Members> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Members members = db.Members.Find(key);
            if (members == null)
            {
                return NotFound();
            }

            patch.Patch(members);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MembersExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(members);
        }

        // DELETE: odata/Members(5)
        public IHttpActionResult Delete([FromODataUri] string key)
        {
            Members members = db.Members.Find(key);
            if (members == null)
            {
                return NotFound();
            }

            db.Members.Remove(members);
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

        private bool MembersExists(string key)
        {
            return db.Members.Count(e => e.MemberID == key) > 0;
        }
    }
}
