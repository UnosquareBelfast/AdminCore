using AdminCore.DAL.Models;
using AdminCore.DTOs;
using AutoMapper;

namespace AdminCore.Services.Mappings
{
  public class ContractMapperProfile : Profile
  {
    public ContractMapperProfile()
    {
      CreateMap<ContractDto, Contract>();
      CreateMap<ContractDto, Contract>().ReverseMap();
    }
  }
}