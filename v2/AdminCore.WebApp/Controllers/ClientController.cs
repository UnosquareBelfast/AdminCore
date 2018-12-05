// --------------------------------------------------------------------------------------------------------------------
// <copyright file="AuthenticationController.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the AuthenticationController type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;
using AdminCore.Common.Interfaces;
using AdminCore.DTOs.Client;
using AdminCore.WebApi.Models.Client;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Microsoft.Extensions.Logging;

namespace AdminCore.WebApi.Controllers
{
  [Route("[controller]")]
  [ApiController]
  [Authorize]
  public class ClientController : BaseController
  {
    private readonly IClientService _clientService;

    public ClientController(IClientService clientService, IMapper mapper) : base(mapper)
    {
      _clientService = clientService;
    }

    [HttpGet]
    public IActionResult GetAllClients()
    {
      var clients = _clientService.GetAll();
      if (clients.Any())
      {
        return Ok(Mapper.Map<List<ClientViewModel>>(clients));
      }

      return StatusCode((int)HttpStatusCode.InternalServerError, "No client exist");
    }

    [HttpPut]
    public IActionResult UpdateClient(UpdateClientViewModel viewModel)
    {
      var clientDto = Mapper.Map<ClientDto>(viewModel);
      try
      {
        _clientService.Save(clientDto);
      }
      catch (Exception ex)
      {
        Logger.LogError(ex.Message);
        return StatusCode((int)HttpStatusCode.InternalServerError, "Something went wrong, client was not updated.");
      }
      return Ok();
    }

    [HttpPost]
    public IActionResult CreateClient(CreateClientViewModel viewModel)
    {
      var clientDto = Mapper.Map<ClientDto>(viewModel);
      try
      {
        _clientService.Save(clientDto);
      }
      catch (Exception ex)
      {
        Logger.LogError(ex.Message);
        return StatusCode((int)HttpStatusCode.InternalServerError, "Something went wrong, client was not created.");
      }
      
      return Ok();
    }

    [HttpGet("{id}")]
    public IActionResult GetClientById(int id)
    {
      var client = _clientService.GetByClientId(id);
      if (client != null)
      {
        return Ok(Mapper.Map<ClientViewModel>(client));
      }

      return StatusCode((int)HttpStatusCode.InternalServerError, $"No client found with an ID of { id.ToString() }");
    }

    [HttpGet("findByClientName/{clientName}")]
    public IActionResult GetClientByClientName(string clientName)
    {
      var client = _clientService.GetByClientName(clientName);
      if (client.Any())
      {
        return Ok( Mapper.Map<IList<ClientViewModel>>(client));
      }
      return StatusCode((int)HttpStatusCode.InternalServerError, $"No client found with client name { clientName }");      
    }
  }
}