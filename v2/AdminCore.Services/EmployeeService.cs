// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EmployeeService.cs" company="Admincore">
//   Admincore
// </copyright>
// <summary>
//   The hello service.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Admincore.Services
{
  using System;
  using System.Linq;
  using System.Security.Cryptography;
  using System.Text;

  using AdminCore.Common.Interfaces;

  using AdminCore.DAL;
  using AdminCore.DAL.Models;
  using AdminCore.DTOs.Employee;

  using AutoMapper;

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
    /// The create new employee.
    /// </summary>
    /// <param name="newEmployeeDto">
    /// The new employee dto.
    /// </param>
    /// <returns>
    /// The <see cref="string"/>.
    /// </returns>
    public string CreateNewEmployee(EmployeeDto newEmployeeDto)
    {
      Employee employee = _mapper.Map<Employee>(newEmployeeDto);

      employee.Password = EncodePasswordToBase64(employee.Password);

      employee.TotalHolidays = CalculateTotalHolidaysFromStartDate(employee, 33);

      _databaseContext.EmployeeRepository.Insert(employee);
      _databaseContext.SaveChanges();

      return employee.Email;
    }

    /// <summary>
    /// The does email already exist.
    /// </summary>
    /// <param name="email">
    /// The email.
    /// </param>
    /// <returns>
    /// The <see cref="bool"/>.
    /// </returns>
    public bool DoesEmailAlreadyExist(string email)
    {
      return _databaseContext.EmployeeRepository
        .Get(x => x.Email.Equals(email, StringComparison.InvariantCultureIgnoreCase)).Any();
    }

    /// <summary>
    /// The calculate total holidays from start date.
    /// </summary>
    /// <param name="employee">
    /// The employee.
    /// </param>
    /// <param name="maxHolidays">
    /// The max holidays.
    /// </param>
    /// <returns>
    /// The <see cref="short"/>.
    /// </returns>
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

    /// <summary>
    /// The encode password to base 64.
    /// </summary>
    /// <param name="password">
    /// The password.
    /// </param>
    /// <returns>
    /// The <see cref="string"/>.
    /// </returns>
    private string EncodePasswordToBase64(string password)
    {
      byte[] bytes = Encoding.Unicode.GetBytes(password);
      byte[] inArray = HashAlgorithm.Create("SHA1")?.ComputeHash(bytes);
      return Convert.ToBase64String(inArray);
    }
  }
}