import React from 'react';
import BackgroundImage from './components/BackgroundImage';
import Details from './components/Details';
import Main from './components/Main';
import { Grid } from '@material-ui/core';
import useStyles from './appStyles';



const App = () => {
  const classes = useStyles();

  return (
    <div className="App">
      
      <div style={{ position: 'relative' }}>
        <BackgroundImage />
        
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <Grid className={classes.grid} container spacing={0} alignItems="center" justify="center" style={{ height: '100vh' }}>
            <Grid item xs={12} sm={4}>
              <Details title="Income"/>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Main />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Details title="Expense"/>
            </Grid>
          </Grid>
          
        </div>
        
      </div>
    </div>
  )
}

export default App

