import { injectGlobal } from 'styled-components';
import holidayStatus from './utilities/holidayStatus';
import eventTypes from './utilities/eventTypes';

export const theme = {
  colours: {
    lightBlue: '#daffff',
    unoBlue: '#0eb5d1',
    darkBlue: '#0a98af',
    white: '#ffffff',
    grey: '#d6d6d6',
    lightgrey: '#f7f7f7',
    darkGrey: '#3a3939',
    lightRed: '#fda49a',
    borderGrey: '#dddddd',
    red: '#ff3434',
    darkRed: '#c4412b',
    green: '#35c375',
    yellow: '#ff9b34',
  },
  fonts: {
    main: 'Open Sans',
    headers: 'Oswald',
    fallback: 'sans-serif',
    pixelSize: {
      h1: 32,
      h2: 24,
      h3: 20,
      h4: 18,
      default: 16,
      small: 14,
      xsmall: 10,
    },
    weight: {
      regular: 400,
      bold: 600,
    },
  },
  mediaQueries: {
    sm: '600px',
    md: '768px',
    lg: '992px',
    xl: '1220px',
  },
  holidayStatus: {
    [holidayStatus.PENDING]: '#ff9b34',
    [holidayStatus.REJECTED]: '#ff3434',
    [holidayStatus.APPROVED]: '#35c375',
    [holidayStatus.CANCELLED]: '#232323',
    [holidayStatus.MANDATORY]: '#0eb5d1',
    [holidayStatus.WFH]: '#3469ff',
  },
  eventType: {
    [eventTypes.ANNUAL_LEAVE]: '#5ccc4b',
    [eventTypes.WFH]: '#3469ff',
  },
};

const convertPxToRem = (fontSize, defaultBase = 16) => {
  return fontSize / defaultBase + 'rem !important';
};

injectGlobal`

  @import url('https://fonts.googleapis.com/css?family=Oswald');
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css');

  html {
    font-size: ${theme.fonts.pixelSize.small};
    @media (min-width: 768px) {
      font-size: ${theme.fonts.pixelSize.default};
    }
  }

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

  h1, .h1 { 
    font-size: ${convertPxToRem(28)}
    @media (min-width: 768px) {
      font-size: ${convertPxToRem(theme.fonts.pixelSize.h1)} 
    }
  }
  h2, .h2 { font-size: ${convertPxToRem(theme.fonts.pixelSize.h2)} }
  h3, .h3 { font-size: ${convertPxToRem(theme.fonts.pixelSize.h3)} }
  h4, .h4 { font-size: ${convertPxToRem(theme.fonts.pixelSize.h4)} }

  p,
  p span, 
  ul li, 
  a, 
  button,
  label,
  input,
  select {
    font-size: ${convertPxToRem(theme.fonts.pixelSize.default)}
  }

  small, .small{
    font-size: ${convertPxToRem(theme.fonts.pixelSize.small)}
  }

  .xsmall{
    font-size: ${convertPxToRem(theme.fonts.pixelSize.xsmall)}
  }

  .rt-td,
  .rt-resizable-header-content{
    font-size: ${convertPxToRem(theme.fonts.pixelSize.small)}
  }

  .bold{
    font-weight: ${theme.fonts.weight.bold}
  }

  .regular{
    font-weight: ${theme.fonts.weight.regular}
  }
`;
