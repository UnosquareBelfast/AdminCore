﻿// --------------------------------------------------------------------------------------------------------------------
// <copyright file="WebMappingProfile.cs" company="Admincore">
//   Admincore
// </copyright>
// <summary>
//   The web mapping profile.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Admincore.WebApi.Mappings
{
  using Admincore.DTOs;
  using Admincore.WebApi.Models;

  using AdminCore.DTOs;
  using AdminCore.WebApi.Models;

  using AutoMapper;

  /// <summary>
  /// The web mapping profile.
  /// </summary>
  public class WebMappingProfile : Profile
    {
      /// <summary>
      /// Initializes a new instance of the <see cref="WebMappingProfile"/> class.
      /// </summary>
      public WebMappingProfile()
      {
        CreateMap<EmployeeDto, LoginRequestModel>();
        CreateMap<JwtAuthDto, JwtAuthViewModel>();
    }
  }
}