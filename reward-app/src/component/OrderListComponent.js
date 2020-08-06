import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import fakeData from './fakeData.json';
import { Container, withStyles, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

class OrderListComponent extends React.Component {
  constructor() {
    super();
    this.data = localStorage;
    this.cutomers = fakeData.customers;
    this.dataList = [];
    this.calculatedRewardsList = [];

    if (this.cutomers != undefined) {
      this.cutomers.forEach((customer) => {
        if (this.data[customer]) {
          var customerList = JSON.parse(this.data[customer]);
          let calcutedData = {
            customer: '',
            june: 0,
            july: 0,
            august: 0,
            totalRewardPoints: 0,
          };
          customerList.forEach((data) => {
            calcutedData.customer = data.customer;
            if (data.month == 'June') {
              calcutedData.june += data.rewardPoints;
            } else if (data.month == 'July') {
              calcutedData.july += data.rewardPoints;
            } else if (data.month == 'August') {
              calcutedData.august += data.rewardPoints;
            }
            calcutedData.totalRewardPoints += data.rewardPoints;
            this.dataList.push(data);
          });
          this.calculatedRewardsList.push(calcutedData);
        }
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Container component='main' style={{ paddingTop: 20, paddingBottom: 20 }}>
        <Typography variant='h6' component='h2' gutterBottom>
          Calculated Reward Points
        </Typography>
        <TableContainer component={Paper} style={{ maxHeight: 440 }}>
          <Table
            stickyHeader
            className={classes.table}
            aria-label='simple table'
          >
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align='right'>Customer Name</TableCell>
                <TableCell align='right'>June</TableCell>
                <TableCell align='right'>July</TableCell>
                <TableCell align='right'>August</TableCell>
                <TableCell align='right'>Total Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.calculatedRewardsList.map((data, index) => (
                <TableRow key={index}>
                  <TableCell component='th' scope='row'>
                    {index + 1}
                  </TableCell>
                  <TableCell align='right'>{data.customer}</TableCell>
                  <TableCell align='right'>{data.june}</TableCell>
                  <TableCell align='right'>{data.july}</TableCell>
                  <TableCell align='right'>{data.august}</TableCell>
                  <TableCell align='right'>{data.totalRewardPoints}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {this.calculatedRewardsList.length === 0 && (
          <Typography variant='subtitle1' gutterBottom>
            No Records Found..
          </Typography>
        )}
        <br />
        <br />
        <Typography variant='h6' component='h2' gutterBottom>
          Last Three Months Records
        </Typography>
        <TableContainer component={Paper} style={{ maxHeight: 440 }}>
          <Table
            stickyHeader
            className={classes.table}
            aria-label='simple table'
          >
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align='right'>Customer Name</TableCell>
                <TableCell align='right'>Month</TableCell>
                <TableCell align='right'>Product</TableCell>
                <TableCell align='right'>Price</TableCell>
                <TableCell align='right'>Reward Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.dataList.map((data, index) => (
                <TableRow key={index}>
                  <TableCell component='th' scope='row'>
                    {index + 1}
                  </TableCell>
                  <TableCell align='right'>{data.customer}</TableCell>
                  <TableCell align='right'>{data.month}</TableCell>
                  <TableCell align='right'>{data.product}</TableCell>
                  <TableCell align='right'>{data.price}</TableCell>
                  <TableCell align='right'>{data.rewardPoints}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {this.dataList.length === 0 && (
          <Typography variant='subtitle1' gutterBottom>
            No Records Found..
          </Typography>
        )}
        <br />
        <Grid container>
          <Grid item xs>
            <Link to='/' variant='body2'>
              Create an Order
            </Link>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const useStyles = (theme) => ({
  table: {
    minWidth: 650,
  },
});

export default withStyles(useStyles, { withTheme: true })(OrderListComponent);
