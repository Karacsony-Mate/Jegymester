namespace Jegymester.DataContext.Entities
{
    public class Ticket
    {
        public int Id { get; set; }
        public Screening Screening { get; set; }
        public int ScreeningId { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public int Price { get; set; }
        public DateTime PurchaseDate { get; set; }
        public bool IsCancelled { get; set; }
    }
}