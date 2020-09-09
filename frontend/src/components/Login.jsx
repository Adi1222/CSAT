import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  makeStyles,
  Paper,
  TextField,
  Grid,
  Button,
  IconButton,
} from "@material-ui/core";
import { Twitter } from "@material-ui/icons";

// local imports
import { getCookie } from "./Cookie";

const useStyles = makeStyles((theme) => ({
  cont: {
    paddingTop: "13%",
    paddingBottom: "13%",
  },
  welcome: {
    fontSize: "31px",
    // paddingBottom: '15%'
  },
  heading: {
    paddingTop: "10px",
  },
}));

const Login = () => {
  const classes = useStyles();
  const dummy = null;
  const history = useHistory(); // creating object

  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.currentTarget.id]: event.currentTarget.value,
    });

    if (event.currentTarget.id === "email") {
      setEmailError(
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
          event.currentTarget.value
        )
      );
    }

    if (event.currentTarget.id === "password") {
      setPasswordError(event.target.value === "");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!emailError && !passwordError) {
      axios({
        method: "post",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        data: {
          email: values.email,
          password: values.password,
        },
        url: "/api/login/",
      })
        .then((response) => {
          let now = new Date();
          now.setTime(now.getTime() + 180 * 60 * 1000); // 180 minutes
          let expiration = `expires ${now.toUTCString()}`;
          document.cookie = `usertoken=${response.data.token}; expires=${expiration} ; path=/`;
          setLoginError(false);
          history.push("/dashboard");
        })
        .catch(() => {
          setLoginError(true);
        });
    }
  };

  useEffect(() => {
    let token = getCookie("usertoken");
    if (token !== "" && token !== undefined) {
      history.push("/dashboard");
    }
  }, [dummy, history]);

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.cont}>
        <Typography className={classes.welcome}>Login!</Typography>
        <Paper elevation={5}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={emailError}
                  variant="outlined"
                  margin="normal"
                  id="email"
                  label="email"
                  type="email"
                  autoComplete="Email"
                  onChange={handleChange}
                  helperText={
                    emailError
                      ? values.email.length
                        ? "Invalid Email Address"
                        : "This is a required field!"
                      : null
                  }
                  fullWidth
                  required
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={passwordError}
                  variant="outlined"
                  margin="normal"
                  label="Password"
                  id="password"
                  onChange={handleChange}
                  type={values.showPassword ? "text" : "password"}
                  helperText={passwordError ? "This is requied field" : null}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
            <Link to="/signup" variant="body2">
              {"Don't have an account? Sign up"}
            </Link>
          </form>
        </Paper>
      </div>
    </Container>
  );
};

export default Login;
