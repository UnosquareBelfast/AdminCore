using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Reflection.Emit;
using System.Text;
using AdminCore.Common.Interfaces;
using AdminCore.DAL;
using AdminCore.DAL.Database;
using AdminCore.DAL.Entity_Framework;
using AdminCore.DAL.Models;
using AdminCore.DTOs;
using AdminCore.DTOs.Team;
using AdminCore.Services.Mappings;
using AutoMapper;
using NSubstitute;
using NSubstitute.ReturnsExtensions;
using Xunit;

namespace AdminCore.Services.Tests
{
  public class ContractServiceTests
  {
    private readonly IContractService _contractService;
    private readonly IDatabaseContext _databaseContext;

    public ContractServiceTests()
    {
      _databaseContext = Substitute.For<IDatabaseContext>();
      var authenticatedUser = Substitute.For<IAuthenticatedUser>();
      IEnumerable<Type> profiles = new List<Type>()
      {
        new ContractMapperProfile().GetType(),
        new TeamMapperProfile().GetType()
      };
      IMapper mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfiles(profiles)));
      _contractService = new ContractService(_databaseContext, mapper, authenticatedUser);
    }

    [Fact]
    public void TestGetContractByIdReturnsNotNullContractDtoWhenDatabaseReturnsContract()
    {
      var contract = BuildContractModel();
      _databaseContext.ContractRepository.GetSingle(Arg.Any<Expression<Func<Contract, bool>>>(), Arg.Any<Expression<Func<Contract, object>>>(), Arg.Any<Expression<Func<Contract, object>>>()).Returns(contract);

      var result = _contractService.GetContractById(contract.ContractId);
      AssertContractAndContractDtoAreIdentical(contract, result);
    }

    [Fact]
    public void TestGetContractByIdReturnsNullContractDtoWhenDatabaseReturnsNull()
    {
      var result = _contractService.GetContractById(1);
      Assert.Null(result);
    }

    [Fact]
    public void TestGetContractByEmployeeIdReturnsNotNullContractDtoListWhenDatabaseReturnsContractList()
    {
      var contract = BuildContractModel();
      var contractList = new List<Contract>()
      {
        contract
      };

      _databaseContext.ContractRepository.Get(Arg.Any<Expression<Func<Contract, bool>>>(), Arg.Any<Func<IQueryable<Contract>, IOrderedQueryable<Contract>>>(), Arg.Any<Expression<Func<Contract, object>>>()).Returns(contractList);

      var result = _contractService.GetContractByEmployeeId(contract.EmployeeId);
      AssertContractAndContractDtoAreIdentical(contract, result.First());
    }

    [Fact]
    public void TestGetContractByEmployeeIdReturnsEmptyContractDtoListWhenDatabaseReturnsNothing()
    {
      var result = _contractService.GetContractByEmployeeId(1);
      Assert.Empty(result);
    }

    [Fact]
    public void TestGetContractByTeamIdReturnsNotNullContractDtoListWhenDatabaseReturnsContractList()
    {
      var contract = BuildContractModel();
      var contractList = new List<Contract>()
      {
        contract
      };

      _databaseContext.ContractRepository.Get(Arg.Any<Expression<Func<Contract, bool>>>(), Arg.Any<Func<IQueryable<Contract>, IOrderedQueryable<Contract>>>(), Arg.Any<Expression<Func<Contract, object>>>()).Returns(contractList);

      var result = _contractService.GetContractByTeamId(contract.TeamId);
      AssertContractAndContractDtoAreIdentical(contract, result.First());
    }

    [Fact]
    public void TestGetContractByTeamIdReturnsEmptyContractDtoListWhenDatabaseReturnsNothing()
    {
      var result = _contractService.GetContractByTeamId(1);
      Assert.Empty(result);
    }

    [Fact]
    public void TestGetContractByEmployeeIdAndTeamIdReturnsNotNullContractDtoListWhenDatabaseReturnsContractList()
    {
      var contract = BuildContractModel();
      var contractList = new List<Contract>()
      {
        contract
      };

      _databaseContext.ContractRepository.Get(Arg.Any<Expression<Func<Contract, bool>>>(), Arg.Any<Func<IQueryable<Contract>, IOrderedQueryable<Contract>>>(), Arg.Any<Expression<Func<Contract, object>>>()).Returns(contractList);

      var result = _contractService.GetContractByEmployeeIdAndTeamId(contract.EmployeeId, contract.TeamId);
      AssertContractAndContractDtoAreIdentical(contract, result.First());
    }

    [Fact]
    public void TestGetContractByEmployeeIdAndTeamIdReturnsEmptyContractDtoListWhenDatabaseReturnsNothing()
    {
      var result = _contractService.GetContractByEmployeeIdAndTeamId(2, 2);
      Assert.Empty(result);
    }

    [Fact]
    public void TestDeleteContractAttemptsDeleteIfExistingContractIsFound()
    {
      var contract = BuildContractModel();
      _databaseContext.ContractRepository.GetSingle(Arg.Any<Expression<Func<Contract, bool>>>(), Arg.Any<Expression<Func<Contract, object>>>(), Arg.Any<Expression<Func<Contract, object>>>()).Returns(contract);

      _contractService.DeleteContract(contract.ContractId);
      _databaseContext.ContractRepository.Received(1).Delete(contract);

    }

    [Fact]
    public void TestDeleteContractThrowsExceptionIfExistingContractIsNotFound()
    {
      _databaseContext.ContractRepository.GetSingle(Arg.Any<Expression<Func<Contract, bool>>>()).ReturnsNull();
      Assert.Throws<Exception>(() => _contractService.DeleteContract(1));
    }

    [Fact]
    public void TestSaveContractAttemptsInsertIfContractToBeSavedHasIdOfZero()
    {
      var newContractDto = BuildContractDto();
      newContractDto.ContractId = 0;
      _contractService.SaveContract(newContractDto);
      _databaseContext.ContractRepository.Received(1).Insert(Arg.Any<Contract>());
    }

    [Fact]
    public void TestSaveContractAttemptsUpdateIfContractToBeSavedHasIdOfNotZeroAndContractExists()
    {
      var newContractDto = BuildContractDto();
      _databaseContext.ContractRepository.GetSingle(Arg.Any<Expression<Func<Contract, bool>>>(), Arg.Any<Expression<Func<Contract, object>>>(), Arg.Any<Expression<Func<Contract, object>>>()).Returns(BuildContractModel());
      _contractService.SaveContract(newContractDto);
      _databaseContext.ContractRepository.Received(0).Insert(Arg.Any<Contract>());
      _databaseContext.Received(1).SaveChanges();
    }

    [Fact]
    public void TestSaveContractThrowsExceptionIfContractToBeSavedHasIdOfNotZeroAndContractDoesNotExist()
    {
      var newContractDto = BuildContractDto();
      Assert.Throws<Exception>(() => _contractService.SaveContract(newContractDto));      
    }

    private static Contract BuildContractModel()
    {
      return new Contract()
      {
        ContractId = 1,
        EmployeeId = 1,
        TeamId = 1,
        Team = new Team()
        {
          TeamId = 1
        },
        StartDate = new DateTime(2018, 12, 10),
        EndDate = new DateTime(2019, 1, 10)
      };
    }

    private static ContractDto BuildContractDto()
    {
      return new ContractDto()
      {
        ContractId = 1,
        EmployeeId = 1,
        Team = new TeamDto()
        {
          TeamId = 1
        },
        StartDate = new DateTime(2018, 12, 10),
        EndDate = new DateTime(2019, 1, 10)
      };
    }

    private static void AssertContractAndContractDtoAreIdentical(Contract contract, ContractDto contractDto)
    {
      Assert.Equal(contract.ContractId, contractDto.ContractId);
      Assert.Equal(contract.EmployeeId, contractDto.EmployeeId);
      Assert.Equal(contract.TeamId, contractDto.Team.TeamId);
      Assert.Equal(0, contract.StartDate.CompareTo(contractDto.StartDate));
      if (contract.EndDate.HasValue)
      {
        Assert.Equal(0, contract.EndDate.Value.CompareTo(contractDto.EndDate));
      }
    }
  }
}
