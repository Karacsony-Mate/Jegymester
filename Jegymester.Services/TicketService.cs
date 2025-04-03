using System.Collections.Generic;
using System.Threading.Tasks;
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
        Task<TicketDto> GetTicketByIdAsync(int id);
        Task<TicketDto> CreateTicketAsync(TicketDto ticketDto);
        Task<bool> UpdateTicketAsync(int id, TicketDto ticketDto);
        Task<bool> DeleteTicketAsync(int id);
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

        public async Task<TicketDto> GetTicketByIdAsync(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            return ticket == null ? null : _mapper.Map<TicketDto>(ticket);
        }

        public async Task<TicketDto> CreateTicketAsync(TicketDto ticketDto)
        {
            //Console.WriteLine($"DEBUG: Ticket Create Attempt - ScreeningId: {ticketDto.ScreeningId}, UserId: {ticketDto.UserId}, Price: {ticketDto.Price}");

            var ticket = new Ticket
            {
                ScreeningId = ticketDto.ScreeningId,
                UserId = ticketDto.UserId,
                Price = ticketDto.Price
            };

            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();
    
            //Console.WriteLine($"DEBUG: Ticket Created - Id: {ticket.Id}");

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

            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}