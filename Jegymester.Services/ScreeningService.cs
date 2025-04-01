using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Jegymester.DataContext.Context;
using Jegymester.DataContext.Dtos;
using Jegymester.DataContext.Entities;
using Microsoft.EntityFrameworkCore;

public interface IScreeningService
{
    Task<IEnumerable<ScreeningResponseDto>> GetAllScreeningsAsync();
    Task<ScreeningResponseDto> GetScreeningByIdAsync(int id);
    Task<ScreeningResponseDto> CreateScreeningAsync(ScreeningCreateDto screeningDto);
    Task<ScreeningResponseDto> UpdateScreeningAsync(int id, ScreeningUpdateDto screeningDto);
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

    public async Task<IEnumerable<ScreeningResponseDto>> GetAllScreeningsAsync()
    {
        var screenings = await _context.Screenings
            .Include(s => s.Movie)
            .ToListAsync();

        return screenings.Select(s => new ScreeningResponseDto
        {
            Id = s.Id,
            MovieId = s.MovieId,
            MovieTitle = s.Movie.Title,
            ScreeningTime = s.ScreeningTime,
            AvailableSeats = s.TotalSeats
        });
    }

    public async Task<ScreeningResponseDto> GetScreeningByIdAsync(int id)
    {
        var screening = await _context.Screenings
            .Include(s => s.Movie)
            .FirstOrDefaultAsync(s => s.Id == id);
        
        if (screening == null) return null;

        return new ScreeningResponseDto
        {
            Id = screening.Id,
            MovieId = screening.MovieId,
            MovieTitle = screening.Movie.Title,
            ScreeningTime = screening.ScreeningTime,
            AvailableSeats = screening.TotalSeats
        };
    }

    public async Task<ScreeningResponseDto> CreateScreeningAsync(ScreeningCreateDto screeningDto)
    {
        var screening = new Screening
        {
            MovieId = screeningDto.MovieId,
            ScreeningTime = screeningDto.ScreeningTime,
            TotalSeats = screeningDto.TotalSeats
        };

        _context.Screenings.Add(screening);
        await _context.SaveChangesAsync();

        return await GetScreeningByIdAsync(screening.Id);
    }

    public async Task<ScreeningResponseDto> UpdateScreeningAsync(int id, ScreeningUpdateDto screeningDto)
    {
        var screening = await _context.Screenings.FindAsync(id);
        if (screening == null) return null;

        if (screeningDto.ScreeningTime.HasValue)
            screening.ScreeningTime = screeningDto.ScreeningTime.Value;

        if (screeningDto.TotalSeats.HasValue)
            screening.TotalSeats = screeningDto.TotalSeats.Value;

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