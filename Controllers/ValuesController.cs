using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using CloudBreadAdminWebAuth;
using System.Security.Claims;

namespace CloudBread_Admin_Web.Controllers
{
    public class ValuesController : ApiController
    {
        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            //string sid = "";

            //var x = this.User as ClaimsPrincipal;
            //ClaimsPrincipal pClaim = new ClaimsPrincipal();
            //string Country = ClaimTypes..ToString();
            //string Country = pClaim.FindFirst(ClaimTypes.GroupSid).Value.ToString();
            //sid = CBAuth.getMemberID(this.User as ClaimsPrincipal);
            return "1";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
