using Microsoft.AspNetCore.Mvc;
using Jegymester.Services;

namespace Jegymester.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class orig_MovieController : ControllerBase
    {
        private readonly IMovieService _movieService;

        public orig_MovieController(IMovieService movieService)
        {
            _movieService = movieService;
        }

//        [HttpGet]
//        public IActionResult List()
//        {
//            var result = _movieService.List();
//            return Ok(result);
//        }
    }
}