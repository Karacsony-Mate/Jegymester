using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Jegymester.Services;
using Jegymester.DataContext.Dtos;

[Route("api/movies")]
[ApiController]
public class MoviesController : ControllerBase
{
    private readonly IMovieService _movieService;

    public MoviesController(IMovieService movieService)
    {
        _movieService = movieService;
    }

    // ✅ Összes film listázása
    [HttpGet]
    public async Task<IActionResult> GetMovies()
    {
        var movies = await _movieService.GetAllMoviesAsync();
        return Ok(movies);
    }

    // ✅ Egy adott film lekérdezése
    [HttpGet("{id}")]
    public async Task<IActionResult> GetMovie(int id)
    {
        var movie = await _movieService.GetMovieByIdAsync(id);
        if (movie == null)
        {
            return NotFound(new { message = "Film nem található" });
        }
        return Ok(movie);
    }

    // ✅ Új film hozzáadása (Admin)
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateMovie([FromBody] MovieCreateDto movieDto)
    {
        var newMovie = await _movieService.CreateMovieAsync(movieDto);
        return CreatedAtAction(nameof(GetMovie), new { id = newMovie.Id }, newMovie);
    }

    // ✅ Film módosítása (Admin)
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateMovie(int id, [FromBody] MovieUpdateDto movieDto)
    {
        var updatedMovie = await _movieService.UpdateMovieAsync(id, movieDto);
        if (updatedMovie == null)
        {
            return NotFound(new { message = "Film nem található" });
        }
        return Ok(updatedMovie);
    }

    // ✅ Film törlése (Admin)
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteMovie(int id)
    {
        var success = await _movieService.DeleteMovieAsync(id);
        if (!success)
        {
            return NotFound(new { message = "Film nem található vagy nem törölhető" });
        }
        return NoContent();
    }
}
