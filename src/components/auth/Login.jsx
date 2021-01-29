import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, makeStyles, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { loginUser } from "../../actions/user";

const useStyles = makeStyles(() => ({
  ButtonMargin: {
    marginTop: 40,
  },
  containerMain: {
    marginTop: 50,
    width: 500,
    margin: 'auto'
  },
  alignCenter: {
    textAlign: "center",
  }
}));

const Login = () => {
  const dispatch = useDispatch()
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Логин содержит минимум 3 символов")
        .max(15, "Логин не может быть более 15 символов")
        .required("Необходимо ввести Логин"),
      password: Yup.string()
        .min(6, "Пароль должен содержать минимум 6 символов")
        .max(15, "Пароль не может содержать более 15 символов!")
        .required("Необходимо ввести Пароль"),
    }),
    onSubmit: (values, { resetForm }) => {
      resetForm()
    }
  });

  return (
    <div className={classes.containerMain}>
      <h1 className={classes.alignCenter}>Вход в Аккаунт</h1>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          id="username"
          name="username"
          label="Логин"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Пароль"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button onClick={() => dispatch(loginUser(formik.values))} className={classes.ButtonMargin} color="primary" variant="contained" fullWidth type="submit">
          Войти
        </Button>
      </form>
    </div>
  );
}

export default Login;