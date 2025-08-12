import Button from '@mui/material/Button';
import React from 'react';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import intl from 'react-intl-universal';

const Drawer = styled(MuiDrawer, {})(
  ({}) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: 360,
      boxSizing: 'border-box'
    },
  }),
);

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#000000" /*or whatever color you desire */
    }
  },
});

export default function Dashboard() {
  const doInsert = () => {
    fetch('/api/insert/', {
      method: 'GET',
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      alert(myJson["result"]);
    });
  }
  
  const showPerson = () => {
    fetch('/api/show/', {
      method: 'GET',
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      alert(myJson["result"]);
    });
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Drawer variant="permanent">
          <List component="nav">
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Button variant="contained" component="label" onClick={showPerson}>Show Person</Button>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Button variant="contained" component="label" onClick={doInsert}>Insert Data</Button>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
