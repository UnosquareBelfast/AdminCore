// --------------------------------------------------------------------------------------------------------------------
// <copyright file="AuthenticationController.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the AuthenticationController type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

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
  public class ClientController : SharedController
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
      var allClientsResponse = _clientService.GetAll();
      var allClientsViewModel = _mapper.Map<List<ClientViewModel>>(allClientsResponse.Payload);
      return GetResultFromResponse(allClientsResponse.Status, allClientsViewModel);
    }

    [HttpPut]
    public IActionResult UpdateClient(UpdateClientViewModel viewModel)
    {
      var clientDto = _mapper.Map<ClientDto>(viewModel);
      var updateClientResponse = _clientService.Update(clientDto);
      return GetResultFromEmptyResponse(updateClientResponse);
    }

    [HttpPost]
    public IActionResult CreateClient(CreateClientViewModel viewModel)
    {
      var clientDto = _mapper.Map<ClientDto>(viewModel);
      var createResponse = _clientService.Create(clientDto);
      var responseViewModel = _mapper.Map<ClientViewModel>(createResponse.Payload);
      return GetResultFromResponse(createResponse.Status, responseViewModel);
    }

    [HttpGet("{id}")]
    public IActionResult GetClientById(int id)
    {
      var response = _clientService.GetByClientId(id);
      var clientViewModel = _mapper.Map<ClientViewModel>(response.Payload);
      return GetResultFromResponse(response.Status, clientViewModel);
    }

    [HttpGet("findByClientName/{clientName}")]
    public IActionResult GetClientByClientName(string clientName)
    {
      var response = _clientService.GetByClientName(clientName);
      var clientViewModel = _mapper.Map<IList<ClientViewModel>>(response.Payload);
      return GetResultFromResponse(response.Status, clientViewModel);
    }
  }
}