using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AdminCore.Common.Message;
using AdminCore.Common.Message.Elements;
using Microsoft.AspNetCore.Mvc;

namespace AdminCore.WebApi.Controllers
{
  public class SharedController : ControllerBase
  {
    protected IActionResult GetResultFromResponse<T>(string responseStatus, T viewModel)
    {
      return MapResponseStatusToActionResult(responseStatus, viewModel);
    }

    protected IActionResult GetResultFromEmptyResponse(ResponseMessage<EmptyMessage> response)
    {
      return MapResponseStatusToActionResult(response.Status, response.Payload);
    }

    private IActionResult MapResponseStatusToActionResult<T>(string status, T objectBeingReturned)
    {
      switch (status)
      {
        case MessageConstants.MsgStatusSuccess:
          return Ok(objectBeingReturned);
        case MessageConstants.MsgStatusValidation:
          return BadRequest(objectBeingReturned);
        case MessageConstants.MsgStatusNoRecords:
          return NotFound(objectBeingReturned);
        default:
          return StatusCode((int)HttpStatusCode.InternalServerError, objectBeingReturned);
      }
    }
  }
}
