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
  [Authorize]
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
    [AllowAnonymous]
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
    [AllowAnonymous]
    public void UpdateClient(ClientViewModel model)
    {
      var clientDto = _mapper.Map<ClientViewModel, ClientDto>(model);

      _clientService.UpdateClient(clientDto);
    }

    [HttpPost]
    [AllowAnonymous]
    public ActionResult CreateClient([FromBody] ClientViewModel clientViewModel)
    {
      _clientService.CreateClient(_mapper.Map<ClientDto>(clientViewModel));
      return Ok();
    }

    [HttpDelete]
    [AllowAnonymous]
    public ActionResult DeleteClient([FromBody] ClientViewModel clientViewModel)
    {
      _clientService.DeleteClient(clientViewModel.ClientId);

      return Ok();
    }

    [HttpGet]
    [AllowAnonymous]
    public ActionResult GetClientById([FromBody] ClientViewModel clientViewModel)
    {
      _clientService.GetClientById(clientViewModel.ClientId);
      return Ok();
    }

    [HttpGet]
    [AllowAnonymous]
    public ActionResult GetClientByClientNameContaining([FromBody] ClientViewModel clientViewModel)
    {
      var client = _clientService.GetClientByClientNameContaining(clientViewModel.ClientName);
      if (client != null)
      {
        return Accepted(_mapper.Map<ClientViewModel>(client));
      }

      return null;
    }
  }
}