using AdminCore.Common.Interfaces;
using AdminCore.WebApi.Controllers;
using AutoMapper;
using NSubstitute;
using Xunit;

namespace AdminCore.WebApi.Tests
{
  public class DashboardControllerTest
  {
    private readonly DashboardController _dashboardController;
    private readonly IDashboardService _dashboardService;
    private readonly IMapper _mapper;

    public DashboardControllerTest()
    {
      _mapper = Substitute.For<IMapper>();
      _dashboardService = Substitute.For<IDashboardService>();
      _dashboardController = new DashboardController(_dashboardService, _mapper);
    }

    [Fact]
    public void GetMessagesByEventId_WhenValidIdPassed_ReturnsMessages()
    {
    }

    [Fact]
    public void GetTeamEventsByEmployeeId_WhenValidIdPassed_ReturnsTeamEvents()
    {
    }
  }
}