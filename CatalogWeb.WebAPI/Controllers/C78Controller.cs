using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CatalogWeb.WebAPI.Controllers
{
    public class C78Controller : ApiController
    {
        CatalogDbEntities _db = new CatalogDbEntities();

       
        
        // GET api/values
        public IEnumerable<C78> Get(
string TITLE,
string CATNUM,
string COMP_LYR,
string PERFORMER,
string PUBLISHER,
string PRODTYPE,
string PRODTITLE,
string ARRANGTYPE,
string NOTES,
string COMPANY,
string RECDAY,
string RECMONTH,
string RECYEAR,
string LOCATION,
string PICTURE,
string SEARCHBOX,
string ROW_START,
string SORT_BY	

            )
        {

   
            var model = _db.Database
                .SqlQuery<C78>("Get78 @fTITLE,	@fCATNUM,	@fCOMP_LYR,	@fPERFORMER, @fPUBLISHER,	@fPRODTYPE,	@fPRODTITLE, @fARRANGTYPE,	@fNOTES, @fCOMPANY,	@fRECDAY, @fRECMONTH, @fRECYEAR, @fLOCATION, @fPICTURE, @fSEARCHBOX, @fROW_START,	@fSORT_BY ",
                new SqlParameter("@fTITLE",TITLE),
                new SqlParameter("@fCATNUM",CATNUM),
                new SqlParameter("@fCOMP_LYR",COMP_LYR),
                new SqlParameter("@fPERFORMER", PERFORMER),
                new SqlParameter("@fPUBLISHER",PUBLISHER),
                new SqlParameter("@fPRODTYPE",PRODTYPE),
                new SqlParameter("@fPRODTITLE",PRODTITLE),
                new SqlParameter("@fARRANGTYPE",ARRANGTYPE),
                new SqlParameter("@fNOTES",NOTES),
                new SqlParameter("@fCOMPANY",COMPANY),
                new SqlParameter("@fRECDAY", RECDAY),
                new SqlParameter("@fRECMONTH", RECMONTH),
                new SqlParameter("@fRECYEAR", RECYEAR),
                new SqlParameter("@fLOCATION", LOCATION),
                new SqlParameter("@fPICTURE", PICTURE),
               new SqlParameter("@fSEARCHBOX", SEARCHBOX),
                new SqlParameter("@fROW_START",ROW_START),
                new SqlParameter("@fSORT_BY",SORT_BY)
                )
                .ToList();

            return model;

        }

        
        protected override void Dispose(bool disposing)
        {
            if (_db != null){
                _db.Dispose();
            }
            
            base.Dispose(disposing);
        }



 
    }
}
