using AdminCore.Constants.Enums;
using AdminCore.DAL.Models;
using AdminCore.DTOs.Event;
using AutoMapper;
using System.Linq;

namespace AdminCore.Services.Mappings
{
  public class EventMapperProfile : Profile
  {
    public EventMapperProfile()
    {
      CreateMap<Event, EventDto>()
        .AfterMap((src, dest) => dest.LatestMessage = src.EventMessages?.OrderByDescending(x => x.LastModified).FirstOrDefault()?.Message);

      CreateMap<EventDto, Event>();
      CreateMap<EventDate, EventDto>().ReverseMap();
      CreateMap<EventDate, EventDateDto>().ReverseMap();
      CreateMap<EventType, EventTypes>().ReverseMap();
    }
  }
}