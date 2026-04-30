using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CatalogWeb.WebAPI.Controllers
{
    public class SolosController : ApiController
    {
        CatalogDbEntities _db = new CatalogDbEntities();

       
        
        // GET api/values
        public IEnumerable<Solo> Get(
string TITLE,
string CATNUM,
string COMP_LYR,
string PUBLISHER,
string PHOTO,
string INSTRUMENT,
string TITLEYEAR,
string PRODTYPE,
string PRODTITLE,
string ARRANGTYPE,
string NOTES,
string PLATE_NUMBER,
string KEY,
string LARGE,
string ARRANGYEAR,
string PCN,
string PICTURE,
string SEARCHBOX,
string ROW_START,
string SORT_BY

            )
        {

   
            var model = _db.Database
                .SqlQuery<Solo>("GetSolos @fTITLE,	@fCATNUM,	@fCOMP_LYR,	@fPUBLISHER,	@fPHOTO, @fINSTRUMENT,	@fTITLEYEAR,	@fPRODTYPE,	@fPRODTITLE,	@fARRANGTYPE,	@fNOTES,	@fPLATE_NUMBER,	@fKEY, @fLARGE,	@fARRANGYEAR,	@fPCN,	@fPICTURE, @fSEARCHBOX, @fROW_START, @fSORT_BY ",
                new SqlParameter("@fTITLE",TITLE),
                new SqlParameter("@fCATNUM",CATNUM),
                new SqlParameter("@fCOMP_LYR",COMP_LYR),
                new SqlParameter("@fPUBLISHER",PUBLISHER),
                new SqlParameter("@fPHOTO",PHOTO),
                new SqlParameter("@fINSTRUMENT", INSTRUMENT),
                new SqlParameter("@fTITLEYEAR",TITLEYEAR),
                new SqlParameter("@fPRODTYPE",PRODTYPE),
                new SqlParameter("@fPRODTITLE",PRODTITLE),
                new SqlParameter("@fARRANGTYPE",ARRANGTYPE),
                new SqlParameter("@fNOTES",NOTES),
                new SqlParameter("@fPLATE_NUMBER",PLATE_NUMBER),
                new SqlParameter("@fKEY",KEY),
                new SqlParameter("@fLARGE",LARGE),
                new SqlParameter("@fARRANGYEAR",ARRANGYEAR),
                new SqlParameter("@fPCN",PCN),
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
