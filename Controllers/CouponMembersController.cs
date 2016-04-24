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
    builder.EntitySet<CouponMember>("CouponMembers");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class CouponMembersController : ODataController
    {
        private CBEntities db = new CBEntities();
        Logging.CBLoggerBuilder logBuilder = new Logging.CBLoggerBuilder("CouponMembers");

        // GET: odata/CouponMembers
        [EnableQuery]
        public IQueryable<CouponMember> GetCouponMembers()
        {
            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.GET)));
            return db.CouponMember;
        }

        // GET: odata/CouponMembers(5)
        [EnableQuery]
        public SingleResult<CouponMember> GetCouponMember([FromODataUri] string key)
        {
            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.GETbyIID));
            return SingleResult.Create(db.CouponMember.Where(couponMember => couponMember.CouponMemberID == key));
        }

        // PUT: odata/CouponMembers(5)
        public IHttpActionResult Put([FromODataUri] string key, Delta<CouponMember> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CouponMember couponMember = db.CouponMember.Find(key);
            if (couponMember == null)
            {
                return NotFound();
            }

            patch.Put(couponMember);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CouponMemberExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.PUT, JsonConvert.SerializeObject(patch)));
            return Updated(couponMember);
        }

        // POST: odata/CouponMembers
        public IHttpActionResult Post(CouponMember couponMember)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CouponMember.Add(couponMember);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (CouponMemberExists(couponMember.CouponMemberID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.POST, JsonConvert.SerializeObject(couponMember)));
            return Created(couponMember);
        }

        // PATCH: odata/CouponMembers(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] string key, Delta<CouponMember> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CouponMember couponMember = db.CouponMember.Find(key);
            if (couponMember == null)
            {
                return NotFound();
            }

            patch.Patch(couponMember);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CouponMemberExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.PATCH, JsonConvert.SerializeObject(patch)));
            return Updated(couponMember);
        }

        // DELETE: odata/CouponMembers(5)
        public IHttpActionResult Delete([FromODataUri] string key)
        {
            CouponMember couponMember = db.CouponMember.Find(key);
            if (couponMember == null)
            {
                return NotFound();
            }

            db.CouponMember.Remove(couponMember);
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

        private bool CouponMemberExists(string key)
        {
            return db.CouponMember.Count(e => e.CouponMemberID == key) > 0;
        }
    }
}
