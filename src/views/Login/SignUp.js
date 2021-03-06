import React from 'react';
// import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Typography,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOutlined';
import { useForm } from '../../hooks';
import firebase from '../../firebase';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '10%'
  },
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    marginTop: theme.spacing(3)
  },
  typography: {
    fontSize: '1.25rem'
  }
}));

const INIT_VALUES = {
  name: { value: '', invalid: false, error: '' },
  email: { value: '', invalid: false, error: '' },
  password: { value: '', invalid: false, error: '' }
};

const INIT_MODAL = { showModal: false, message: '' };

export default function SignUp(props) {
  const classes = useStyles();
  const [modal, setModal] = React.useState(INIT_MODAL);
  const { handleSubmit, handleChange, values } = useForm(
    INIT_VALUES,
    registerUser
  );
  const { name, email, password } = values;

  async function registerUser() {
    try {
      await firebase.register(name.value, email.value, password.value);
      props.history.push('/');
    } catch (err) {
      console.error('Authentication Error', err);
      setModal({ showModal: true, message: err.message });
    }
  }

  return (
    <div className={classes.root}>
      {modal.showModal ? (
        <Dialog open={modal.showModal} onClose={() => setModal(INIT_MODAL)}>
          <DialogTitle>Authentication Error</DialogTitle>
          <DialogContent>
            <DialogContentText>{modal.message || 'NA'}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setModal(INIT_MODAL)}
              color="primary"
              autoFocus
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography>Sign Up</Typography>
          <form className={classes.form}>
            <TextField
              label="Name"
              value={name.value}
              name="name"
              autoComplete="off"
              autoFocus
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
              error={name.invalid}
              helperText={name.error}
            />
            <TextField
              label="Email"
              value={email.value}
              name="email"
              autoComplete="off"
              type="email"
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
              error={email.invalid}
              helperText={email.error}
            />
            <TextField
              label="Password"
              value={password.value}
              name="password"
              autoComplete="off"
              type="password"
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
              error={password.invalid}
              helperText={password.error}
            />
            <Button
              onClick={() => handleSubmit()}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Save
            </Button>
          </form>
        </Paper>
      </main>
    </div>
  );
}

// SignUp.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
