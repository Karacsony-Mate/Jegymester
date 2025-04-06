using AutoMapper;
using Jegymester.DataContext.Dtos;
using Jegymester.DataContext.Entities;

namespace Jegymester.Services
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // User Mappings
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<UserRegisterDto, User>();
            CreateMap<UserLoginDto, User>();
            CreateMap<UserUpdateDto, User>();

            // Movie Mappings
            CreateMap<Movie, MovieDto>().ReverseMap();
            CreateMap<MovieCreateDto, Movie>();
            CreateMap<MovieUpdateDto, Movie>();
            
            // Screening Mappings
            CreateMap<Screening, ScreeningDto>().ReverseMap();
            CreateMap<ScreeningCreateDto, Screening>();
            CreateMap<ScreeningUpdateDto, Screening>();
            
            // Ticket Mappings
            CreateMap<Ticket, TicketDto>().ReverseMap();
            CreateMap<TicketPurchaseDto, Ticket>();
            CreateMap<TicketPurchaseOfflineDto, Ticket>();

            // Roles Mappings
            CreateMap<Role, RoleDto>().ReverseMap();
        }
    }
}
