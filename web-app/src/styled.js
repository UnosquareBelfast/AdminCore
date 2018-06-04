import { injectGlobal } from 'styled-components';

export const theme = {
  colours: {
    unoBlue: '#0eb5d1',
    white: '#ffffff',
    grey: '#f4f4f4',
  },
  fonts: {
    text: 'sans-serif',
  },
};

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: ${theme.fonts.text};
    background: #f1f5f8;
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
