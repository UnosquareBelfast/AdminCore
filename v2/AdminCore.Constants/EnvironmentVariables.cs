// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EnvironmentVariables.cs" company="AdminCore">
//   Unosquare
// </copyright>
// <summary>
//   Defines the EnvironmentVariables type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Admincore.Constants
{
  /// <summary>
  /// The environment variables.
  /// </summary>
  public static class EnvironmentVariables
    {
      /// <summary>
      /// The db connection string key.
      /// </summary>
      private const string DbConnectionStringKey = "AdmincoreDatabase";

      /// <summary>
      /// The db connection string.
      /// </summary>
      public static string DbConnectionString => DbConnectionStringKey;
    }
}