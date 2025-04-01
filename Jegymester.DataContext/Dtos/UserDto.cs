using System.ComponentModel.DataAnnotations;

namespace Jegymester.DataContext.Dtos;

public class UserDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public IList<RoleDto> Role { get; set; }
    public IList<TicketDto> Tickets { get; set; }
}

public class UserRegisterDto
{
    [Required]
    [StringLength(50)]
    public string Name { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [MinLength(8)]
    public string Password { get; set; }

    [Phone]
    public string Phone { get; set; }

    public IList<int> RoleIds { get; set; }
}

public class UserLoginDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }
}

public class UserUpdateDto
{
    [Required]
    [StringLength(50)]
    public string Name { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Phone]
    public string PhoneNumber { get; set; }

    public IList<int> RoleIds { get; set; }
}  