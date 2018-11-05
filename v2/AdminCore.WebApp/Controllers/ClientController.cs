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
    //    @GetMapping(value = "/{clientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    //    @ResponseBody
    //    public ClientViewModel findClientById(@PathVariable("clientId") int id) {
    //      return modelMapper.map(clientService.findById(id), ClientViewModel.class);
    //    }

    //    @GetMapping(value = "/findByClientNameContaining/{clientName}", produces = MediaType.APPLICATION_JSON_VALUE)
    //    @ResponseStatus(HttpStatus.OK)
    //    public List<ClientViewModel> findByClientNameContaining(@PathVariable("clientName") String clientName) {
    //      List clients = clientService.findByClientNameContaining(clientName);
    //      return mapClientsToDtos(clients);
    //    }
  }
}