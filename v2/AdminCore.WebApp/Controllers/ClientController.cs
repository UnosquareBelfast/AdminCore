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

namespace AdminCore.WebApi.Controllers
{
  [Route("[controller]")]
  [ApiController]
  [Authorize]
  public class ClientController : BaseController
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
      var clients = _clientService.GetAll();
      if (clients != null)
      {
        return Ok(_mapper.Map<List<ClientViewModel>>(clients));
      }

      return Ok("No client exist");
    }

    [HttpPut]
    public IActionResult UpdateClient(UpdateClientViewModel viewModel)
    {
      var clientDto = _mapper.Map<ClientDto>(viewModel);
      try
      {
        _clientService.Save(clientDto);
      }
      catch (Exception ex)
      {
        //Log Exception
        return Ok("Something went wrong, client was not updated.");
      }
      return Ok();
    }

    [HttpPost]
    public IActionResult CreateClient(CreateClientViewModel viewModel)
    {
      var clientDto = _mapper.Map<ClientDto>(viewModel);
      try
      {
        _clientService.Save(clientDto);
      }
      catch (Exception ex)
      {
        //Log Exception
        return Ok("Something went wrong, client was not created.");
      }
      
      return Ok($"Client {viewModel.ClientName} has successfully been created");
    }

    [HttpGet("{id}")]
    public IActionResult GetClientById(int id)
    {
      var client = _clientService.GetByClientId(id);
      if (client != null)
      {
        return Ok(_mapper.Map<ClientViewModel>(client));
      }

      return Ok($"No client found with an ID of { id.ToString() }");
    }

    [HttpGet("findByClientName/{clientName}")]
    public IActionResult GetClientByClientName(string clientName)
    {
      var client = _clientService.GetByClientName(clientName);
      if (client != null)
      {
        return Ok( _mapper.Map<IList<ClientViewModel>>(client));
      }
      return Ok($"No client found with an ID of { clientName }");      
    }
  }
}