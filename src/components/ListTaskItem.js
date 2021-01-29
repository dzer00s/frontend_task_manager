import React from "react";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Edit from "./Edit";
import { Button } from "@material-ui/core";
import formatDistance from 'date-fns/formatDistance';
import ruLocale from "date-fns/locale/ru";
import { format } from "date-fns";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      //   padding: theme.spacing(2),
      textAlign: 'center',
      //   color: theme.palette.text.secondary,
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

const ListTaskItem = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <hr></hr>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <div className={classes.paper}>{props.task.title}</div>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.paper}>{format(new Date(props.task.date_start), 'MM/dd/yy')}</div>
        </Grid>
        <Grid item xs={2}>
          {/* <div className={classes.paper}>{props.task.deadline}</div> */}
          <div className={classes.paper}>
            {formatDistance(
              new Date(props.task.deadline),
              new Date(props.task.date_start),
              { addSuffix: true, locale: ruLocale }
            )}
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.paper}>{props.task.date_end}</div>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.paper}>{props.task.comment}</div>
        </Grid>
        <Grid item xs={1}>
          <Edit todo={props.task} className={[classes.paper, classes.buttonYellow]}>Правка</Edit>
        </Grid>
        <Grid item xs={1}>
          <Button className={[classes.paper, classes.buttonRed]} onClick={() => props.deleteTodo(props.task.id)}>Удалить</Button>
        </Grid>
      </Grid>
      <hr></hr>
    </div>
  );
};

export default ListTaskItem;
