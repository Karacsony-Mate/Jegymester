namespace Jegymester.DataContext.Entities
{
    public class Ticket
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public Seat Seat { get; set; }
    }
}