using System.Collections.Generic;
using System.Threading.Tasks;
using Jegymester.DataContext.Dtos;
using Jegymester.DataContext.Context;
using Jegymester.DataContext.Entities;
using Microsoft.EntityFrameworkCore;

public interface IMovieService
{
    Task<IEnumerable<MovieResponseDto>> GetAllMoviesAsync();
    Task<MovieResponseDto> GetMovieByIdAsync(int id);
    Task<MovieResponseDto> CreateMovieAsync(MovieCreateDto movieDto);
    Task<MovieResponseDto> UpdateMovieAsync(int id, MovieUpdateDto movieDto);
    Task<bool> DeleteMovieAsync(int id);
}

public class MovieService : IMovieService
{
    private readonly AppDbContext _context;

    public MovieService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<MovieResponseDto>> GetAllMoviesAsync()
    {
        return await _context.Movies
            .Select(m => new MovieResponseDto
            {
                Id = m.Id,
                Title = m.Title,
                Description = m.Description,
                Duration = m.Duration,
                Genre = m.Genre
            })
            .ToListAsync();
    }

    public async Task<MovieResponseDto> GetMovieByIdAsync(int id)
    {
        var movie = await _context.Movies.FindAsync(id);
        if (movie == null) return null;

        return new MovieResponseDto
        {
            Id = movie.Id,
            Title = movie.Title,
            Description = movie.Description,
            Duration = movie.Duration,
            Genre = movie.Genre
        };
    }

    public async Task<MovieResponseDto> CreateMovieAsync(MovieCreateDto movieDto)
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

        return new MovieResponseDto
        {
            Id = movie.Id,
            Title = movie.Title,
            Description = movie.Description,
            Duration = movie.Duration,
            Genre = movie.Genre
        };
    }

    public async Task<MovieResponseDto> UpdateMovieAsync(int id, MovieUpdateDto movieDto)
    {
        var movie = await _context.Movies.FindAsync(id);
        if (movie == null) return null;

        movie.Title = movieDto.Title ?? movie.Title;
        movie.Description = movieDto.Description ?? movie.Description;
        movie.Duration = movieDto.Duration > 0 ? movieDto.Duration : movie.Duration;
        movie.Genre = movieDto.Genre ?? movie.Genre;

        await _context.SaveChangesAsync();

        return new MovieResponseDto
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

        _context.Movies.Remove(movie);
        await _context.SaveChangesAsync();
        return true;
    }
}