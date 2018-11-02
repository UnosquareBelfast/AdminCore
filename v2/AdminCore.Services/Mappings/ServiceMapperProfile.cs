// --------------------------------------------------------------------------------------------------------------------
// <copyright file="ServiceMapperProfile.cs" company="Admincore">
//   Admincore
// </copyright>
// <summary>
//   Defines the ServiceMapperProfile type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Admincore.Services.Mappings
{
  using Admincore.DAL.Models;
  using Admincore.DTOs;

  using AutoMapper;

  /// <summary>
  /// The service mapper profile.
  /// </summary>
  public class ServiceMapperProfile : Profile
  {
    /// <summary>
    /// Initializes a new instance of the <see cref="ServiceMapperProfile"/> class.
    /// </summary>
    public ServiceMapperProfile()
    {
      CreateMap<Employee, EmployeeDto>()
        .ForMember(dest => dest.CountryId, opt => opt.MapFrom(src => src.Country.CountryId))
        .ForMember(dest => dest.CountryDescription, opt => opt.MapFrom(src => src.Country.Description))
        .ForMember(dest => dest.EmployeeRoleId, opt => opt.MapFrom(src => src.EmployeeRole.EmployeeRoleId))
        .ForMember(dest => dest.EmployeeRoleDescription, opt => opt.MapFrom(src => src.EmployeeRole.Description))
        .ForMember(dest => dest.EmployeeStatusId, opt => opt.MapFrom(src => src.EmployeeStatus.EmployeeStatusId))
        .ForMember(dest => dest.StatusDescription, opt => opt.MapFrom(src => src.EmployeeStatus.Description));

      CreateMap<EmployeeDto, Employee>();
    }
  }
}