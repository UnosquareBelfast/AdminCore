using AdminCore.Common.DependencyInjection;

namespace AdminCore.Common
{
  public static class ServiceLocator
  {
    public static IContainer Instance { get; set; }
  }
}