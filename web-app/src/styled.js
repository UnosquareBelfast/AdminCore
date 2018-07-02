import { injectGlobal } from 'styled-components';
import holidayStatus from './utilities/holidayStatus';

export const theme = {
  colours: {
    unoBlue: '#0eb5d1',
    darkBlue: '#0a98af',
    white: '#ffffff',
    grey: '#d6d6d6',
    lightgrey: '#f7f7f7',
    darkGrey: '#3a3939',
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
`;
