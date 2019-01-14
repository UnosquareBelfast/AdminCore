namespace AdminCore.Common.DependencyInjection
{
  public interface IContainer
  {
    T GetInstance<T>() where T : class;
  }
}