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

namespace AdminCore.WebApi.Controllers
{
  [Route("[controller]")]
  [ApiController]
  public class ClientController : ControllerBase
  {
    private readonly IMapper _mapper;

    private readonly IClientService _clientService;

    public ClientController(IClientService clientService, IMapper mapper)
    {
      _clientService = clientService;
      _mapper = mapper;
    }

    [HttpGet]
    public ActionResult GetAllClients()
    {
      var clients = _clientService.GetAll();
      if (clients != null)
      {
        return Accepted(_mapper.Map<ClientViewModel>(clients));
      }

      return null;
    }

    [HttpPut]
    public void UpdateClient(ClientViewModel model)
    {
      var clientDto = _mapper.Map<ClientViewModel, ClientDto>(model);

      _clientService.UpdateClient(clientDto);
    }

    [HttpPost]
    public ActionResult CreateClient([FromBody] ClientViewModel clientViewModel)
    {
      _clientService.CreateClient(_mapper.Map<ClientDto>(clientViewModel));
      return Ok();
    }

    [HttpDelete]
    public ActionResult DeleteClient([FromBody] ClientViewModel clientViewModel)
    {
      _clientService.DeleteClient(clientViewModel.ClientId);

      return Ok();
    }

    [HttpGet("/getClientById/{id}")]
    public ActionResult GetClientById(int id)
    {
      _clientService.GetClientById(id);
      return Ok();
    }

    [HttpGet("/getClientByName/{clientName}")]
    public ActionResult GetClientByClientName(string clientName)
    {
      var client = _clientService.GetClientByClientName(clientName);
      if (client != null)
      {
        return Accepted(_mapper.Map<ClientViewModel>(client));
      }

      return null;
    }
  }
}