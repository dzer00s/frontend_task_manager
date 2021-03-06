import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, makeStyles, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../actions/user";

const useStyles = makeStyles((theme) => ({
  ButtonMargin: {
    marginTop: 40,
  }
}));

const FormCreate = () => {
  const classes = useStyles();
  const allUsers = useSelector(state => state.user.listUsers)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  const formik = useFormik({
    initialValues: {
      title: "",
      date_start: null,
      deadline: null,
      executor: ""
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
      date_start: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters"),
      deadline: Yup.string()
        .min(2, "Minimum 2 characters")
        .required("Required!"),
      executor: Yup.string()
        // .oneOf([Yup.ref("password")], "Password's not match")
        .required("Required!")
    }),
    onSubmit: (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      sendPost(values)
      resetForm()
    }
  });

  const sendPost = (values) => {
    let requestOptions = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(values),
      redirect: 'follow'
    };

    fetch("http://localhost:5000/api/task", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  return (
    <div className="App">
      <h1>Добавление новой Задачи</h1>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Наименование"
          variant="filled"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          fullWidth
          id="date_start"
          name="date_start"
          label="Дата начала"
          type="date"
          variant="filled"
          value={formik.values.date_start}
          onChange={formik.handleChange}
          error={formik.touched.date_start && Boolean(formik.errors.date_start)}
          helperText={formik.touched.date_start && formik.errors.date_start}
        />
        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker value={formik.values.date_start} onChange={formik.handleChange} />
        </MuiPickersUtilsProvider> */}
        <TextField
          fullWidth
          id="deadline"
          name="deadline"
          label="Дедлайн"
          type="date"
          variant="filled"
          value={formik.values.deadline}
          onChange={formik.handleChange}
          error={formik.touched.deadline && Boolean(formik.errors.deadline)}
          helperText={formik.touched.deadline && formik.errors.deadline}
        />
        <Autocomplete
          fullWidth
          id="executor"
          name="executor"
          label="Исполнитель"
          options={allUsers}
          onChange={(e, value) => {
            formik.setFieldValue("executor", value.username)
          }}
          getOptionLabel={(option) => option.username}
          renderInput={(params) => <TextField {...params} label="Исполнитель" variant="filled"
          />}
        />
        <Button className={classes.ButtonMargin} color="primary" variant="contained" fullWidth type="submit">
          Добавить
        </Button>
      </form>
    </div>
  );
}

export default FormCreate;