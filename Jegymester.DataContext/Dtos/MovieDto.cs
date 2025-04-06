using System.ComponentModel.DataAnnotations;

namespace Jegymester.DataContext.Dtos;

public class MovieDto
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public int Duration { get; set; }
    public string? Genre { get; set; }
}

public class MovieCreateDto
{
    [Required]
    public string Title { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    public int Duration { get; set; }

    [Required]
    public string Genre { get; set; }
}

public class MovieUpdateDto
{
    [Required]
    public string Title { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    public int Duration { get; set; }

    [Required]
    public string Genre { get; set; }
}
