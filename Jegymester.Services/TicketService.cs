using AutoMapper;
using Jegymester.DataContext.Context;
using Jegymester.DataContext.Dtos;
using Jegymester.DataContext.Entities;
using Microsoft.EntityFrameworkCore;

namespace Jegymester.Services
{
    public interface ITicketService
    {
        Task<IEnumerable<TicketDto>> GetAllTicketsAsync();
        Task<IEnumerable<TicketDto>> GetTicketsByUserIdAsync(int userId);
        Task<TicketDto> GetTicketByIdAsync(int id);
        Task<TicketDto> CreateTicketAsync(TicketDto ticketDto);
        Task<bool> UpdateTicketAsync(int id, TicketDto ticketDto);
        Task<bool> DeleteTicketAsync(int id);
        Task<TicketDto> PurchaseTicketAsync(TicketPurchaseDto ticketPurchaseDto);
        Task<bool> ConfirmTicketAsync(int id);
        Task<TicketDto> PurchaseOfflineTicketAsync(TicketPurchaseOfflineDto ticketPurchaseOfflineDto);
    }
    
    public class TicketService : ITicketService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public TicketService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TicketDto>> GetAllTicketsAsync()
        {
            var tickets = await _context.Tickets.ToListAsync();
            return _mapper.Map<IEnumerable<TicketDto>>(tickets);
        }

        public async Task<IEnumerable<TicketDto>> GetTicketsByUserIdAsync(int userId)
        {
            var tickets = await _context.Tickets
                .Where(t => t.UserId == userId)
                .ToListAsync();

            return _mapper.Map<IEnumerable<TicketDto>>(tickets);
        }

        public async Task<TicketDto> GetTicketByIdAsync(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            return ticket == null ? null : _mapper.Map<TicketDto>(ticket);
        }

        public async Task<TicketDto> CreateTicketAsync(TicketDto ticketDto)
        {
            var ticket = new Ticket
            {
                ScreeningId = ticketDto.ScreeningId,
                UserId = ticketDto.UserId,
                Price = ticketDto.Price,
                PurchaseDate = DateTime.Now
            };

            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();

            return _mapper.Map<TicketDto>(ticket);
        }

        public async Task<TicketDto> PurchaseTicketAsync(TicketPurchaseDto ticketPurchaseDto)
        {
            var screening = await _context.Screenings.FindAsync(ticketPurchaseDto.ScreeningId);
            if (screening == null || screening.AvaliableSeats <= 0)
            {
                throw new InvalidOperationException("A vetítés nem található vagy nincs elérhetõ hely.");
            }

            var ticket = new Ticket
            {
                ScreeningId = ticketPurchaseDto.ScreeningId,
                UserId = ticketPurchaseDto.UserId,
                Price = ticketPurchaseDto.Price,
                PurchaseDate = DateTime.Now
            };

            screening.AvaliableSeats--;

            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();

            return _mapper.Map<TicketDto>(ticket);
        }

        public async Task<bool> ConfirmTicketAsync(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null) return false;

            ticket.IsConfirmed = true;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<TicketDto> PurchaseOfflineTicketAsync(TicketPurchaseOfflineDto ticketPurchaseOfflineDto)
        {
            var screening = await _context.Screenings.FindAsync(ticketPurchaseOfflineDto.ScreeningId);
            if (screening == null || screening.AvaliableSeats <= 0)
            {
                throw new InvalidOperationException("A vetítés nem található vagy nincs elérhetõ hely.");
            }

            var ticket = new Ticket
            {
                ScreeningId = ticketPurchaseOfflineDto.ScreeningId,
                Price = ticketPurchaseOfflineDto.Price,
                PurchaseDate = DateTime.Now,
                UserId = ticketPurchaseOfflineDto.UserId
            };

            screening.AvaliableSeats--;

            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();

            return _mapper.Map<TicketDto>(ticket);
        }

        public async Task<bool> UpdateTicketAsync(int id, TicketDto ticketDto)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null) return false;

            _mapper.Map(ticketDto, ticket);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteTicketAsync(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null) return false;

            var screening = await _context.Screenings.FindAsync(ticket.ScreeningId);
            if (screening == null || DateTime.Now > screening.DateTime.AddHours(-4))
            {
                throw new InvalidOperationException("A vetítés 4 órán belül kezdõdik, a jegyet nem lehet törölni!");
            }

            _context.Tickets.Remove(ticket);
            screening.AvaliableSeats++;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
