using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdminCore.Common.Interfaces;
using AdminCore.DTOs;
using AdminCore.WebApi.Models.Contract;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AdminCore.WebApi.Controllers
{
  [Route("[controller]")]
  [ApiController]
  [Authorize]
  public class ContractController : BaseController
  {
    private IContractService _contractService;

    public ContractController(IMapper mapper, IContractService contractService) : base(mapper)
    {
      _contractService = contractService;
    }

    [HttpGet("{id}")]
    public IActionResult GetContractById(int id)
    {
      var contractDto = _contractService.GetContractById(id);
      if (contractDto != null)
      {
        return Ok(Mapper.Map<ContractViewModel>(contractDto));
      }

      return NoContent();
    }

    [HttpGet("getByEmployeeId/{employeeId}")]
    public IActionResult GetContractByEmployeeId(int employeeId)
    {
      var contractDtos = _contractService.GetContractByEmployeeId(employeeId);
      if (contractDtos.Any())
      {
        return Ok(Mapper.Map<IList<ContractViewModel>>(contractDtos));
      }

      return NoContent();
    }

    [HttpGet("getByTeamId/{teamId}")]
    public IActionResult GetContractByTeamId(int teamId)
    {
      var contractDtos = _contractService.GetContractByTeamId(teamId);
      if (contractDtos.Any())
      {
        return Ok(Mapper.Map<IList<ContractViewModel>>(contractDtos));
      }

      return NoContent();
    }

    [HttpGet("getByEmployeeIdAndTeamId/{employeeId}/{teamId}")]
    public IActionResult GetContractByEmployeeIdAndTeamId(int employeeId, int teamId)
    {
      var contractDtos = _contractService.GetContractByEmployeeIdAndTeamId(employeeId, teamId);
      if (contractDtos.Any())
      {
        return Ok(Mapper.Map<IList<ContractViewModel>>(contractDtos));
      }

      return NoContent();
    }

    [HttpPost]
    public IActionResult CreateContract(CreateContractViewModel contract)
    {
      var contractDto = Mapper.Map<ContractDto>(contract);
      try
      {
        _contractService.SaveContract(contractDto);
        return Ok("Contract successfully created.");
      }
      catch (Exception ex)
      {
        Logger.LogError(ex.Message);
        return StatusCode(500, "Something went wrong. Contract was not created.");
      }
    }

    [HttpPut]
    public IActionResult UpdateContract(UpdateContractViewModel contract)
    {
      var contractDto = Mapper.Map<ContractDto>(contract);
      try
      {
        _contractService.SaveContract(contractDto);
        return Ok("Contract successfully updated.");
      }
      catch (Exception ex)
      {
        Logger.LogError(ex.Message);
        return StatusCode(500, "Something went wrong. Contract was not updated.");
      }
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteContract(int id)
    {
      try
      {
        _contractService.DeleteContract(id);
        return Ok("Contract successfully deleted.");
      }
      catch (Exception ex)
      {
        Logger.LogError(ex.Message);
        return StatusCode(500, "Something went wrong. Contract was not deleted.");
      }
    }
  }
}
