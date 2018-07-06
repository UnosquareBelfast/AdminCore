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
    headers: 'Oswald',
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

  @import url('https://fonts.googleapis.com/css?family=Oswald');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css');
  body {
    font-family: ${theme.fonts.main}, ${theme.fonts.fallback};
    background: #f1f5f8;
    color: #303335;
  }

  h1, h2, h3, h4 {
    font-family: ${theme.fonts.headers}, ${theme.fonts.fallback};
    text-transform: uppercase;
    margin: 0 0 20px 0;
  }
`;
