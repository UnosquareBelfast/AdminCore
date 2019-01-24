using AdminCore.Common.Interfaces;
using AdminCore.DAL;
using AdminCore.DAL.Models;
using AdminCore.DTOs.Contract;
using AdminCore.Services.Base;
using AutoMapper;
using System;
using System.Collections.Generic;

namespace AdminCore.Services
{
  public class ContractService : BaseService, IContractService
  {
    private readonly IMapper _mapper;

    public ContractService(IDatabaseContext databaseContext, IMapper mapper) : base(databaseContext)
    {
      _mapper = mapper;
    }

    public ContractDto GetContractById(int contractId)
    {
      var contract = GetById(contractId);
      return AddClientNameToContract(contract);
    }

    public IList<ContractDto> GetContractByEmployeeId(int employeeId)
    {
      var contract = DatabaseContext.ContractRepository.Get(x => x.EmployeeId == employeeId, null,
                                              x => x.Team, x => x.Team.Client);
      return ReturnContractDto(contract);
    }

    public IList<ContractDto> GetContractByTeamId(int teamId)
    {
      var contract = DatabaseContext.ContractRepository.Get(x => x.TeamId == teamId, null,
                                              x => x.Team, x => x.Team.Client);
      return ReturnContractDto(contract);
    }

    public IList<ContractDto> GetContractByEmployeeIdAndTeamId(int employeeId, int teamId)
    {
      var contract = DatabaseContext.ContractRepository.Get(x => x.TeamId == teamId && x.EmployeeId == employeeId, null,
                                              x => x.Team, x => x.Team.Client);
      return ReturnContractDto(contract);
    }

    public void SaveContract(ContractDto contractToBeSaved)
    {
      if (contractToBeSaved.ContractId == 0)
      {
        InsertNewContractIntoTheDb(contractToBeSaved);
      }
      else
      {
        UpdateExistingContract(contractToBeSaved);
      }
      DatabaseContext.SaveChanges();
    }

    public void DeleteContract(int contractId)
    {
      var contractToDelete = GetById(contractId);
      if (contractToDelete == null)
      {
        throw new Exception($"Tried to delete contract with ID {contractId} but a contract with this ID could not be found.");
      }
      DatabaseContext.ContractRepository.Delete(contractToDelete);
      DatabaseContext.SaveChanges();
    }

    private Contract GetById(int id)
    {
      return DatabaseContext.ContractRepository.GetSingle(x => x.ContractId == id,
                                                   x => x.Team,
                                                                x => x.Team.Client);
    }

    private void UpdateExistingContract(ContractDto contractToBeSaved)
    {
      var existingEntry = GetById(contractToBeSaved.ContractId);
      if (existingEntry == null)
      {
        throw new Exception($"Tried to update contract with ID {contractToBeSaved.ContractId} but a contract with this ID could not be found.");
      }
      _mapper.Map(contractToBeSaved, existingEntry);
    }

    private void InsertNewContractIntoTheDb(ContractDto contractToBeSaved)
    {
      var newDbEntry = _mapper.Map<Contract>(contractToBeSaved);
      DatabaseContext.ContractRepository.Insert(newDbEntry);
    }

    private IList<ContractDto> ReturnContractDto(IList<Contract> contract)
    {
      var contractDto = _mapper.Map<IList<ContractDto>>(contract);
      AddClientNameToContract(contract, contractDto);

      return contractDto;
    }

    private static void AddClientNameToContract(IList<Contract> contract, IList<ContractDto> contractDto)
    {
      for (var i = 0; i < contract.Count; i++)
      {
        contractDto[i].ClientName = contract[i].Team.Client.ClientName;
      }
    }

    private ContractDto AddClientNameToContract(Contract contract)
    {
      var contractDto = _mapper.Map<ContractDto>(contract);
      contractDto.ClientName = contract.Team.Client.ClientName;
      return contractDto;
    }
  }
}