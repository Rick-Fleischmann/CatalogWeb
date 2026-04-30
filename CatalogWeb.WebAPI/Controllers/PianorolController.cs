using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CatalogWeb.WebAPI.Controllers
{
    public class PianorolController : ApiController
    {
        CatalogDbEntities _db = new CatalogDbEntities();

      
        
        // GET api/values
        public IEnumerable<Pianorol> Get(
            string TITLE, 
            string COMP_LYR,
            string PERFORMER,
            string PUBLISHER,
            string TITLEYEAR,
            string ARRANGYEAR,
            string ARRANGTYPE,
            string PRODTYPE,
            string PRODTITLE,
            string NOTES,
            string COMPANY,
            string MEDIACAT,
            string PICTURE,
            string SEARCHBOX,
            string ROW_START,
            string SORT_BY
            )
        {

 
            var model = _db.Database
                .SqlQuery<Pianorol>("GetPianorol @fTITLE, @fCOMP_LYR, @fPERFORMER, @fPUBLISHER ,@fTITLEYEAR ,@fARRANGYEAR, @fARRANGTYPE, @fPRODTYPE ,@fPRODTITLE ,@fNOTES ,@fCOMPANY ,@fMEDIACAT , @fPICTURE, @fSEARCHBOX, @fROW_START, @fSORT_BY ",
                new SqlParameter("@fTITLE", TITLE),
                new SqlParameter("@fCOMP_LYR", COMP_LYR),
                new SqlParameter("@fPERFORMER", PERFORMER),
                 new SqlParameter("@fPUBLISHER",PUBLISHER),
                new SqlParameter("@fTITLEYEAR",TITLEYEAR),
                new SqlParameter("@fARRANGYEAR",ARRANGYEAR),
                new SqlParameter("@fARRANGTYPE", ARRANGTYPE),
                new SqlParameter("@fPRODTYPE",PRODTYPE),
                new SqlParameter("@fPRODTITLE",PRODTITLE),
                new SqlParameter("@fNOTES",NOTES),
                new SqlParameter("@fCOMPANY",COMPANY),
                new SqlParameter("@fMEDIACAT",MEDIACAT),
                new SqlParameter("@fPICTURE", PICTURE),
                new SqlParameter("@fSEARCHBOX", SEARCHBOX),
                new SqlParameter("@fROW_START",ROW_START),
                new SqlParameter("@fSORT_BY", SORT_BY)

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
