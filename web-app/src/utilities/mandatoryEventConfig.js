export const getMandatoryCalendarEvents = () => {
  const currYear = new Date().getFullYear();
  const events = [
    {
      title: 'Christmas Day',
      mandatoryDate: `${currYear}-12-25`,
    },
    {
      title: 'New Years Day',
      mandatoryDate: `${currYear}-12-31`,
    },
    {
      title: 'Memorial Day',
      mandatoryDate: `${currYear}-05-28`,
    },
  ];

  return events;
};
