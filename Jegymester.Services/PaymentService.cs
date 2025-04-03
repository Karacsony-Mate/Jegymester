using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Jegymester.DataContext;
using Jegymester.DataContext.Context;
using Jegymester.DataContext.Entities;
using Jegymester.DataContext.Dtos;
using Microsoft.EntityFrameworkCore;

namespace Jegymester.Services
{
    public interface IPaymentService
    {
        Task<List<PaymentDto>> GetAllPaymentsAsync();
        Task<PaymentDto?> GetPaymentByIdAsync(int id);
        Task<PaymentDto> CreatePaymentAsync(PaymentDto paymentDto);
        Task<bool> DeletePaymentAsync(int id);
    }
    
    public class PaymentService : IPaymentService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public PaymentService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<PaymentDto>> GetAllPaymentsAsync()
        {
            var payments = await _context.Payments.ToListAsync();
            return _mapper.Map<List<PaymentDto>>(payments);
        }

        public async Task<PaymentDto?> GetPaymentByIdAsync(int id)
        {
            var payment = await _context.Payments.FindAsync(id);
            return payment == null ? null : _mapper.Map<PaymentDto>(payment);
        }

        public async Task<PaymentDto> CreatePaymentAsync(PaymentDto paymentDto)
        {
            var payment = new Payment
            {
                TicketId = paymentDto.TicketId,
                Amount = paymentDto.Amount,
                PaymentDate = paymentDto.PaymentDate,
                PaymentMethod = paymentDto.PaymentMethod
            };

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            return new PaymentDto
            {
                TicketId = payment.TicketId,
                Amount = payment.Amount,
                PaymentDate = payment.PaymentDate,
                PaymentMethod = payment.PaymentMethod
            };
        }

        public async Task<bool> DeletePaymentAsync(int id)
        {
            var payment = await _context.Payments.FindAsync(id);
            if (payment == null) return false;

            _context.Payments.Remove(payment);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}