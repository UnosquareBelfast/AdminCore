import { injectGlobal } from 'styled-components';

export const theme = {
  colours: {
    unoBlue: '#0eb5d1',
    white: '#ffffff',
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
  }
`;
