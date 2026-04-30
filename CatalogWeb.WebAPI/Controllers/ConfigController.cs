using System.Configuration;
using System.Web.Http;

namespace CatalogWeb.WebAPI.Controllers
{
    public class ConfigController : ApiController
    {
        [HttpGet]
        [Route("api/config")]
        public IHttpActionResult GetConfig()
        {
            // This pulls the value from your web.config <appSettings>
            var url = ConfigurationManager.AppSettings["apiBaseUrl"];

            return Ok(new { apiBaseUrl = url });
        }
    }
}
