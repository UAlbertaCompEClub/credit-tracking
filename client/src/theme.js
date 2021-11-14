import {createTheme} from '@mui/material/styles'
export const mainTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#fff5df',
      contrastText: 'rgba(18,11,26,0.87)',
      light: '#fdfdde',
    },
    secondary: {
      main: '#dcd5d7',
    },
    background: {
      default: '#212631',
      paper: '#364760',
    },
    text: {
      primary: 'rgba(236,236,236,0.87)',
      secondary: 'rgba(249,249,249,0.54)',
      disabled: 'rgba(181,181,181,0.38)',
    },
    divider: 'rgba(236,236,236,0.12)',
  },
});