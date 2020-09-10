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
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {} from "@material-ui/icons";
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
};
