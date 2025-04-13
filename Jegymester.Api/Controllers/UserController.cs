using Microsoft.AspNetCore.Mvc;
using Jegymester.DataContext.Dtos;
using Jegymester.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Jegymester.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _userService.RegisterAsync(userDto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] UserLoginDto userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var token = await _userService.LoginAsync(userDto);
                return Ok(new { Token = token });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("Helytelen email cím vagy jelszó!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        //[Authorize]
        [HttpPut("update-profile")]
        [Authorize(Roles = "Admin,User,Cashier")]
        public async Task<IActionResult> UpdateProfile([FromBody] UserUpdateDto userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var userId = int.Parse(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                var result = await _userService.UpdateProfileAsync(userId, userDto);
                return Ok(result);
            }
            catch (KeyNotFoundException)
            {
                return NotFound("Felhasználó nem található!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("roles")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> GetRoles()
        {
            try
            {
                var result = await _userService.GetRolesAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
