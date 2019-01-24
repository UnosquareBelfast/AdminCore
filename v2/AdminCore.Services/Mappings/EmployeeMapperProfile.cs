using AdminCore.DAL.Models;
using AdminCore.DTOs.Country;
using AdminCore.DTOs.Employee;
using AutoMapper;

namespace AdminCore.Services.Mappings
{
  public class EmployeeMapperProfile : Profile
  {
    public EmployeeMapperProfile()
    {
      CreateMap<CountryDto, Country>().ReverseMap();
      CreateMap<Employee, EmployeeDto>();
      CreateMap<EmployeeDto, Employee>();
      CreateMap<EmployeeRoleDto, EmployeeRole>().ReverseMap();
      CreateMap<EmployeeStatusDto, EmployeeStatus>().ReverseMap();
    }
  }
}