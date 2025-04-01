using Microsoft.AspNetCore.Mvc;
using Jegymester.DataContext.Dtos;
using Jegymester.Services;

namespace Jegymester.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto userDto)
        {
            var result = await _userService.RegisterAsync(userDto);
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto userDto)
        {
            var token = await _userService.LoginAsync(userDto);
            return Ok(new { Token = token });
        }

        //[Authorize]
        [HttpPut("update-profile/{userId}")]
        public async Task<IActionResult> UpdateProfile(int userId, [FromBody] UserUpdateDto userDto)
        {
            //var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
            var result = await _userService.UpdateProfileAsync(userId, userDto);
            return Ok(result);
        }

        [HttpGet("roles")]
        public async Task<IActionResult> GetRoles()
        {
            var result = await _userService.GetRolesAsync();
            return Ok(result);
        }
    }
}