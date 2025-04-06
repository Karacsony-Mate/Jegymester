using System.ComponentModel.DataAnnotations;

namespace Jegymester.DataContext.Dtos;

public class ScreeningDto
{
    public int Id { get; set; }
    public int MovieId { get; set; }
    public string MovieTitle { get; set; }
    public DateTime DateTime { get; set; }
    public string? Location { get; set; }
    public int AvailableSeats { get; set; }
}

public class ScreeningCreateDto
{
    [Required]
    public int MovieId { get; set; }

    [Required]
    public DateTime DateTime { get; set; }

    [Required]
    public string Location { get; set; }

    [Required]
    public int AvaliableSeats { get; set; }
}

public class ScreeningUpdateDto
{
    public DateTime DateTime { get; set; }

    public string Location { get; set; }

    public int AvaliableSeats { get; set; }
}
