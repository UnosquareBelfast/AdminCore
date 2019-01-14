using AdminCore.DAL.Models;
using AdminCore.DTOs.Event;
using AdminCore.DTOs.EventMessage;
using AutoMapper;

namespace AdminCore.Services.Mappings
{
  public class EventMessageMapperProfile : Profile
  {
    public EventMessageMapperProfile()
    {
      CreateMap<EventMessage, EventMessageDto>().ReverseMap();
    }
  }
}