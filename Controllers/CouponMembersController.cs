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

        Logging.CBLoggers logMsg = new Logging.CBLoggers();
        enum Loggers { GET, GETbyIID, PUT, POST, PATCH, DELETE};
        const string LogStr = "CouponMembers-";

        private void RunLog(Loggers logger, string message, string level = "INFO")
        {
            logMsg.memberID = CBAuth.getMemberID(this.User as ClaimsPrincipal);
            logMsg.Level = level;
            logMsg.Logger = logger.ToString();
            logMsg.Message = message;
            Logging.RunLog(logMsg);
        }

        // GET: odata/CouponMembers
        [EnableQuery]
        public IQueryable<CouponMember> GetCouponMembers()
        {
            
            return db.CouponMember;
        }

        // GET: odata/CouponMembers(5)
        [EnableQuery]
        public SingleResult<CouponMember> GetCouponMember([FromODataUri] string key)
        {
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
