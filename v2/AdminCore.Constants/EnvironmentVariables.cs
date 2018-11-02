namespace Admincore.Constants
{
    public static class EnvironmentVariables
    {
        private const string DbConnectionStringKey = "DbConnectionString";

        public static string DbConnectionString => DbConnectionStringKey;
    }
}