import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import history from "../../history";
import { SIGN_OUT } from "./../../actions/types";

const useStyles = makeStyles((theme) => ({}));

function UserLogOut(props) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(props.token);
  }, [props.token]);

  //delete the token
  const handleTheTokenItem = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    props.setToken({});
    props.setUserId({});

    dispatch({
      type: SIGN_OUT,
      //payload: response.data.data.data,
    });
  };

  const renderLogoutAlert = () => {
    return (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="subtitle1">
            Are your sure you want to logout?
          </Typography>
        </Grid>
        <Grid item style={{ marginTop: 15 }}>
          <Button
            variant="contained"
            color="primary"
            style={{ color: "white" }}
            onClick={() => [
              handleTheTokenItem(),
              props.handleLogOutDialogOpenStatus(),
              history.push("/"),
            ]}
          >
            Yes
          </Button>
        </Grid>
      </Grid>
    );
  };

  return <Box>{renderLogoutAlert()}</Box>;
}

export default UserLogOut;
