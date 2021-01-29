import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/user';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  const isAuth = useSelector(state => state.user.isAuth)
  const currentUser = useSelector(state => state.user.currentUser.username)
  const dispatch = useDispatch()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/">Task Manager</NavLink>
          </Typography>
          {!isAuth && <Button color="inherit"><NavLink to="/login">Логин</NavLink></Button>}
          {!isAuth && <Button color="inherit"><NavLink to="/registration">Регистрация</NavLink></Button>}
          {isAuth && <Typography color="inherit">{currentUser}</Typography>}
          {isAuth && <Button color="inherit" onClick={() => {dispatch(logout())}}>Выход</Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;