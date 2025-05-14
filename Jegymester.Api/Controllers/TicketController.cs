using Microsoft.AspNetCore.Mvc;
using Jegymester.Services;
using Jegymester.DataContext.Dtos;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Jegymester.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize]
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

        [HttpGet("user/{userId}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<TicketDto>>> GetTicketsByUserId(int userId)
        {
            var tickets = await _ticketService.GetTicketsByUserIdAsync(userId);
            return Ok(tickets);
        }

        [HttpPost]
        public async Task<ActionResult<TicketDto>> CreateTicket([FromBody] TicketDto ticketDto)
        {
            var createdTicket = await _ticketService.CreateTicketAsync(ticketDto);
            return CreatedAtAction(nameof(GetTicket), new { id = createdTicket.Id }, createdTicket);
        }

        [HttpPost("purchase")]
        [Authorize]
        public async Task<ActionResult<TicketDto>> PurchaseTicket([FromBody] TicketPurchaseDto ticketPurchaseDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var userId = int.Parse(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                var createdTicket = await _ticketService.PurchaseTicketAsync(ticketPurchaseDto);
                return CreatedAtAction(nameof(GetTicket), new { id = createdTicket.Id }, createdTicket);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("confirm/{id}")]
        [Authorize(Roles = "Admin,Cashier")]
        public async Task<IActionResult> ConfirmTicket(int id)
        {
            var confirmed = await _ticketService.ConfirmTicketAsync(id);
            if (!confirmed)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpPost("purchase-offline")]
        [AllowAnonymous]
        public async Task<ActionResult<TicketDto>> PurchaseOfflineTicket([FromBody] TicketPurchaseOfflineDto ticketPurchaseOfflineDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var createdTicket = await _ticketService.PurchaseOfflineTicketAsync(ticketPurchaseOfflineDto);
                return CreatedAtAction(nameof(GetTicket), new { id = createdTicket.Id }, createdTicket);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
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
            try
            {
                var deleted = await _ticketService.DeleteTicketAsync(id);
                if (!deleted)
                {
                    return NotFound();
                }
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
