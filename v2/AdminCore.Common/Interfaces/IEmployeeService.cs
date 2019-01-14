// --------------------------------------------------------------------------------------------------------------------
// <copyright file="IEmployeeService.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the IAuthenticationService type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using AdminCore.DTOs.Employee;
using System.Collections.Generic;

namespace AdminCore.Common.Interfaces
{
  /// <summary>
  ///   The HelloService interface.
  /// </summary>
  public interface IEmployeeService
  {
    string Create(EmployeeDto registerEmployeeDto);

    bool VerifyEmailExists(string email);

    IList<EmployeeDto> GetAll();

    void Delete(int employeeId);

    void Save(EmployeeDto employee);

    EmployeeDto Get(int employeeId);

    IList<EmployeeDto> GetByForenameAndSurname(string forename, string surname);

    IList<EmployeeDto> GetByCountryId(int countryId);
  }
}