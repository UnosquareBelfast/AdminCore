using AdminCore.DTOs.EventMessage;
using System.Collections.Generic;

namespace AdminCore.Common.Interfaces
{
  public interface IEventMessageService
  {
    IList<EventMessageDto> GetAllEventMessagesForEvent(int eventId);

    void CreateGeneralEventMessage(int eventId, string message, int employeeId);
  }
}