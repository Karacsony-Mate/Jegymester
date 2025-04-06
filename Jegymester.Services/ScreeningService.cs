using AutoMapper;
using Jegymester.DataContext.Context;
using Jegymester.DataContext.Dtos;
using Jegymester.DataContext.Entities;
using Microsoft.EntityFrameworkCore;

public interface IScreeningService
{
    Task<IEnumerable<ScreeningDto>> GetAllScreeningsAsync();
    Task<ScreeningDto> GetScreeningByIdAsync(int id);
    Task<ScreeningDto> CreateScreeningAsync(ScreeningCreateDto screeningDto);
    Task<ScreeningDto> UpdateScreeningAsync(int id, ScreeningUpdateDto screeningDto);
    Task<bool> DeleteScreeningAsync(int id);
}

public class ScreeningService : IScreeningService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public ScreeningService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<ScreeningDto>> GetAllScreeningsAsync()
    {
        var screenings = await _context.Screenings
            .Include(s => s.Movie)
            .ToListAsync();

        return screenings.Select(s => new ScreeningDto
        {
            Id = s.Id,
            MovieId = s.MovieId,
            MovieTitle = s.Movie.Title,
            DateTime = s.DateTime,
            Location = s.Location,
            AvailableSeats = s.AvaliableSeats
        });
    }

    public async Task<ScreeningDto> GetScreeningByIdAsync(int id)
    {
        var screening = await _context.Screenings
            .Include(s => s.Movie)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (screening == null) return null;

        return new ScreeningDto
        {
            Id = screening.Id,
            MovieId = screening.MovieId,
            MovieTitle = screening.Movie.Title,
            DateTime = screening.DateTime,
            Location = screening.Location,
            AvailableSeats = screening.AvaliableSeats
        };
    }

    public async Task<ScreeningDto> CreateScreeningAsync(ScreeningCreateDto screeningDto)
    {
        var movie = await _context.Movies.FindAsync(screeningDto.MovieId);
        if (movie == null) throw new KeyNotFoundException("Movie not found.");

        var screening = new Screening
        {
            MovieId = screeningDto.MovieId,
            DateTime = screeningDto.DateTime,
            Location = screeningDto.Location,
            AvaliableSeats = screeningDto.AvaliableSeats
        };

        _context.Screenings.Add(screening);
        await _context.SaveChangesAsync();

        return await GetScreeningByIdAsync(screening.Id);
    }

    public async Task<ScreeningDto> UpdateScreeningAsync(int id, ScreeningUpdateDto screeningDto)
    {
        var screening = await _context.Screenings.FindAsync(id);
        if (screening == null) return null;

        if (screeningDto.DateTime != default(DateTime))
            screening.DateTime = screeningDto.DateTime;

        if (!string.IsNullOrEmpty(screeningDto.Location))
            screening.Location = screeningDto.Location;

        if (screeningDto.AvaliableSeats > 0)
            screening.AvaliableSeats = screeningDto.AvaliableSeats;

        await _context.SaveChangesAsync();
        return await GetScreeningByIdAsync(screening.Id);
    }

    public async Task<bool> DeleteScreeningAsync(int id)
    {
        var screening = await _context.Screenings.FindAsync(id);
        if (screening == null) return false;

        _context.Screenings.Remove(screening);
        await _context.SaveChangesAsync();
        return true;
    }
}
