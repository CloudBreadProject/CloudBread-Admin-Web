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

using System.Diagnostics;


namespace CloudBread_Admin_Web.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using CloudBread_Admin_Web;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<ItemLists>("ItemLists");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class ItemListsController : ODataController
    {
        private CBEntities db = new CBEntities();
        
        /// Create Logger object
        Logging.CBLoggers logMessage = new Logging.CBLoggers();

        // GET: odata/ItemLists
        [EnableQuery]
        public IQueryable<ItemLists> GetItemLists()
        {
            /// test for log
            //Debug.WriteLine(this.Request.Method);
            //Debug.WriteLine(this.Request.RequestUri);
            //Debug.WriteLine(this.Request.RequestUri.Query);
            //Debug.WriteLine(this.Request.RequestUri.PathAndQuery);
            /// this.Request.RequestUri.PathAndQuery 남기는 구조가 좋을 듯.

            // Get the sid of the current user.
            string sid = CBAuth.getMemberID(this.User as ClaimsPrincipal);
            //string sid = CBAuth.getMemberID("CBAdmin", this.User as ClaimsPrincipal);   // 인증 없이 로그 처리 테스트

            return db.ItemLists;
        }

        // GET: odata/ItemLists(5)
        [EnableQuery]
        public SingleResult<ItemLists> GetItemLists([FromODataUri] string key)
        {
            // Get the sid of the current user.
            string sid = CBAuth.getMemberID(this.User as ClaimsPrincipal);
            //string sid = CBAuth.getMemberID("CBAdmin", this.User as ClaimsPrincipal);   // 인증 없이 로그 처리 테스트


            return SingleResult.Create(db.ItemLists.Where(itemLists => itemLists.ItemListID == key));
        }

        // PUT: odata/ItemLists(5)
        public IHttpActionResult Put([FromODataUri] string key, Delta<ItemLists> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ItemLists itemLists = db.ItemLists.Find(key);
            if (itemLists == null)
            {
                return NotFound();
            }

            patch.Put(itemLists);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemListsExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // Get the sid of the current user.
            string sid = CBAuth.getMemberID(this.User as ClaimsPrincipal);

            return Updated(itemLists);
        }

        // POST: odata/ItemLists
        public IHttpActionResult Post(ItemLists itemLists)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ItemLists.Add(itemLists);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ItemListsExists(itemLists.ItemListID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            // Get the sid of the current user.
            string sid = CBAuth.getMemberID(this.User as ClaimsPrincipal);

            return Created(itemLists);
        }

        // PATCH: odata/ItemLists(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] string key, Delta<ItemLists> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ItemLists itemLists = db.ItemLists.Find(key);
            if (itemLists == null)
            {
                return NotFound();
            }

            patch.Patch(itemLists);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemListsExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // Get the sid of the current user.
            string sid = CBAuth.getMemberID(this.User as ClaimsPrincipal);

            return Updated(itemLists);
        }

        // DELETE: odata/ItemLists(5)
        public IHttpActionResult Delete([FromODataUri] string key)
        {

            ItemLists itemLists = db.ItemLists.Find(key);
            if (itemLists == null)
            {
                return NotFound();
            }



            // Get the sid of the current user.
            string sid = CBAuth.getMemberID(this.User as ClaimsPrincipal);

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

        private bool ItemListsExists(string key)
        {
            return db.ItemLists.Count(e => e.ItemListID == key) > 0;
        }
    }
}
