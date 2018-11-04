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
  using Admincore.Common.Interfaces;
  using Admincore.DAL;

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
  }
}