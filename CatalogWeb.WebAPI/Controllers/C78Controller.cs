using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Http;

namespace CatalogWeb.WebAPI.Controllers
{
    public class C78Controller : ApiController
    {
        CatalogDbEntities _db = new CatalogDbEntities();

        // GET api/C78
        [HttpGet]
        public IEnumerable<C78> Get(
            string TITLE = null,
            string CATNUM = null,
            string COMP_LYR = null,
            string PERFORMER = null,
            string PUBLISHER = null,
            string PRODTYPE = null,
            string PRODTITLE = null,
            string ARRANGTYPE = null,
            string NOTES = null,
            string COMPANY = null,
            string RECDAY = null,
            string RECMONTH = null,
            string RECYEAR = null,
            string LOCATION = null,
            string PICTURE = null,
            string YOUTUBE = null,
            string SEARCHBOX = null,
            string ROW_START = "1",
            string SORT_BY = "TITLE")
        {
            var model = _db.Database
                .SqlQuery<C78>(
                    "Get78 @fTITLE, @fCATNUM, @fCOMP_LYR, @fPERFORMER, @fPUBLISHER, @fPRODTYPE, @fPRODTITLE, @fARRANGTYPE, @fNOTES, @fCOMPANY, @fRECDAY, @fRECMONTH, @fRECYEAR, @fLOCATION, @fPICTURE, @fYOUTUBE, @fSEARCHBOX, @fROW_START, @fSORT_BY",
                    P("@fTITLE", TITLE),
                    P("@fCATNUM", CATNUM),
                    P("@fCOMP_LYR", COMP_LYR),
                    P("@fPERFORMER", PERFORMER),
                    P("@fPUBLISHER", PUBLISHER),
                    P("@fPRODTYPE", PRODTYPE),
                    P("@fPRODTITLE", PRODTITLE),
                    P("@fARRANGTYPE", ARRANGTYPE),
                    P("@fNOTES", NOTES),
                    P("@fCOMPANY", COMPANY),
                    P("@fRECDAY", RECDAY),
                    P("@fRECMONTH", RECMONTH),
                    P("@fRECYEAR", RECYEAR),
                    P("@fLOCATION", LOCATION),
                    P("@fPICTURE", PICTURE),
                    P("@fYOUTUBE", YOUTUBE),
                    P("@fSEARCHBOX", SEARCHBOX),
                    P("@fROW_START", ROW_START),
                    P("@fSORT_BY", SORT_BY))
                .ToList();

            return model;
        }

        // Converts null to DBNull so SQL Server receives NULL
        private static SqlParameter P(string name, object value)
        {
            return new SqlParameter(name, value ?? DBNull.Value);
        }

        protected override void Dispose(bool disposing)
        {
            if (_db != null)
            {
                _db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}