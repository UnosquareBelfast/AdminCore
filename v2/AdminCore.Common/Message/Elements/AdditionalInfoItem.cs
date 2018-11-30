using System;

namespace AdminCore.Common.Message.Elements
{
  public class AdditionalInfoItem
  {
    public string ItemType { get; set; } = "";
    public string Description { get; set; } = "";
    public string AdditionalInfo { get; set; } = "";

    /// <summary>
    /// Constructor assigns all values for the AdditionalInfoItem.
    /// </summary>
    /// <param name="itemType"></param>
    /// <param name="description"></param>
    /// <param name="additionalInfo"></param>
    public AdditionalInfoItem(string itemType, string description, string additionalInfo)
    {
      ItemType = String.IsNullOrEmpty(itemType) ? "" : itemType;
      Description = String.IsNullOrEmpty(description) ? "" : description;
      AdditionalInfo = String.IsNullOrEmpty(additionalInfo) ? "" : additionalInfo;
    }

    /// <summary>
    /// Constructor assigns all values for the AdditionalInfoItem.
    /// </summary>
    /// <param name="itemType"></param>
    /// <param name="description"></param>
    public AdditionalInfoItem(string itemType, string description)
    {
      ItemType = String.IsNullOrEmpty(itemType) ? "" : itemType;
      Description = String.IsNullOrEmpty(description) ? "" : description;
    }
  }
}