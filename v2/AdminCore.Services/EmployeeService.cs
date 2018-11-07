// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EmployeeService.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   The hello service.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System.Collections.Generic;

namespace AdminCore.Services
{
  using AdminCore.Common.Interfaces;
  using AdminCore.DAL;
  using AdminCore.DAL.Models;
  using AdminCore.DTOs.Employee;
  using AutoMapper;
  using System;
  using System.Linq;
  using System.Security.Cryptography;
  using System.Text;

  public class EmployeeService : IEmployeeService
  {
    private readonly IDatabaseContext _databaseContext;

    private readonly IMapper _mapper;

    public EmployeeService(IDatabaseContext databaseContext, IMapper mapper)
    {
      _databaseContext = databaseContext;
      _mapper = mapper;
    }

    public string CreateNewEmployee(EmployeeDto newEmployeeDto)
    {
      Employee employee = _mapper.Map<Employee>(newEmployeeDto);

      employee.Password = EncodePasswordToBase64(employee.Password);

      employee.TotalHolidays = CalculateTotalHolidaysFromStartDate(employee, 33);

      _databaseContext.EmployeeRepository.Insert(employee);
      _databaseContext.SaveChanges();

      return employee.Email;
    }

    public bool DoesEmailAlreadyExist(string email)
    {
      return _databaseContext.EmployeeRepository
        .Get(x => x.Email.Equals(email, StringComparison.InvariantCultureIgnoreCase)).Any();
    }

    public IList<EmployeeDto> GetAll()
    {
      throw new NotImplementedException();
    }

    public void UpdateEmployee(EmployeeDto employeeDto)
    {
      throw new NotImplementedException();
    }

    public void DeleteEmployee(int employeeId)
    {
      throw new NotImplementedException();
    }

    public IList<EmployeeDto> GetEmployeeById(int employeeId)
    {
      throw new NotImplementedException();
    }

    public IList<EmployeeDto> GetEmployeeByForenameAndSurname(string forename, string surname)
    {
      throw new NotImplementedException();
    }

    public IList<EmployeeDto> GetEmployeeByCountry(int countryId)
    {
      throw new NotImplementedException();
    }

    private short CalculateTotalHolidaysFromStartDate(Employee employee, int maxHolidays)
    {
      short totalHolidays;
      if (employee.StartDate.Year == DateTime.Now.Year)
      {
        totalHolidays = (short)((maxHolidays / 12) * (12 - employee.StartDate.Month));
      }
      else
      {
        totalHolidays = (short)maxHolidays;
      }

      return totalHolidays;
    }

    private string EncodePasswordToBase64(string password)
    {
      byte[] bytes = Encoding.Unicode.GetBytes(password);
      byte[] inArray = HashAlgorithm.Create("SHA1")?.ComputeHash(bytes);
      return Convert.ToBase64String(inArray);
    }
  }
}