using Microsoft.AspNetCore.Mvc;
using Jegymester.Services;
using Jegymester.DataContext.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Jegymester.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketController : ControllerBase
    {
        private readonly ITicketService _ticketService;

        public TicketController(ITicketService ticketService)
        {
            _ticketService = ticketService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TicketDto>>> GetTickets()
        {
            var tickets = await _ticketService.GetAllTicketsAsync();
            return Ok(tickets);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TicketDto>> GetTicket(int id)
        {
            var ticket = await _ticketService.GetTicketByIdAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }
            return Ok(ticket);
        }

        [HttpPost]
        public async Task<ActionResult<TicketDto>> CreateTicket([FromBody] TicketDto ticketDto)
        {
            var createdTicket = await _ticketService.CreateTicketAsync(ticketDto);
            return CreatedAtAction(nameof(GetTicket), new { id = createdTicket.Id }, createdTicket);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTicket(int id, [FromBody] TicketDto ticketDto)
        {
            var updated = await _ticketService.UpdateTicketAsync(id, ticketDto);
            if (!updated)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            var deleted = await _ticketService.DeleteTicketAsync(id);
            if (!deleted)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}