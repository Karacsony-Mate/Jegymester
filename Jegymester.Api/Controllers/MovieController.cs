using Microsoft.AspNetCore.Mvc;
using Jegymester.DataContext.Dtos;
using Microsoft.AspNetCore.Authorization;

[Route("api/movies")]
[ApiController]
[Authorize]
public class MoviesController : ControllerBase
{
    private readonly IMovieService _movieService;
    public MoviesController(IMovieService movieService)
    {
        _movieService = movieService;
    }

    [HttpGet]
    public async Task<IActionResult> GetMovies()
    {
        try
        {
            var movies = await _movieService.GetAllMoviesAsync();
            return Ok(movies);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetMovie(int id)
    {
        try
        {
            var movie = await _movieService.GetMovieByIdAsync(id);
            if (movie == null)
            {
                return NotFound(new { message = "Film nem található!" });
            }
            return Ok(movie);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateMovie([FromBody] MovieCreateDto movieDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var newMovie = await _movieService.CreateMovieAsync(movieDto);
            return CreatedAtAction(nameof(GetMovie), new { id = newMovie.Id }, newMovie);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateMovie(int id, [FromBody] MovieUpdateDto movieDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var updatedMovie = await _movieService.UpdateMovieAsync(id, movieDto);
            if (updatedMovie == null)
            {
                return NotFound(new { message = "Film nem található" });
            }
            return Ok(updatedMovie);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteMovie(int id)
    {
        try
        {
            var success = await _movieService.DeleteMovieAsync(id);
            if (!success)
            {
                return NotFound(new { message = "Film nem található vagy nem törölhető" });
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
