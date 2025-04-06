using Jegymester.DataContext.Dtos;
using Jegymester.DataContext.Context;
using Jegymester.DataContext.Entities;
using Microsoft.EntityFrameworkCore;

public interface IMovieService
{
    Task<IEnumerable<MovieDto>> GetAllMoviesAsync();
    Task<MovieDto> GetMovieByIdAsync(int id);
    Task<MovieDto> CreateMovieAsync(MovieCreateDto movieDto);
    Task<MovieDto> UpdateMovieAsync(int id, MovieUpdateDto movieDto);
    Task<bool> DeleteMovieAsync(int id);
}

public class MovieService : IMovieService
{
    private readonly AppDbContext _context;

    public MovieService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<MovieDto>> GetAllMoviesAsync()
    {
        return await _context.Movies
            .Select(m => new MovieDto
            {
                Id = m.Id,
                Title = m.Title,
                Description = m.Description,
                Duration = m.Duration,
                Genre = m.Genre
            })
            .ToListAsync();
    }

    public async Task<MovieDto> GetMovieByIdAsync(int id)
    {
        var movie = await _context.Movies.FindAsync(id);
        if (movie == null) return null;

        return new MovieDto
        {
            Id = movie.Id,
            Title = movie.Title,
            Description = movie.Description,
            Duration = movie.Duration,
            Genre = movie.Genre
        };
    }

    public async Task<MovieDto> CreateMovieAsync(MovieCreateDto movieDto)
    {
        var movie = new Movie
        {
            Title = movieDto.Title,
            Description = movieDto.Description,
            Duration = movieDto.Duration,
            Genre = movieDto.Genre
        };

        _context.Movies.Add(movie);
        await _context.SaveChangesAsync();

        return new MovieDto
        {
            Id = movie.Id,
            Title = movie.Title,
            Description = movie.Description,
            Duration = movie.Duration,
            Genre = movie.Genre
        };
    }

    public async Task<MovieDto> UpdateMovieAsync(int id, MovieUpdateDto movieDto)
    {
        var movie = await _context.Movies.FindAsync(id);
        if (movie == null) return null;

        movie.Title = movieDto.Title ?? movie.Title;
        movie.Description = movieDto.Description ?? movie.Description;
        movie.Duration = movieDto.Duration > 0 ? movieDto.Duration : movie.Duration;
        movie.Genre = movieDto.Genre ?? movie.Genre;

        await _context.SaveChangesAsync();

        return new MovieDto
        {
            Id = movie.Id,
            Title = movie.Title,
            Description = movie.Description,
            Duration = movie.Duration,
            Genre = movie.Genre
        };
    }

    public async Task<bool> DeleteMovieAsync(int id)
    {
        var movie = await _context.Movies.FindAsync(id);
        if (movie == null) return false;

        var hasScreenings = await _context.Screenings.AnyAsync(s => s.MovieId == id);
        if (hasScreenings) return false;

        _context.Movies.Remove(movie);
        await _context.SaveChangesAsync();
        return true;
    }
}
