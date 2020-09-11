import React, { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";

import axios from "axios";
import {
  CircularProgress,
  Typography,
  Container,
  Switch,
  Card,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const color = [
  "rgba(255, 99, 132, 0.8)",
  "rgba(54, 162, 235, 0.8)",
  "rgba(255, 206, 86, 0.8)",
  "rgba(75, 192, 192, 0.8)",
  "rgba(153, 102, 255, 0.8)",
  "rgba(255, 159, 64, 0.8)",
  "rgba(255, 99, 132, 0.8)",
  "rgba(54, 162, 235, 0.8)",
  "rgba(255, 206, 86, 0.8)",
  "rgba(75, 192, 192, 0.8)",
  "rgba(153, 102, 255, 0.8)",
  "rgba(255, 159, 64, 0.8)",
  "rgba(255, 99, 132, 0.8)",
  "rgba(54, 162, 235, 0.8)",
  "rgba(255, 206, 86, 0.8)",
  "rgba(75, 192, 192, 0.8)",
  "rgba(153, 102, 255, 0.8)",
  "rgba(255, 159, 64, 0.8)",
  "rgba(255, 99, 132, 0.8)",
  "rgba(54, 162, 235, 0.8)",
  "rgba(255, 206, 86, 0.8)",
  "rgba(75, 192, 192, 0.8)",
  "rgba(153, 102, 255, 0.8)",
  "rgba(255, 159, 64, 0.8)",
  "rgba(255, 99, 132, 0.8)",
  "rgba(54, 162, 235, 0.8)",
  "rgba(255, 206, 86, 0.8)",
  "rgba(75, 192, 192, 0.8)",
  "rgba(153, 102, 255, 0.8)",
  "rgba(255, 159, 64, 0.8)",
  "rgba(255, 99, 132, 0.8)",
  "rgba(54, 162, 235, 0.8)",
  "rgba(255, 206, 86, 0.8)",
  "rgba(255, 99, 132, 0.8)",
  "rgba(54, 162, 235, 0.8)",
  "rgba(255, 206, 86, 0.8)",
  "rgba(75, 192, 192, 0.8)",
];
const theme = createMuiTheme();

theme.typography.h3 = {
  fontSize: "2rem",
};

const useStyles = makeStyles({
  loading: {
    margin: "auto",
    paddingTop: "15%",
    textAlign: "center",
    width: "50%",
  },
});

const Charts = () => {
  const dummy = null;
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState({
    switch1: true,
    switch2: true,
    switch3: true,
  });

  const [location, setLocation] = useState([]);
  const [totalConfirmed, setTotalConfirmed] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [discharged, setDischarged] = useState([]);
  const [time, setTime] = useState({});

  const fetchCases = () => {
    axios({
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
      url: "https://api.rootnet.in/covid19-in/stats/latest",
    })
      .then((response) => {
        setTimeout(() => setLoading(false), 1000);
        const labels = response.data.data.regional;
        setLocation(labels.map((label) => label.loc));
        setTotalConfirmed(labels.map((label) => label.totalConfirmed));
        setDischarged(labels.map((label) => label.discharged));
        setDeaths(labels.map((label) => label.deaths));
        setTime(response.data.lastRefreshed);
      })
      .catch(() => window.alert("Please check your internet connection"));
  };

  useEffect(() => {
    fetchCases();
  }, [dummy]);

  const handleSwitch = (event) => {
    if (event.currentTarget.id === "switch1") {
      setToggle({ ...toggle, switch1: !toggle.switch1 });
    } else if (event.currentTarget.id === "switch2") {
      setToggle({ ...toggle, switch1: !toggle.switch1 });
    } else if (event.currentTarget.id === "switch3") {
      setToggle({ ...toggle, switch3: !toggle.switch3 });
    }
  };

  const generateChart = (loc, data, title) => {
    return {
      data: {
        labels: loc,
        datasets: [
          {
            label: title,
            data: data,
            backgroundColor: color,
            borderColor: color,
            borderWidth: 2,
            hoverBorderWidth: 2,
            hoverBorderColor: "#000",
          },
        ],
      },
      width: 1152,
      height: 648,
      options: {
        legend: {
          display: true,
          position: "right",
        },
        maintainAspectRatio: false,
        responsive: false,
      },
    };
  };

  return (
    <div>
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress />
          <Typography variant="h6">Loading ...</Typography>
        </div>
      ) : (
        <Container>
          <Typography variant="h2" style={{ paddingBottom: "10px" }}>
            Graphical Representation of Data
          </Typography>

          <Typography style={{ paddingBottom: "30px" }}>
            Data last updated on {time} IST
          </Typography>

          <Card>
            <ThemeProvider theme={theme}>
              <Typography variant="h3" align="center">
                Total Confirmed Cases
              </Typography>
            </ThemeProvider>

            <div style={{ padding: "30px" }}>
              {toggle.switch1 ? (
                <Bar
                  {...generateChart(
                    location,
                    totalConfirmed,
                    "Confirmed Cases"
                  )}
                  data={totalConfirmed}
                />
              ) : (
                <Doughnut
                  {...generateChart(
                    location,
                    totalConfirmed,
                    "Confirmed Cases"
                  )}
                  data={totalConfirmed}
                />
              )}

              <FormGroup row>
                <FormControlLabel
                  control={<Switch onChange={handleSwitch} id="switch1" />}
                  label="Switch Graph Type"
                />
              </FormGroup>
            </div>
          </Card>

          <Card>
            <Typography variant="h3" align="center">
              Total Deaths
            </Typography>
            <div style={{ padding: "30px" }}>
              {toggle.switch2 ? (
                <Bar {...generateChart(location, deaths, "Deaths")} />
              ) : (
                <Doughnut {...generateChart(location, deaths, "Deaths")} />
              )}

              <FormGroup row>
                <FormControlLabel
                  control={<Switch onChange={handleSwitch} id="switch2" />}
                  label="Switch Graph type"
                />
              </FormGroup>
            </div>
          </Card>

          <Card>
            <typography
              variant="h3"
              align="center"
              style={{ paddingTop: "20px" }}
            >
              Total Discharged
            </typography>
            <div style={{ padding: "30px" }}>
              {toggle.switch3 ? (
                <Bar {...generateChart(location, discharged, "Discharged")} />
              ) : (
                <Doughnut
                  {...generateChart(location, discharged, "dicharged")}
                />
              )}

              <FormGroup row>
                <FormControlLabel
                  control={<Switch onChange={handleSwitch} id="switch3" />}
                  label="Switch Graph Type"
                />
              </FormGroup>
            </div>
          </Card>
        </Container>
      )}
    </div>
  );
};

export default Charts;
