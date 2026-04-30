using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CatalogWeb.WebAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {

            // Web API routes
            config.MapHttpAttributeRoutes();

            // Define the "Any Origin" policy globally
            EnableCorsAttribute cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);

            // Web API configuration and services

  

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "TwoApi",
                routeTemplate: "api/{controller}/{idParam}/{titleContainsParam}/{compLyrContainsParam}",
                defaults: new { idParam = RouteParameter.Optional, titleContainsParam = RouteParameter.Optional, compLyrContainsParam = RouteParameter.Optional }
            );

            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));

            // code above will not return a strict "application/json" response, if you want a strict "application/json" response you can use the below.  

            //var json = config.Formatters.JsonFormatter;
            //json.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.None;
            //config.Formatters.Remove(config.Formatters.XmlFormatter);
            //json.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;

        }


    }
}
