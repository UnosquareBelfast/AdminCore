// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EmployeeService.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   The hello service.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using AdminCore.Common.Interfaces;
using AdminCore.DAL;
using AdminCore.DAL.Models;
using AdminCore.DTOs.Employee;
using AdminCore.Services.Base;
using AutoMapper;

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
      throw new NotImplementedException();
    }

    public void Update(EmployeeDto employeeDto)
    {
      throw new NotImplementedException();
    }

    public void Delete(int employeeId)
    {
      throw new NotImplementedException();
    }

    public EmployeeDto Get(int employeeId)
    {
      throw new NotImplementedException();
    }

    public IList<EmployeeDto> GetByForenameAndSurname(string forename, string surname)
    {
      throw new NotImplementedException();
    }

    public IList<EmployeeDto> GetByCountryId(int countryId)
    {
      throw new NotImplementedException();
    }

    private static short CalculateTotalHolidaysFromStartDate(Employee employee, int maxHolidays)
    {
      short totalHolidays;
      if (employee.StartDate.Year == DateTime.Now.Year)
        totalHolidays = (short) (maxHolidays / 12 * (12 - employee.StartDate.Month));
      else
        totalHolidays = (short) maxHolidays;

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