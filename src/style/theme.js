import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto/300.css';

const ubuntuMono = 'Roboto';

const themeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#0f0',
    },
    background: {
      default: '#111111',
      paper: '#212121',
    },
  },
  typography: {
    fontFamily: ubuntuMono,
    h1: {
      fontFamily: ubuntuMono,
    },
    h2: {
      fontFamily: ubuntuMono,
    },
    h3: {
      fontFamily: ubuntuMono,
    },
    h4: {
      fontFamily: ubuntuMono,
    },
    h6: {
      fontFamily: ubuntuMono,
    },
    h5: {
      fontFamily: ubuntuMono,
    },
    subtitle1: {
      fontFamily: ubuntuMono,
    },
    subtitle2: {
      fontFamily: ubuntuMono,
    },
    button: {
      fontFamily: ubuntuMono,
      fontWeight: 900,
    },
    overline: {
      fontFamily: ubuntuMono,
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
