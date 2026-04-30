using System;
using System.Web.Optimization;
using NUglify;

namespace CatalogWeb.WebAPI.Transforms
{
    public class NUglifyJsTransform : IBundleTransform
    {
        public void Process(BundleContext context, BundleResponse response)
        {
            if (response == null || string.IsNullOrEmpty(response.Content)) return;

            try
            {
                var result = Uglify.Js(response.Content);
                if (result.HasErrors)
                {
                    // keep original content; optionally log result.Errors
                    return;
                }

                response.Content = result.Code;
                response.ContentType = "text/javascript";
            }
            catch (Exception)
            {
                // On any failure, preserve original content to avoid breaking the page
                // Consider logging the exception in real applications
                return;
            }
        }
    }
}
