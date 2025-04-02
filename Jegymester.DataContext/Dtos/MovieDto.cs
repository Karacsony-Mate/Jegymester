namespace Jegymester.DataContext.Dtos;

public class MovieDto
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public int Duration { get; set; }
    public string? Genre { get; set; }
}

public class MovieResponseDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public int Duration { get; set; }
    public string Genre { get; set; }
}

public class MovieCreateDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public int Duration { get; set; }
    public string Genre { get; set; }
}

public class MovieUpdateDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public int Duration { get; set; }
    public string Genre { get; set; }
}
