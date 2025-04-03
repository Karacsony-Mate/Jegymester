namespace Jegymester.DataContext.Dtos;

public class TicketDto
{
    public int? Id { get; set; }
    public int ScreeningId { get; set; }
    public int UserId { get; set; }
    public int Price { get; set; }
    public DateTime PurchaseDate { get; set; }
    public bool IsCancelled { get; set; }
}

public class TicketPurchaseDto
{
    public int ScreeningId { get; set; }
    public int UserId { get; set; }
    public decimal Price { get; set; }
}
