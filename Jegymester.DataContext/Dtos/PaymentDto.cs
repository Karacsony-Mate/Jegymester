namespace Jegymester.DataContext.Dtos;

public class PaymentDto
{
    public int Id { get; set; }
    public int TicketId { get; set; }
    public int Amount { get; set; }
    public DateTime PaymentDate { get; set; }
    public int PaymentMethod { get; set; }
}
