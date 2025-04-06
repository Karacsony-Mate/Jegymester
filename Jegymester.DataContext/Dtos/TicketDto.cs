using System.ComponentModel.DataAnnotations;

namespace Jegymester.DataContext.Dtos;

public class TicketDto
{
    public int Id { get; set; }
    public int ScreeningId { get; set; }
    public int? UserId { get; set; }
    public int Price { get; set; }
    public DateTime PurchaseDate { get; set; }
    public bool IsConfirmed { get; set; }
}

public class TicketPurchaseDto
{
    [Required]
    public int ScreeningId { get; set; }

    public int? UserId { get; set; }

    [Required]
    public int Price { get; set; }
}

public class TicketPurchaseOfflineDto
{
    [Required]
    public int ScreeningId { get; set; }

    [Required]
    public int Price { get; set; }
}
