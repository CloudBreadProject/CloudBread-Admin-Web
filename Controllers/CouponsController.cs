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
using Newtonsoft.Json;

namespace CloudBread_Admin_Web.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using CloudBread_Admin_Web;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Coupon>("Coupons");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class CouponsController : ODataController
    {
        private CBEntities db = new CBEntities();
        Logging.CBLoggerBuilder logBuilder = new Logging.CBLoggerBuilder("Coupons");

        // GET: odata/Coupons
        [EnableQuery]
        public IQueryable<Coupon> GetCoupons()
        {
            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.GET));
            return db.Coupon;
        }

        // GET: odata/Coupons(5)
        [EnableQuery]
        public SingleResult<Coupon> GetCoupon([FromODataUri] string key)
        {
            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.GETbyIID));
            return SingleResult.Create(db.Coupon.Where(coupon => coupon.CouponID == key));
        }

        // PUT: odata/Coupons(5)
        public IHttpActionResult Put([FromODataUri] string key, Delta<Coupon> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Coupon coupon = db.Coupon.Find(key);
            if (coupon == null)
            {
                return NotFound();
            }

            patch.Put(coupon);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CouponExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.PUT, JsonConvert.SerializeObject(patch)));
            return Updated(coupon);
        }

        // POST: odata/Coupons
        public IHttpActionResult Post(Coupon coupon)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Coupon.Add(coupon);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (CouponExists(coupon.CouponID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            Logging.RunLog(logBuilder.build(this, 
                Logging.CBLoggerBuilder.LevelType.INFO, 
                Logging.CBLoggerBuilder.LoggerType.POST, 
                 JsonConvert.SerializeObject(coupon)));

            return Created(coupon);
        }

        // PATCH: odata/Coupons(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] string key, Delta<Coupon> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Coupon coupon = db.Coupon.Find(key);
            if (coupon == null)
            {
                return NotFound();
            }

            patch.Patch(coupon);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CouponExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            Logging.RunLog(logBuilder.build(this, Logging.CBLoggerBuilder.LevelType.INFO, Logging.CBLoggerBuilder.LoggerType.PATCH, JsonConvert.SerializeObject(patch)));
            return Updated(coupon);
        }

        // DELETE: odata/Coupons(5)
        public IHttpActionResult Delete([FromODataUri] string key)
        {
            Coupon coupon = db.Coupon.Find(key);
            if (coupon == null)
            {
                return NotFound();
            }

            db.Coupon.Remove(coupon);
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

        private bool CouponExists(string key)
        {
            return db.Coupon.Count(e => e.CouponID == key) > 0;
        }
    }
}
