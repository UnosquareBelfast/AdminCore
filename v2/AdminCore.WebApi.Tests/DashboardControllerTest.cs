using AdminCore.Common.Interfaces;
using AdminCore.WebApi.Controllers;
using AutoFixture;
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
    private readonly Fixture _fixture;

    public DashboardControllerTest()
    {
      _dashboardService = Substitute.For<IDashboardService>();
      _fixture = new Fixture();
      _mapper = Substitute.For<IMapper>();
      _dashboardController = new DashboardController(_dashboardService, _mapper);
    }

    [Fact]
    public void GetTeamEventsByEmployeeId_WhenValidIdPassed_ReturnsEvents()
    {

    }

    [Fact]
    public void GetDashboardEventsByEmployeeId_WhenValidIdPassed_ReturnsDashboardEvents()
    {
      // Arrange

      // Act

      // Assert
    }

    [Fact]
    public void GetMessagesByEventId_WhenValidIdPassed_ReturnsMessages()
    {
      // Arrange

      // Act

      // Assert
    }

    [Fact]
    public void GetTeamEventsByEmployeeId_WhenValidIdPassed_ReturnsTeamEvents()
    {
      // Arrange

      // Act

      // Assert
    }
  }
}