import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Paper,
  Grid,
  Typography,
  Button,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange,
} from "@material-ui/core/colors";

//const theme = createMuiTheme();

const useStyles = makeStyles({});

const Dashboard = () => {
  const classes = useStyles();

  const dummy = null;
  const [data, setData] = useState([]);
  const [latest, setLatest] = useState({});
  const [time, setTime] = useState({});
  const [loading, setLoading] = useState(true);

  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];

  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });

  const fetchData = () => {
    axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      url: "https://api.rootnet.in/covid19-in/stats/latest",
    })
      .then((response) => {
        setTimeout(() => setLoading(false), 3000);
        setLatest(response.data.data.summary);
        setData(response.data.data.regional);
        setTime(response.data.lastRefreshed);
      })
      .catch(() => window.alert("Please Check you internet connection!"));
  };

  useEffect(() => {
    fetchData();
  }, [dummy]);

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Switch checked={darkState} onChange={handleThemeChange} />
      <div>
        {loading ? (
          <div>
            <Typography>Loading</Typography>
          </div>
        ) : (
          <div>
            <Typography>Summary</Typography>
            <Typography>
              Cases last updated on {time.slice(0, 10)} at {time.slice(11, 19)}{" "}
              IST
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3}>
                  <Typography>{latest.total}</Typography>
                  <Typography>Confirmed Cases</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3}>
                  <Typography>{latest.confirmedCasesIndian}</Typography>
                  <Typography>Confirmed Cases Indian</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3}>
                  <Typography>{latest.confirmedCasesForeign}</Typography>
                  <Typography>Confirmed Cases Foreign</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3}>
                  <Typography>{latest.discharged}</Typography>
                  <Typography>Discharged</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3}>
                  <Typography>{latest.deaths}</Typography>
                  <Typography>Deaths</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3}>
                  <Typography>
                    {latest.confirmedButLocationUnidentified}
                  </Typography>
                  <Typography>Confirmed Cases Uniidentified</Typography>
                </Paper>
              </Grid>
            </Grid>

            <Typography variant="h2">
              State Wise COVID-19 Data In India
            </Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Serial Number</TableCell>
                    <TableCell align="center">Location</TableCell>
                    <TableCell align="center">Total Confirmed Cases</TableCell>
                    <TableCell align="center">Confirmed Cases Indian</TableCell>
                    <TableCell align="center">
                      Confirmed Cases Foreign
                    </TableCell>
                    <TableCell align="center">Discharged</TableCell>
                    <TableCell align="center">Deaths</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{row.loc}</TableCell>
                        <TableCell align="center">
                          {row.confirmedCasesIndian}
                        </TableCell>
                        <TableCell align="center">
                          {row.confirmedCasesForeign}
                        </TableCell>
                        <TableCell align="center">
                          {row.totalConfirmed}
                        </TableCell>
                        <TableCell align="center">{row.discharged}</TableCell>
                        <TableCell align="center">{row.deaths}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
