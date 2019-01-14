using System;
using System.Linq;
using AdminCore.Constants.Enums;
using Xunit;

namespace AdminCore.Services.Tests
{
  public class DashboardServiceLogicTests
  {

    private readonly MockDatabase _mockDatabase;

    public DashboardServiceLogicTests()
    {
      _mockDatabase = new MockDatabase();
    }

    [Fact]
    public void TestEmployeeDashboardEventsLogic_Check1ResultComesBackForEmployeeId1ForDecember()
    {
      // Employee 1 has 2 December 2018 events. One approved and one cancelled. This query should only return the one that is approved.
      var resultList = _mockDatabase.EventRepository.Where(evnt => DashboardService.EmployeeDashboardEventsQuery(1, new DateTime(2018, 12, 5), evnt)).ToList();
      Assert.Single(resultList);
      Assert.Equal((int)EventStatuses.Approved, resultList.First().EventStatusId);
    }

    [Fact]
    public void TestEmployeeDashboardEventsLogic_Check2ResultsComesBackForEmployeeId1ForFebruary()
    {
      // Employee ID 1 has 2 events for February 2019
      var resultList = _mockDatabase.EventRepository.Where(evnt => DashboardService.EmployeeDashboardEventsQuery(1, new DateTime(2019, 02, 5), evnt)).ToList();
      Assert.Equal(2, resultList.Count);
    }

    [Fact]
    public void TestEmployeeDashboardEventsLogic_Check0ResultsComesBackForEmployeeId2ForMarch()
    {
      // Employee ID 2 has 1 event for March 2019 but no active contract during this time.
      // Query should return nothing.
      var resultList = _mockDatabase.EventRepository.Where(evnt => DashboardService.EmployeeDashboardEventsQuery(2, new DateTime(2019, 03, 5), evnt)).ToList();
      Assert.Empty(resultList);
    }

    [Fact]
    public void TestEmployeeDashboardEventsLogic_Check1ResultsComesBackForEmployeeId3ForApril()
    {
      // Employee ID 4 has 1 event in April 2019 and an open-ended (end date = null) contract starting December 2018.
      // The 1 event should be returned
      var resultList = _mockDatabase.EventRepository.Where(evnt => DashboardService.EmployeeDashboardEventsQuery(4, new DateTime(2019, 04, 5), evnt)).ToList();
      Assert.Single(resultList);
    }

    [Fact]
    public void TestGetEmployeeSnapshotByEmployeeIdLogic_Check1ResultComesBackForEmployeeId1ForDecember()
    {
      // Employee ID 1 has one contract active during december and holidays booked during this month.
      // So one contract should come back
      var resultList = _mockDatabase.ContractRepository.Where(contract => DashboardService.GetEmployeeSnapshotByEmployeeIdQuery(1, contract, new DateTime(2018, 12, 22))).ToList();
      Assert.Single(resultList);
    }
    
    [Fact]
    public void TestGetEmployeeSnapshotByEmployeeIdLogic_Check2ResultsComeBackForEmployeeId3ForDecember()
    {
      // Employee ID 3 has two contracts active during December and holidays booked during this month.
      // So two contracts should come back
      var resultList = _mockDatabase.ContractRepository.Where(contract => DashboardService.GetEmployeeSnapshotByEmployeeIdQuery(3, contract, new DateTime(2018, 12, 22))).ToList();
      Assert.Equal(2, resultList.Count);
    }


  }
}
