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
  }
}