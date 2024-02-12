using AutoMapper;
using disneylandvotingapp.Api.Enums;
using disneylandvotingapp.Api.Model;

namespace disneylandvotingapp.Api.Helper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ApplicationUser, ApplicationDTO>()
                .ForMember(dest => dest.id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.ToString()))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title.ToString()))
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.Password)) // You may want to handle password mapping securely
                .ForMember(dest => dest.ConfirmPassword, opt => opt.Ignore()); // Ignore ConfirmPassword during mapping

            CreateMap<ApplicationDTO, ApplicationUser>()
                 .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.id))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => Enum.Parse<Roles>(src.Role)))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => Enum.Parse<Title>(src.Title)))
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.Password)) // You may want to handle password mapping securely
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore()) // Ignore PasswordHash during mapping
                .ForMember(dest => dest.PasswordSalt, opt => opt.Ignore()); // Ignore PasswordSalt during mapping
        }
    }
}
