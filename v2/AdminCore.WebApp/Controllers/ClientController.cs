// --------------------------------------------------------------------------------------------------------------------
// <copyright file="AuthenticationController.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the AuthenticationController type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System.Collections.Generic;
using AdminCore.Common.Interfaces;
using AdminCore.DAL.Models.Message;
using AdminCore.DTOs.Client;
using AdminCore.WebApi.Models.Client;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AdminCore.WebApi.Controllers
{
  [Route("[controller]")]
  [ApiController]
  [Authorize]
  public class ClientController : ControllerBase
  {
    private readonly IClientService _clientService;
    
    private readonly IMapper _mapper;

    public ClientController(IClientService clientService, IMapper mapper)
    {
      _clientService = clientService;
      _mapper = mapper;
    }

    [HttpGet]
    public IActionResult GetAllClients()
    {
      var allClients = _clientService.GetAll().Payload;
      var allClientsViewModel = _mapper.Map<List<ClientViewModel>>(allClients);
      if (allClientsViewModel != null)
      {
        return Ok(allClientsViewModel);
      }
      else
      {
        return NotFound("There are currently no clients in the DB");
      }
    }

    [HttpPut]
    public IActionResult UpdateClient(UpdateClientViewModel viewModel)
    {
      var clientDto = _mapper.Map<ClientDto>(viewModel);
      var updateClientResponse = _clientService.Update(clientDto);
      return GetResultFromUpdateResponse(updateClientResponse);
    }

    private IActionResult GetResultFromUpdateResponse(ResponseMessage<string> updateClientResult)
    {
      if (MessageConstants.MsgStatusSuccess.Equals(updateClientResult.Status))
      {
        return Ok(updateClientResult.Payload);
      }
      else
      {
        return NotFound(updateClientResult.Payload);
      }
    }

    [HttpPost]
    public IActionResult CreateClient(CreateClientViewModel viewModel)
    {
      return Ok();
    }

    [HttpGet("{id}")]
    public IActionResult GetClientById(int id)
    {
      return Ok();
    }

    [HttpGet("findByClientNameContaining/{clientName}")]
    public IActionResult GetClientByClientName(string clientName)
    {
      return Ok();
    }
  }
}