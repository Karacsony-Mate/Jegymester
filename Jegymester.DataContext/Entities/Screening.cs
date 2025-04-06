namespace Jegymester.DataContext.Entities
{
    public class Screening
    {
        public int Id { get; set; }
        public int MovieId { get; set; }
        public Movie Movie { get; set; }
        public DateTime DateTime { get; set; }
        public string? Location { get; set; }
        public int AvaliableSeats { get; set; }
    }
}
