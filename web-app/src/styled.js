import { injectGlobal } from 'styled-components';
import holidayStatus from './utilities/holidayStatus';

export const theme = {
  colours: {
    unoBlue: '#0eb5d1',
    darkBlue: '#0a98af',
    white: '#ffffff',
    grey: '#f4f4f4',
    lightgrey: '#f7f7f7',
    red: '#ff3434',
    darkRed: '#c4412b',
    green: '#35c375',
    yellow: '#ff9b34',
  },
  fonts: {
    main: 'Open Sans',
    fallback: 'sans-serif',
  },
  holidayStatus: {
    [holidayStatus.PENDING]: '#ff9b34',
    [holidayStatus.REJECTED]: '#ff3434',
    [holidayStatus.APPROVED]: '#35c375',
    [holidayStatus.WFH]: '#3469ff',
  },
};

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: ${theme.fonts.main}, ${theme.fonts.fallback};
    background: #f1f5f8;
    color: #303335;
  }

  .rbc-calendar {
    width: 100%;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0px 2px 2px rgba(0,0,0,0.1);
    background: white;
    margin-left: 15px;
  }
`;
