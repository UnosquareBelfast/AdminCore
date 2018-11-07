﻿// --------------------------------------------------------------------------------------------------------------------
// <copyright file="ServiceMapperProfile.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the ServiceMapperProfile type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using AdminCore.DAL.Models;
using AdminCore.DTOs;
using AdminCore.DTOs.Client;
using AdminCore.DTOs.Employee;
using AdminCore.DTOs.Team;
using AutoMapper;
using System;

namespace AdminCore.Services.Mappings
{
    /// <summary>
    /// The service mapper profile.
    /// </summary>
    [Obsolete("Not used anymore - Being replaced by individual mapping classes", true)]
    public class ServiceMapperProfile : Profile
    {

        /// <summary>
        /// Initializes a new instance of the <see cref="ServiceMapperProfile"/> class.
        /// </summary>
        public ServiceMapperProfile()
        {
            CreateMap<Employee, EmployeeDto>().ReverseMap();

            CreateMap<CountryDto, Country>().ReverseMap();
            CreateMap<EmployeeStatusDto, EmployeeStatus>().ReverseMap();
            CreateMap<EmployeeRoleDto, EmployeeRole>().ReverseMap();

            // TODO: Move into separate profile.
            CreateMap<ClientDto, Client>().ReverseMap();
            CreateMap<TeamDto, Team>().ReverseMap();
        }
    }
}