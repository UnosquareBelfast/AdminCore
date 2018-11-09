// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EnvironmentVariables.cs" company="AdminCore">
//   Unosquare
// </copyright>
// <summary>
//   Defines the EnvironmentVariables type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.Constants
{
  /// <summary>
  ///   The environment variables.
  /// </summary>
  public static class EnvironmentVariables
  {
    /// <summary>
    ///   The db connection string.
    /// </summary>
    public static readonly string DbConnectionString = "DB_CONNECTION_STRING";

    /// <summary>
    ///   The db migration type string.
    /// </summary>
    public static readonly string DbMigrationType = "DB_MIGRATION_TYPE";
  }
}