using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Jegymester.DataContext.Dtos;
using Jegymester.Services;

[ApiController]
[Route("api/payments")]
public class PaymentsController : ControllerBase
{
    private readonly IPaymentService _paymentService;

    public PaymentsController(IPaymentService paymentService)
    {
        _paymentService = paymentService;
    }

    [HttpGet]
    public async Task<ActionResult<List<PaymentDto>>> GetAllPayments()
    {
        return Ok(await _paymentService.GetAllPaymentsAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PaymentDto>> GetPaymentById(int id)
    {
        var payment = await _paymentService.GetPaymentByIdAsync(id);
        if (payment == null) return NotFound();
        return Ok(payment);
    }

    [HttpPost]
    public async Task<ActionResult<PaymentDto>> CreatePayment(PaymentDto paymentDto)
    {
        var createdPayment = await _paymentService.CreatePaymentAsync(paymentDto);
        return CreatedAtAction(nameof(GetPaymentById), new { id = createdPayment.Id }, createdPayment);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePayment(int id)
    {
        var success = await _paymentService.DeletePaymentAsync(id);
        if (!success) return NotFound();
        return NoContent();
    }
}