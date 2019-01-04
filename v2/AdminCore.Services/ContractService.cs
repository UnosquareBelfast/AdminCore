using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AdminCore.Common.Interfaces;
using AdminCore.DAL;
using AdminCore.DAL.Models;
using AdminCore.DTOs;
using AdminCore.Services.Base;
using AutoMapper;

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
      return _mapper.Map<ContractDto>(contract);
    }

    public IList<ContractDto> GetContractByEmployeeId(int employeeId)
    {
      var contract = DatabaseContext.ContractRepository.Get(x => x.EmployeeId == employeeId, null, x => x.Team);
      return _mapper.Map<IList<ContractDto>>(contract);
    }

    public IList<ContractDto> GetContractByTeamId(int teamId)
    {
      var contract = DatabaseContext.ContractRepository.Get(x => x.TeamId == teamId, null, x => x.Team);
      return _mapper.Map<IList<ContractDto>>(contract);
    }

    public IList<ContractDto> GetContractByEmployeeIdAndTeamId(int employeeId, int teamId)
    {
      var contract = DatabaseContext.ContractRepository.Get(x => x.TeamId == teamId && x.EmployeeId == employeeId, null, x => x.Team);
      return _mapper.Map<IList<ContractDto>>(contract);
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
      return DatabaseContext.ContractRepository.GetSingle(x => x.ContractId == id, null, x => x.Team);
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
  }
}
