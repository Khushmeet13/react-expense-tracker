import { makeStyles } from '@material-ui/core';

export default makeStyles(() =>({
    income:{
        borderBottom: '10px solid rgba(0, 255, 0, 0.5)',
    },

    cardTitleIncome:{
        color: 'green', 
        fontWeight: 'bold',
    },

    expense:{
        borderBottom: '10px solid rgba(255, 0, 0, 0.5)',
    },

    cardTitleExpense:{
        color: 'red', 
        fontWeight: 'bold',
    },

}));