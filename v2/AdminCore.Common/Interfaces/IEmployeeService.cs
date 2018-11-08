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
    string CreateNewEmployee(EmployeeDto registerEmployeeDto);

    bool DoesEmailAlreadyExist(string email);

    IList<EmployeeDto> GetAll();

    void UpdateEmployee(EmployeeDto employeeDto);

    void DeleteEmployee(int employeeId);

    IList<EmployeeDto> GetEmployeeById(int employeeId);

    IList<EmployeeDto> GetEmployeeByForenameAndSurname(string forename, string surname);

    IList<EmployeeDto> GetEmployeeByCountry(int countryId);
  }
}