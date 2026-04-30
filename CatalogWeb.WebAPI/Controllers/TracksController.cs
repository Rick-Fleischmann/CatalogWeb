using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CatalogWeb.WebAPI.Controllers
{
    public class TracksController : ApiController
    {
        CatalogDbEntities _db = new CatalogDbEntities();

       
        
        // GET api/values
        public IEnumerable<Track> Get(
            
            string MEDIA_TITLE,
            string MEDIUM,
            string MEDIACAT,
            string COMPANY,
            string REC_MONTH,
            string REC_DAY,
            string REC_YEAR,
            string TITLE, 
            string COMP_LYR,
            string ARRANGER,
            string PERFORMER,
            string PUBLISHER,
            string TITLEYEAR,
            string ARRANGYEAR,
            string ARRANGTYPE,
            string PRODTYPE,
            string PRODTITLE,
            string NOTES,
            string PICTURE,
            string SEARCHBOX,
            string ROW_START,
            string SORT_BY
            )
        {

 
            var model = _db.Database
                .SqlQuery<Track>("GetTracks @fMEDIA_TITLE, @fMEDIUM , @fMEDIACAT , @fCOMPANY , @fREC_MONTH , @fREC_DAY , @fREC_YEAR , @fTITLE ,  @fCOMP_LYR  , @fARRANGER   , @fPERFORMER , @fPUBLISHER   , @fTITLEYEAR   , @fARRANGYEAR   , @fARRANGTYPE   , @fPRODTYPE  , @fPRODTITLE   , @fNOTES   , @fPICTURE   , @fSEARCHBOX , @fROW_START , @fSORT_BY",
                 new SqlParameter("@fMEDIA_TITLE", MEDIA_TITLE),
                 new SqlParameter("@fMEDIUM", MEDIUM),
                 new SqlParameter("@fMEDIACAT", MEDIACAT),
                 new SqlParameter("@fCOMPANY", COMPANY),
                 new SqlParameter("@fREC_MONTH", REC_MONTH),
                 new SqlParameter("@fREC_DAY", REC_DAY),
                 new SqlParameter("@fREC_YEAR", REC_YEAR),              
                new SqlParameter("@fTITLE", TITLE),
                new SqlParameter("@fCOMP_LYR",COMP_LYR),
                new SqlParameter("@fARRANGER",ARRANGER),
                new SqlParameter("@fPERFORMER",PERFORMER),
                new SqlParameter("@fPUBLISHER",PUBLISHER),
                new SqlParameter("@fTITLEYEAR",TITLEYEAR),
                new SqlParameter("@fARRANGYEAR",ARRANGYEAR),
                new SqlParameter("@fARRANGTYPE", ARRANGTYPE),
                new SqlParameter("@fPRODTYPE",PRODTYPE),
                new SqlParameter("@fPRODTITLE",PRODTITLE),
                new SqlParameter("@fNOTES",NOTES),
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
