import React from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider} from '@material-ui/core';

import useStyles from './mainStyles';
import Form from './Form';
import List from './List';

const Main = () => {
    const classes = useStyles();

    return (
    <Card className={classes.root}>
        <CardHeader title="Expense Tracker" subheader="Powered by Speech Recognition" />
        <CardContent>
            <Typography align='center' variant='h5'>Total Balance $100</Typography>
            <Typography variant='subTitle1' style={{ lineHeight: '1.5em', marginTop: '20px'}}>
                Say similar: Add income for amount 100 in Category salary for monday...
            </Typography>
            <Divider />
            <Form />
        </CardContent>
        <CardContent className={classes.cardContent}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <List /> 
                </Grid>
            </Grid>

        </CardContent>
    </Card>
    )
    }

export default Main
