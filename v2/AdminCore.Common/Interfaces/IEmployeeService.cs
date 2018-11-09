// --------------------------------------------------------------------------------------------------------------------
// <copyright file="IEmployeeService.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the IAuthenticationService type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System.Collections.Generic;

namespace AdminCore.Common.Interfaces
{
  using AdminCore.DTOs.Employee;

  /// <summary>
  /// The HelloService interface.
  /// </summary>
  public interface IEmployeeService
  {
    string Create(EmployeeDto registerEmployeeDto);

    bool VerifyEmailExists(string email);

    IList<EmployeeDto> GetAll();

    void Update(EmployeeDto employeeDto);

    void Delete(int employeeId);

    IList<EmployeeDto> Get(int employeeId);

    IList<EmployeeDto> GetByForenameAndSurname(string forename, string surname);

    IList<EmployeeDto> GetByCountryId(int countryId);
  }
}