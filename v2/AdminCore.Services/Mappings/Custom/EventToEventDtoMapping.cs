using System.Linq;
using AdminCore.DAL.Models;
using AdminCore.DTOs.Event;
using AutoMapper;

namespace AdminCore.Services.Mappings.Custom
{
  public class EventToEventDtoMapping : ITypeConverter<Event, EventDto>
  {
    public EventDto Convert(Event source, EventDto destination, ResolutionContext context)
    {
      destination = destination ?? new EventDto();

      destination.LatestMessage = source.EventMessages?.OrderByDescending(x => x.LastModified).FirstOrDefault()?.Message;

      return destination;
    }
  }
}