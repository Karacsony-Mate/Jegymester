namespace Jegymester.DataContext.Entities;

public class Payment
{
    public int Id { get; set; }
    public Ticket Ticket { get; set; }
    public int TicketId { get; set; }
    public int Amount { get; set; }
    public DateTime PaymentDate { get; set; }
    public int PaymentMethod { get; set; }
}