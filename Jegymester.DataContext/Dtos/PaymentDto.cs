namespace Jegymester.DataContext.Dtos;

public class PaymentDto
{
    public int TicketId { get; set; }
    public decimal Amount { get; set; }
    public string PaymentMethod { get; set; }
}
