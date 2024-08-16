import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }
}

const theme = createTheme({
  palette: {
    secondary: {
      main: '#d32f2f',
      darker: '#ab003c',
    },
  },
});

export default theme;
