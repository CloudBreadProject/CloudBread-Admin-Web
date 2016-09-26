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
    public class ItemListsController : ODataController
    {
        private CBEntities db = new CBEntities();
        Logging.CBLoggers logMessage = new Logging.CBLoggers(); /// add log object

        // GET: odata/ItemLists
        [EnableQuery]
        public IQueryable<ItemLists> GetItemLists()
        {
            // Get the sid of the current user.
            string sid = CBAuth.getMemberID(this.User as ClaimsPrincipal);

            /// admin access log
            logMessage.memberID = sid;
            logMessage.Level = "INFO";
            logMessage.Logger = "ItemLists-Get";
            logMessage.Message = this.Request.RequestUri.PathAndQuery.ToString();
            Logging.RunLog(logMessage);

            return db.ItemLists;
        }

        // GET: odata/ItemLists(5)
        [EnableQuery]
        public SingleResult<ItemLists> GetItemLists([FromODataUri] string key)
        {
            // Get the sid of the current user.
            string sid = CBAuth.getMemberID(this.User as ClaimsPrincipal);

            /// admin access log
            logMessage.memberID = sid;
            logMessage.Level = "INFO";
            logMessage.Logger = "ItemLists-GetbyID";
            logMessage.Message = this.Request.RequestUri.PathAndQuery.ToString();
            Logging.RunLog(logMessage);

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

            /// admin access log
            logMessage.memberID = sid;
            logMessage.Level = "INFO";
            logMessage.Logger = "ItemLists-PUT";
            logMessage.Message = JsonConvert.SerializeObject(patch);
            Logging.RunLog(logMessage);

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

            /// admin access log
            logMessage.memberID = sid;
            logMessage.Level = "INFO";
            logMessage.Logger = "ItemLists-POST";
            logMessage.Message = JsonConvert.SerializeObject(itemLists);
            Logging.RunLog(logMessage);

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

            /// admin access log
            logMessage.memberID = sid;
            logMessage.Level = "INFO";
            logMessage.Logger = "ItemLists-PATCH";
            logMessage.Message = JsonConvert.SerializeObject(patch);
            Logging.RunLog(logMessage);

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

            db.ItemLists.Remove(itemLists);
            db.SaveChanges();

            // Get the sid of the current user.
            string sid = CBAuth.getMemberID(this.User as ClaimsPrincipal);

            /// admin access log
            logMessage.memberID = sid;
            logMessage.Level = "INFO";
            logMessage.Logger = "ItemLists-DELETE";
            logMessage.Message = key;
            Logging.RunLog(logMessage);

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
