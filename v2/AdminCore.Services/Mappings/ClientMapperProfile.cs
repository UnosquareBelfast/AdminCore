using AdminCore.DAL.Models;
using AdminCore.DTOs.Client;
using AutoMapper;

namespace AdminCore.Services.Mappings
{
    public class ClientMapperProfile : Profile
    {
        public ClientMapperProfile()
        {
            CreateMap<ClientDto, Client>().ReverseMap();
            // TODO: Additional mappings required
        }
    }
}
