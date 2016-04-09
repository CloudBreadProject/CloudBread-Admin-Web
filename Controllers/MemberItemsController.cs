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
    builder.EntitySet<MemberItems>("MemberItems");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class MemberItemsController : ODataController
    {
        private CBEntities db = new CBEntities();
        Logging.CBLoggers logMsg = new Logging.CBLoggers();

        // GET: odata/MemberItems
        [EnableQuery]
        public IQueryable<MemberItems> GetMemberItems()
        {
            // Get the sid of the current user
            string sid = CBAuth.getMemberID(this.User as ClaimsPrincipal);

            logMsg.memberID = sid;
            logMsg.Level = "INFO";
            logMsg.Logger = "MemberItems-GET";
            logMsg.Message = this.Request.RequestUri.PathAndQuery.ToString();
            Logging.RunLog(logMsg);

            return db.MemberItems;
        }

        // GET: odata/MemberItems(5)
        [EnableQuery]
        public SingleResult<MemberItems> GetMemberItems([FromODataUri] string key)
        {
            return SingleResult.Create(db.MemberItems.Where(memberItems => memberItems.MemberItemID == key));
        }

        // PUT: odata/MemberItems(5)
        public IHttpActionResult Put([FromODataUri] string key, Delta<MemberItems> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            MemberItems memberItems = db.MemberItems.Find(key);
            if (memberItems == null)
            {
                return NotFound();
            }

            patch.Put(memberItems);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberItemsExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(memberItems);
        }

        // POST: odata/MemberItems
        public IHttpActionResult Post(MemberItems memberItems)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.MemberItems.Add(memberItems);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (MemberItemsExists(memberItems.MemberItemID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Created(memberItems);
        }

        // PATCH: odata/MemberItems(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] string key, Delta<MemberItems> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            MemberItems memberItems = db.MemberItems.Find(key);
            if (memberItems == null)
            {
                return NotFound();
            }

            patch.Patch(memberItems);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberItemsExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(memberItems);
        }

        // DELETE: odata/MemberItems(5)
        public IHttpActionResult Delete([FromODataUri] string key)
        {
            MemberItems memberItems = db.MemberItems.Find(key);
            if (memberItems == null)
            {
                return NotFound();
            }

            db.MemberItems.Remove(memberItems);
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

        private bool MemberItemsExists(string key)
        {
            return db.MemberItems.Count(e => e.MemberItemID == key) > 0;
        }
    }
}
