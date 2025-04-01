namespace Jegymester.DataContext.Dtos;

/*public class ScreeningDto
{
    public int Id { get; set; }
    public int MovieId { get; set; }
    public string MovieTitle { get; set; }
    public DateTime DateTime { get; set; }
    public string Location { get; set; }
    public int AvailableSeats { get; set; }
}
*/

public class ScreeningResponseDto
{
    public int Id { get; set; }
    public int MovieId { get; set; }
    public string MovieTitle { get; set; }
    public DateTime ScreeningTime { get; set; }
    public int AvailableSeats { get; set; }
}

public class ScreeningCreateDto
{
    public int MovieId { get; set; }
    public DateTime ScreeningTime { get; set; }
    public int TotalSeats { get; set; }
}

public class ScreeningUpdateDto
{
    public DateTime? ScreeningTime { get; set; }
    public int? TotalSeats { get; set; }
}
