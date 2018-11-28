using AdminCore.DAL.Models;
using AdminCore.DTOs.Event;
using AutoMapper;

namespace AdminCore.Services.Mappings
{
  public class EventMapperProfile : Profile
  {
    public EventMapperProfile()
    {
      CreateMap<Event, EventDto>().ReverseMap();
    }
  }
}