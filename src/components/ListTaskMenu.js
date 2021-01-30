import React, { useEffect, useState } from "react";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListTaskItem from "./ListTaskItem";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      textAlign: 'center',
      fontWeight: 'bold',
    },
    buttonRed: {
      backgroundColor: 'red',
      color: 'white',
    },
    buttonYellow: {
      backgroundColor: 'gold',
    }
  }),
);

const ListTaskMenu = () => {
  const currentUser = useSelector(state => state.user.currentUser.username)
  const [todos, setTodos] = useState([]);
  const deleteTodo = async id => {
    try {
      await fetch(`http://localhost:5000/api/task/${id}`, {
        method: "DELETE"
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };
  const classes = useStyles();

  const getTodos = async (user) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${user}`);
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getTodos(currentUser);
  }, []);
  console.log(todos)

  return (
    <div className={classes.root}>
      <hr></hr>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <div className={classes.paper}>Наименование</div>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.paper}>Дата начала</div>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.paper}>Дедлайн</div>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.paper}>Дата окончания</div>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.paper}>Комментарий</div>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.paper}>Действие</div>
        </Grid>
      </Grid>
      {todos.map(task => (
        <ListTaskItem task={task} deleteTodo={deleteTodo} />
      ))}
      <hr></hr>
    </div>
  );
};

export default ListTaskMenu;
