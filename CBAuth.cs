using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Security.Claims;

namespace CloudBreadAdminWebAuth
{
    /**
    * @class CBAuth 
    * @brief Processing CloudBread auth related task class including 3rd party authentication. \n
    */
    public class CBAuth
    {
        /*
        * @brief Before setup the authentication provider in Azure Portal, return passed memberID for dev and test purpose. \n
        * @param pMemberID, pClaim object
        */
        public static string getMemberID(string pMemberID, ClaimsPrincipal pClaim)
        {
            string sid;

            try
            {
                if (pClaim.FindFirst(ClaimTypes.NameIdentifier) == null)
                {
                    /// local or non-authentication provider
                    sid = pMemberID;
                }
                else
                {
                    /// authentication provider set up
                    /// return Name from claim object
                    sid = pClaim.FindFirst(ClaimTypes.Name).Value;
                }
            }
            catch (Exception)
            {

                throw;
            }

            return sid;
        }

        /*
        * @brief Before setup the authentication provider in Azure Portal and debug mode, return dummy id for dev and test purpose. \n
        * @param pClaim object
        */
        public static string getMemberID(ClaimsPrincipal pClaim)
        {
            string sid;

            try
            {
#if DEBUG
                sid = "dummy@dummy.com";
#else
                /// authentication provider set up
                /// return Name from claim object
                sid = pClaim.FindFirst(ClaimTypes.Name).Value;
#endif
            }
            catch (Exception)
            {

                throw;
            }

            return sid;
        }
    }
}