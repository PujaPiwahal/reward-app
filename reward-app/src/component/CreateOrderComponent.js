import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles, MenuItem, Grid } from '@material-ui/core';
import Copyright from './CopyrightComponent';
import fakeData from './fakeData.json';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

class CreateOrderComponent extends React.Component {
  constructor() {
    super();
    this.customers = fakeData.customers;
    this.months = fakeData.months;
    this.products = fakeData.products;
    this.state = { customer: '', month: '', product: '', price: 0 };
  }

  handleChange = (event) => {
    const input = event.target;
    const value = input.type === 'checkbox' ? input.checked : input.value;

    this.setState({ [input.name]: value });
  };

  componentDidMount() {
    //localStorage.clear();
  }

  handleFormSubmit = (e) => {
    const { customer, price } = this.state;
    // e.preventDefault();

    //Reward logic
    let rewardPoints = 0;
    if (price > 50) {
      rewardPoints = rewardPoints + 50;
      if (price > 100) {
        rewardPoints = (price - 100) * 2 + rewardPoints;
      }
    }
    this.state.rewardPoints = rewardPoints;

    if (localStorage.getItem(customer)) {
      let data = JSON.parse(localStorage.getItem(customer));
      data.push(this.state);
      localStorage.setItem(customer, JSON.stringify(data));
    } else {
      localStorage.setItem(customer, JSON.stringify([this.state]));
    }
    history.push('/list');
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Create an Order
          </Typography>
          <form className={classes.form} onSubmit={this.handleFormSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              select
              required
              fullWidth
              autoFocus
              name='customer'
              label='Customer'
              value={this.state.customer}
              onChange={this.handleChange}
              helperText='Please select customer'
            >
              {this.customers.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              variant='outlined'
              margin='normal'
              select
              required
              fullWidth
              autoFocus
              name='month'
              label='Month'
              value={this.state.month}
              onChange={this.handleChange}
              helperText='Please select month'
            >
              {this.months.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              variant='outlined'
              margin='normal'
              select
              required
              fullWidth
              autoFocus
              label='Product'
              name='product'
              value={this.state.product}
              onChange={this.handleChange}
              helperText='Please select product name'
            >
              {this.products.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Price'
              name='price'
              value={this.state.price}
              onChange={this.handleChange}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Save
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='/list' variant='body2'>
                  Show List
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

export default withStyles(useStyles, { withTheme: true })(CreateOrderComponent);
