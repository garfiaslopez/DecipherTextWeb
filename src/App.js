import React, { Component, Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Copyright from './Components/Copyright';
import AppStyles from './AppStyles';
import DecipherForm from './Components/DecipherForm';

export default () => {
  const classes = AppStyles();
  return (
    <Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Esime Zacatenco - 9CV11
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography 
            component="h1" 
            variant="h4" 
            align="center"
            className={classes.titlePaper}
          >
            Descifrador de texto
          </Typography>
          <DecipherForm />
        </Paper>
        <Copyright />
      </main>
    </Fragment>
  );
};