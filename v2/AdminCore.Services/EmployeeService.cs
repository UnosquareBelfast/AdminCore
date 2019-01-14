// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EmployeeService.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   The hello service.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using AdminCore.Common.Interfaces;
using AdminCore.DAL;
using AdminCore.DAL.Models;
using AdminCore.DTOs.Employee;
using AdminCore.Services.Base;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace AdminCore.Services
{
  public class EmployeeService : BaseService, IEmployeeService
  {
    private readonly IMapper _mapper;

    public EmployeeService(IDatabaseContext databaseContext, IMapper mapper) :
      base(databaseContext)
    {
      _mapper = mapper;
    }

    public string Create(EmployeeDto newEmployeeDto)
    {
      var employee = _mapper.Map<Employee>(newEmployeeDto);
      employee.Password = EncodePasswordToBase64(employee.Password);
      employee.TotalHolidays = CalculateTotalHolidaysFromStartDate(employee, 33);

      DatabaseContext.EmployeeRepository.Insert(employee);
      DatabaseContext.SaveChanges();

      return employee.Email;
    }

    public bool VerifyEmailExists(string email)
    {
      return DatabaseContext.EmployeeRepository
        .Get(x => x.Email.Equals(email, StringComparison.InvariantCultureIgnoreCase)).Any();
    }

    public IList<EmployeeDto> GetAll()
    {
      var employees = DatabaseContext.EmployeeRepository.Get();
      return _mapper.Map<IList<EmployeeDto>>(employees);
    }

    public void Delete(int employeeId)
    {
      var employeeDbEntry = GetEmployeeById(employeeId);
      if (employeeDbEntry == null)
      {
        throw new Exception($"Employee could not be delete. Employee ID {employeeId} not found.");
      }
      DatabaseContext.EmployeeRepository.Delete(employeeDbEntry);
      DatabaseContext.SaveChanges();
    }

    public EmployeeDto Get(int employeeId)
    {
      var employeeDbEntry = GetEmployeeById(employeeId);
      return _mapper.Map<EmployeeDto>(employeeDbEntry);
    }

    public IList<EmployeeDto> GetByForenameAndSurname(string forename, string surname)
    {
      var employee = DatabaseContext.EmployeeRepository.Get(x =>
        x.Forename.Equals(forename, StringComparison.CurrentCultureIgnoreCase) &&
        x.Surname.Equals(surname, StringComparison.CurrentCultureIgnoreCase));
      return _mapper.Map<IList<EmployeeDto>>(employee);
    }

    public IList<EmployeeDto> GetByCountryId(int countryId)
    {
      var employee = DatabaseContext.EmployeeRepository.Get(x => x.CountryId == countryId);
      return _mapper.Map<IList<EmployeeDto>>(employee);
    }

    public void Save(EmployeeDto employeeDto)
    {
      if (employeeDto.EmployeeId == 0)
      {
        var newEmployeeEntry = _mapper.Map<Employee>(employeeDto);
        DatabaseContext.EmployeeRepository.Insert(newEmployeeEntry);
      }
      else
      {
        var employee = GetEmployeeById(employeeDto.EmployeeId);
        _mapper.Map(employeeDto, employee);
      }

      DatabaseContext.SaveChanges();
    }

    private Employee GetEmployeeById(int id)
    {
      var employee = DatabaseContext.EmployeeRepository.Get(x => x.EmployeeId == id);
      return employee.Any() ? employee.First() : null;
    }

    private static short CalculateTotalHolidaysFromStartDate(Employee employee, int maxHolidays)
    {
      short totalHolidays;
      if (employee.StartDate.Year == DateTime.Now.Year)
        totalHolidays = (short)(maxHolidays / 12 * (12 - employee.StartDate.Month));
      else
        totalHolidays = (short)maxHolidays;

      return totalHolidays;
    }

    private static string EncodePasswordToBase64(string password)
    {
      var bytes = Encoding.Unicode.GetBytes(password);
      var inArray = HashAlgorithm.Create("SHA1")?.ComputeHash(bytes);
      return Convert.ToBase64String(inArray);
    }
  }
}