using Microsoft.AspNetCore.Mvc;
using Jegymester.DataContext.Dtos;
using Microsoft.AspNetCore.Authorization;

[Route("api/screenings")]
[ApiController]
[Authorize(Roles = "Admin")]
public class ScreeningsController : ControllerBase
{
    private readonly IScreeningService _screeningService;

    public ScreeningsController(IScreeningService screeningService)
    {
        _screeningService = screeningService;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetScreenings()
    {
        try
        {
            var screenings = await _screeningService.GetAllScreeningsAsync();
            return Ok(screenings);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetScreening(int id)
    {
        try
        {
            var screening = await _screeningService.GetScreeningByIdAsync(id);
            if (screening == null)
            {
                return NotFound(new { message = "Vetítés nem található!" });
            }
            return Ok(screening);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPost]
    //[Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateScreening([FromBody] ScreeningCreateDto screeningDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var newScreening = await _screeningService.CreateScreeningAsync(screeningDto);
            return CreatedAtAction(nameof(GetScreening), new { id = newScreening.Id }, newScreening);
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
    //[Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateScreening(int id, [FromBody] ScreeningUpdateDto screeningDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var updatedScreening = await _screeningService.UpdateScreeningAsync(id, screeningDto);
            if (updatedScreening == null)
            {
                return NotFound(new { message = "Vetítés nem található!" });
            }
            return Ok(updatedScreening);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpDelete("{id}")]
    //[Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteScreening(int id)
    {
        try
        {
            var success = await _screeningService.DeleteScreeningAsync(id);
            if (!success)
            {
                return NotFound(new { message = "Vetítés nem található vagy nem törölhető!" });
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
