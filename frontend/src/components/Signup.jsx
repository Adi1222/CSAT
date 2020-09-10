import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import {
  Grid,
  Container,
  makeStyles,
  Typography,
  Paper,
  TextField,
  FormControlLabel,
  Button,
  Checkbox,
  IconButton,
} from "@material-ui/core";
import { Twitter } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
  cont: {
    paddingTop: "15%",
    paddingBottom: "10%",
  },
  twitter: {
    color: "#1dadf2",
  },
  welcome: {
    fontSize: "36px",
  },
  heading: {
    paddingTop: "10px",
  },
  signup: {
    paddingTop: "10px",
  },
  form: {
    padding: "0px 20px 10px",
  },
  link: {
    color: theme.palette.primary.main,
  },
  grid: {
    paddingTop: "10px",
  },
}));

const Signup = () => {
  const classes = useStyles();
  const history = useHistory();
  const dummy = null;

  const [values, setValues] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirm: "",
    city: "",
    state: "",
    twitter: false,
    showPassword: false,
  });

  const [fnameerror, setFNameError] = useState(false);
  const [lnameerror, setLNameError] = useState(false);
  const [emailerror, setEmailError] = useState(false);
  const [passworderror, setPasswordError] = useState(false);
  const [confirmerror, setConfirmError] = useState(false);
  const [cityerror, setCityError] = useState(false);
  const [stateerror, setStateError] = useState(false);
  const [signuperror, setSignupError] = useState(false);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.id]: event.target.value });

    setSignupError(false);

    // now check for the errors
    if (event.currentTarget.id === "fname") {
      setFNameError(event.target.value === "");
    }

    if (event.currentTarget.id === "lname") {
      setLNameError(event.target.value === "");
    }

    if (event.currentTarget.id === "email") {
      setEmailError(
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
          event.currentTarget.value
        )
      );
    }

    if (event.currentTarget.id === "password") {
      var strongRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      );
      setPasswordError(!strongRegex.test(event.target.value));
    }

    if (event.currentTarget.id === "confirm") {
      setConfirmError(values.password !== event.target.value);
    }

    if (event.currentTarget.id === "city") {
      setCityError(event.target.value === "");
    }

    if (event.currentTarget.id === "state") {
      setStateError(event.target.value === "");
    }

    if (event.currentTarget.id === "twitter") {
      setValues({ ...values, twitter: !values.twitter });
      console.log(values.twitter);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !emailerror &&
      !passworderror &&
      !confirmerror &&
      !fnameerror &&
      !lnameerror &&
      !cityerror &&
      !stateerror
    ) {
      axios({
        method: "post",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        data: {
          first_name: values.fname,
          last_name: values.lname,
          email: values.email,
          password: values.password,
          city: values.city,
          state: values.state,
          twitter: values.twitter,
        },
        url: "/api/register/",
      })
        .then((response) => {
          let now = new Date();
          now.setTime(now.getTime() + 180 * 60 * 1000); // 180 minutes
          let expiration = `expires ${now.toUTCString()}`;
          document.cookie = `usertoken=${response.data.token};expires=${expiration} ;path=/`;
          setSignupError(false);
          history.push("/dashboard");
        })
        .catch(() => {
          setSignupError(true);
        });
    }
  };

  useEffect(() => {
    let token = document.cookie.split("=")[1]; // we got the token value
    if (token !== "" && token !== undefined) {
      history.push("/dashboard");
    }
  }, [dummy, history]);

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.cont}>
        <Twitter className={classes.twitter} />
        <Typography className={classes.welcome}>SIGN UP!</Typography>
        <Paper className={classes.paper} elevation={5}>
          <div class={classes.heading}></div>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={fnameerror}
                  variant="outlined"
                  margin="normal"
                  id="fname"
                  label="First Name"
                  type="text"
                  autoComple="First Name"
                  onChange={handleChange}
                  helperText={fnameerror ? "This is required field" : null}
                  autoFocus
                  requied
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  error={lnameerror}
                  variant="outlined"
                  margin="normal"
                  id="lname"
                  label="Last Name"
                  type="text"
                  autoComple="Last Name"
                  onChange={handleChange}
                  helperText={lnameerror ? "This is required field" : null}
                  autoFocus
                  requied
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  error={emailerror || signuperror}
                  variant="outlined"
                  id="email"
                  label="Email Address"
                  onChange={handleChange}
                  helperText={
                    emailerror
                      ? values.email.length
                        ? "Invalid Email ID"
                        : "Email Address required "
                      : null
                  }
                  autoFocus
                  requied
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  id="password"
                  label="Password"
                  error={passworderror}
                  onChange={handleChange}
                  helperText={
                    passworderror
                      ? values.password.length
                        ? "Password must have atleast 8 characters with 1 small letter, capital letter, number and symbol"
                        : "Password is required "
                      : null
                  }
                  autoFocus
                  requied
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  id="confirm"
                  label="Confirm Password"
                  error={confirmerror}
                  onChange={handleChange}
                  helperText={
                    confirmerror
                      ? values.confirm.length
                        ? "Passwords do not match"
                        : "Confirm password is required"
                      : null
                  }
                  requied
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={5}>
                <TextField
                  error={cityerror}
                  variant="outlined"
                  margin="normal"
                  id="city"
                  label="Enter city name"
                  type="text"
                  onChange={handleChange}
                  helperText={cityerror ? "This is required field" : null}
                  autoFocus
                  requied
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={7}>
                <TextField
                  error={stateerror}
                  variant="outlined"
                  margin="normal"
                  id="state"
                  label="Enter state name"
                  type="text"
                  onChange={handleChange}
                  helperText={stateerror ? "This is required field" : null}
                  autoFocus
                  requied
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  onClick={handleChange}
                  control={<Checkbox name="twitter" color="primary" />}
                  label="I have a twitter account"
                  id="twitter"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container className={classes.grid}>
              <Grid item className={classes.grid}>
                <Link to="/">Already have an account? Log in</Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    </Container>
  );
};



export default Signup;
