using Microsoft.AspNetCore.Http;
using IImporter;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace BackApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReflectionController : ControllerBase
    {
        [HttpGet("importers")]
        public IActionResult GetImporters()
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "reflection");
            if (!Directory.Exists(path))
                return Ok(Array.Empty<string>());

            var dlls = new List<string>();
            foreach (var file in Directory.GetFiles(path, "*.dll"))
            {
                try
                {
                    var assembly = Assembly.LoadFrom(file);
                    var containsImporter = assembly.GetTypes().Any(t =>
                        t.IsClass &&
                        !t.IsAbstract &&
                        typeof(ImporterInterface).IsAssignableFrom(t));
                    if (containsImporter)
                        dlls.Add(Path.GetFileName(file));
                }
                catch { }
            }
            return Ok(dlls);
        }
    }
}
