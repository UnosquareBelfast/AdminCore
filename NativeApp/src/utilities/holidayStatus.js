const holidayStatus = {
  PENDING: 1,
  APPROVED: 2,
  REJECTED: 3,
  WFH: 4,
};

const holidayStatusColor = {
  [holidayStatus.PENDING]: '#ff9b34',
  [holidayStatus.REJECTED]: '#ff3434',
  [holidayStatus.APPROVED]: '#35c375',
  [holidayStatus.WFH]: '#3469ff',
};

export default holidayStatusColor;
