using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Jegymester.Services;
using Jegymester.DataContext.Dtos;

[Route("api/screenings")]
[ApiController]
public class ScreeningsController : ControllerBase
{
    private readonly IScreeningService _screeningService;

    public ScreeningsController(IScreeningService screeningService)
    {
        _screeningService = screeningService;
    }

    // Összes vetítés listázása
    [HttpGet]
    public async Task<IActionResult> GetScreenings()
    {
        var screenings = await _screeningService.GetAllScreeningsAsync();
        return Ok(screenings);
    }

    // Egy adott vetítés lekérdezése
    [HttpGet("{id}")]
    public async Task<IActionResult> GetScreening(int id)
    {
        var screening = await _screeningService.GetScreeningByIdAsync(id);
        if (screening == null)
        {
            return NotFound(new { message = "Vetítés nem található" });
        }
        return Ok(screening);
    }

    // Új vetítés létrehozása (Admin)
    [HttpPost]
    //[Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateScreening([FromBody] ScreeningCreateDto screeningDto)
    {
        var newScreening = await _screeningService.CreateScreeningAsync(screeningDto);
        return CreatedAtAction(nameof(GetScreening), new { id = newScreening.Id }, newScreening);
    }

    // Vetítés módosítása (Admin)
    [HttpPut("{id}")]
    //[Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateScreening(int id, [FromBody] ScreeningUpdateDto screeningDto)
    {
        var updatedScreening = await _screeningService.UpdateScreeningAsync(id, screeningDto);
        if (updatedScreening == null)
        {
            return NotFound(new { message = "Vetítés nem található" });
        }
        return Ok(updatedScreening);
    }

    // Vetítés törlése (Admin)
    [HttpDelete("{id}")]
    //[Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteScreening(int id)
    {
        var success = await _screeningService.DeleteScreeningAsync(id);
        if (!success)
        {
            return NotFound(new { message = "Vetítés nem található vagy nem törölhető" });
        }
        return NoContent();
    }
}
