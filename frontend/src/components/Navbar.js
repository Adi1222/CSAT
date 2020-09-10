import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Drawer,
  AppBar,
  Toolbar,
  Menu,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  CssBaseline,
  IconButton,
  Button,
  Typography,
  List,
  Checkbox,
  TextField,
  Hidden,
  Divider,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {} from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { getCookie } from "./Cookie";

const useStyles = makeStyles((theme) => ({}));

const Navbar = () => {
  const classes = useStyles();
  const dummy = null;
  const theme = useTheme();
  const history = useHistory();

  const [open, setOpen] = useState(false); // this one is for drawer
  const [dialog, setDialog] = useState(false); // dialog is like alert window
  const [data, setData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    city: "",
    state: "",
    twitter: false,
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    document.cookie = "usertoken=; path=/;";
    history.push("/");
  };

  const handleDialog = () => {
    setDialog(!dialog);
  };

  const handleChange = (event) => {
    let id = event.currentTarget.id;

    if (id === "first_name") {
      setData({ ...data, first_name: event.target.value });
    } else if (id === "last_name") {
      setData({ ...data, last_name: event.target.value });
    } else if (id === "city") {
      setData({ ...data, city: event.target.value });
    } else if (id === "state") {
      setData({ ...data, state: event.target.value });
    } else {
      setData({ ...data, twitter: !data.twitter });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefalt();

    let cookie = getCookie("usertoken");

    axios({
      method: "patch",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/jsob",
        Authorization: `Bearer ${cookie}`,
      },
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        city: data.city,
        state: data.state,
        twitter: data.twitter,
      },
      url: "/api/edit/",
    })
      .then(() => {
        setDialog(false);
        window.alert("Profile details updated successfully");
      })
      .catch(() => {
        window.alert("Could not update data");
      });
  };

  const getCookie = (name) => {
    let dc = document.cookie;
    let prefix = name + "=";
  };

  const fetchProfile = () => {
    let cookie = getCookie("usertoken");

    axios({
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
      url: "api/profile/",
    })
      .then((response) => {
        let object = response.data.data[0];
        setData({
          email: object.email,
          first_name: object.first_name,
          last_name: object.last_name,
          city: object.city,
          state: object.state,
          twitter: object.twitter,
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchProfile();
  }, [dummy]);

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Welcome to your Dashboard!</Typography>
          <Hidden mdDown>
            <Button style={{ color: "#fff" }} onClick={handleDialog}>
              Edit Profile
            </Button>
            <Button
              style={{ color: "#fff" }}
              onClick={() => history.push("/dashboard")}
            >
              Dashboard
            </Button>
            <Button
              style={{ color: "#fff" }}
              onClick={() => history.push("/dashboard/charts")}
            >
              Charts
            </Button>
            <Button style={{ color: "#fff" }} onClick={handleLogout}>
              Logout
            </Button>
          </Hidden>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          <Divider />

          <div>
            {data.first_name.charAt(0)}
            {data.last_name.charAt(0)}
          </div>

          <Divider />

          <p>
            {data.first_name} {data.last_name}
          </p>
          <p>
            {data.email} | {data.city}, {data.state}
          </p>

          <Button variant="contained" onClick={handleDialog}>
            Edit Profile
          </Button>

          <Divider />

          <Dialog open={dialog} onClose={handleDialog}>
            <DialogTitle id="form-dialog-title">Edit Your Profile </DialogTitle>
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <TextField
                  variant="outlined"
                  onChange={handleChange}
                  id="first_name"
                  label="First Name"
                  type="text"
                  value={data.first_name}
                />
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
