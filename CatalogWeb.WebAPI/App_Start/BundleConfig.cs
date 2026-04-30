using System.Web;
using System.Web.Optimization;
using CatalogWeb.WebAPI.Transforms;

namespace CatalogWeb.WebAPI
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            var jquery = new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js");
            // Replace default JsMinify (WebGrease) with NUglify-based transform to avoid WebGrease parser NREs
            jquery.Transforms.Clear();
            jquery.Transforms.Add(new NUglifyJsTransform());
            bundles.Add(jquery);

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            var bootstrap = new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js");
            bootstrap.Transforms.Clear();
            bootstrap.Transforms.Add(new NUglifyJsTransform());
            bundles.Add(bootstrap);

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = true;
        }
    }
}
