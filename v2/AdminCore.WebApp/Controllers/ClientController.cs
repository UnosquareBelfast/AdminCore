// --------------------------------------------------------------------------------------------------------------------
// <copyright file="AuthenticationController.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the AuthenticationController type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using AdminCore.Common.Interfaces;
using AdminCore.WebApi.Models.Client;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace AdminCore.WebApi.Controllers
{
  [Route("[controller]")]
  [ApiController]
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
    public ActionResult GetAllClients()
    {
      return Ok();
    }

    [HttpPut]
    public ActionResult UpdateClient([FromBody] ClientViewModel model)
    {
      return Ok();
    }

    [HttpPost]
    public ActionResult CreateClient([FromBody] ClientViewModel clientViewModel)
    {
      return Ok();
    }

    [HttpDelete]
    public ActionResult DeleteClient([FromBody] ClientViewModel clientViewModel)
    {
      return Ok();
    }

    [HttpGet("/getClientById/{id}")]
    public ActionResult GetClientById(int id)
    {
      return Ok();
    }

    [HttpGet("/getClientByName/{clientName}")]
    public ActionResult GetClientByClientName(string clientName)
    {
      return Ok();
    }
  }
}