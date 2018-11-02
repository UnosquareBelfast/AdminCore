// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EmployeeService.cs" company="Admincore">
//   Admincore
// </copyright>
// <summary>
//   The hello service.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Admincore.Services
{
  using Admincore.Common.Interfaces;
  using Admincore.DAL;
  using Admincore.DAL.Models;
  using Admincore.DTOs;
  using AutoMapper;
  using System;

  /// <summary>
  /// The hello service.
  /// </summary>
  public class EmployeeService : IEmployeeService
  {
    /// <summary>
    /// The _database context.
    /// </summary>
    private readonly IDatabaseContext _databaseContext;

    /// <summary>
    /// The _mapper.
    /// </summary>
    private readonly IMapper _mapper;

    /// <summary>
    /// Initializes a new instance of the <see cref="EmployeeService"/> class.
    /// </summary>
    /// <param name="databaseContext">
    /// The database context.
    /// </param>
    /// <param name="mapper">
    /// The mapper.
    /// </param>
    public EmployeeService(IDatabaseContext databaseContext, IMapper mapper)
    {
      _databaseContext = databaseContext;
      _mapper = mapper;
    }

    /// <summary>
    /// The registering of the email address for log in.
    /// </summary>
    /// <param name="email">
    ///   The email.
    /// </param>
    /// <returns>
    /// The <see cref="string"/>.
    /// </returns>
    /// <exception cref="NotImplementedException">
    /// </exception>
    public Type findByEmail(string email)
    {
      Employee employee = _databaseContext.EmployeeRepository.Get(x => x.Email.Equals(email)).FirstOrDefault();

      return employee != null ? _mapper.Map(employee, typeof(EmployeeDto)) : null;
    }

    /// <summary>
    /// The registering of the email address for log in.
    /// </summary>
    /// <param name="email">
    /// The email.
    /// </param>
    /// <returns>
    /// The <see cref="string"/>.
    /// </returns>
    /// <exception cref="NotImplementedException">
    /// </exception>
    public EmployeeDto createNewEmployee(EmployeeDto newEmployeeDto)
    {
      var employee = _mapper.Map<Employee>(newEmployeeDto);

      employee.Password = encodePasswordToBase64(employee.Password);

      employee.TotalHolidays = calculateTotalHolidaysFromStartDate(employee, 33);

      _databaseContext.EmployeeRepository.Insert(employee);
      _databaseContext.SaveChanges();

      return _mapper.Map<EmployeeDto>(employee);
    }

    public string encodePasswordToBase64(string password)
    {
      byte[] bytes = Encoding.Unicode.GetBytes(password);
      byte[] inArray = HashAlgorithm.Create("SHA1").ComputeHash(bytes);
      return Convert.ToBase64String(inArray);
    }

    private short calculateTotalHolidaysFromStartDate(Employee employee, int maxHolidays)
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
  }
}