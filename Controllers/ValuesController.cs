using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;


using System.IO;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

using CloudBreadAdminWebAuth;
using System.Security.Claims;
using Newtonsoft.Json;

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
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public string Post([FromBody]string value)
        { 
            InvokeRequestResponseService(value).Wait();

            
            return result;
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }

        public static string result;

        static async Task InvokeRequestResponseService(string value)
        {
            using (var client = new HttpClient())
            {
                const string apiKey = "+p7cRK/GQeCrV2aTdvA1AoynX1xMOiM6XERYOZJavVM6oC1mQM8seleThUoNliHCgkgQHYFgfHEt1ccNy3qeOw==";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

                string uri = "https://ussouthcentral.services.azureml.net/workspaces/902e0e2e69104035bee1bd2eefaff9d6/services/a715b1e8bc6f4e75a7090e7fc52832af/execute?api-version=2.0&details=true";
                //string uri = "http://requestb.in/136gjiu1";
                client.BaseAddress = new Uri(uri);
                //client.BaseAddress = new Uri("https://ussouthcentral.services.azureml.net/workspaces/902e0e2e69104035bee1bd2eefaff9d6/services/a715b1e8bc6f4e75a7090e7fc52832af/execute?api-version=2.0&details=true");

                var pObj = JsonConvert.DeserializeObject(value);

                //client.DefaultRequestHeaders.Add("Bearer", apiKey);

                HttpResponseMessage response = client.PostAsJsonAsync<object>(uri, pObj).Result;

                if (response.IsSuccessStatusCode)
                {
                    result = await response.Content.ReadAsStringAsync();
                    Console.WriteLine("Result: {0}", result);

                }
                else
                {
                    Console.WriteLine(string.Format("The request failed with status code: {0}", response.StatusCode));

                    // Print the headers - they include the requert ID and the timestamp, which are useful for debugging the failure
                    Console.WriteLine(response.Headers.ToString());

                    string responseContent = await response.Content.ReadAsStringAsync();
                    Console.WriteLine(responseContent);
                }
            }

        }
    }
}
