using System;
using System.Collections.Generic;
using System.Text;
using AdminCore.DTOs.Event;
using AdminCore.DTOs.EventMessage;

namespace AdminCore.Common.Interfaces
{
  public interface IEventMessageService
  {
    IList<EventMessageDto> GetAllEventMessagesForEvent(int eventId);

    void CreateGeneralEventMessage(int eventId, string message);
  }
}