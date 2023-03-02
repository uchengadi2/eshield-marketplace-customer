import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonArrow from "./ButtonArrow";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

//import background from "./../../assets/background.jpg";
import background from "./../../assets/images/footage/footage_image.png";
import mobileBackground from "./../../assets/mobileBackground.jpg";
import history from "./../../history";
import BecomePartnerFormContainer from "../partner/BecomePartnerFormContainer";
import LogisticsPartner from "../LogisticsPartner";
import VendorPartner from "../VendorPartner";

const useStyles = makeStyles((theme) => ({
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    border: `2px solid ${theme.palette.common.blue}`,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  background: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "60em",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
  estimateButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 80,
    width: 270,
    backgroundColor: theme.palette.common.orange,
    fontSize: "1.3rem",
    marginRight: "5em",
    marginLeft: "2em",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  visitPartnerButtonsite: {
    ...theme.typography.partnerButton,
    fontSize: "0.9rem",
    height: 45,
    width: 250,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
  },
}));

export default function CallToAction(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [becomePartnerOpen, setBecomePartnerOpen] = useState(false);
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));

  const handleSuccessfulBecomeAPartnerOpenDialogBoxWithSnackbar = () => {
    props.handleSuccessfulBecomeAPartnerOpenDialogBoxWithSnackbar();
    setBecomePartnerOpen(false);
  };

  const handleFailedBecomeAPartnerOpenDialogBoxWithSnackbar = () => {
    props.handleFailedBecomeAPartnerOpenDialogBoxWithSnackbar();
  };
  return (
    <Grid
      container
      alignItems="center"
      className={classes.background}
      justifyContent={matchesSM ? "center" : "space-between"}
      direction={matchesSM ? "column" : "row"}
    >
      <Grid
        item
        style={{
          marginLeft: matchesSM ? 0 : "5em",
          textAlign: matchesSM ? "center" : "inherit",
        }}
      >
        <Grid container direction="column">
          <Grid item>
            {matchesMD ? (
              <Typography variant="h2">
                Simple Business-to-Business Marketplace <br /> Revolutionary
                Results
              </Typography>
            ) : (
              <Typography variant="h2" style={{ fontSize: "1.5rem" }}>
                Simple Business-to-Business Marketplace <br /> Revolutionary
                Results
              </Typography>
            )}
            {matchesMD ? (
              <Typography variant="subtitle2" style={{ fontSize: "1.5rem" }}>
                Take advantage of the 21st century
              </Typography>
            ) : (
              <Typography
                variant="subtitle2"
                style={{ fontSize: "1rem", marginTop: 20, marginBottom: 20 }}
              >
                Take advantage of the 21st century
              </Typography>
            )}

            {matchesMD ? (
              <Grid
                container
                justifyContent={matchesSM ? "center" : undefined}
                item
              >
                {/* <Button
                  // component={Link}
                  // to="/revolution"
                  variant="outlined"
                  className={classes.visitPartnerButtonsite}
                  onClick={(event) => {
                    event.preventDefault();
                    //  history.push(`/orders/completed`);
                    //window.open("http://localhost:3009/");
                    window.open("https://partners.eshieldafrica.com/");
                  }}
                >
                  <span style={{ marginRight: 10 }}>
                    Become a Courier Partner
                  </span>
                  <ButtonArrow
                    height={10}
                    width={10}
                    fill={theme.palette.common.orange}
                  />
                </Button> */}
                <Button
                  component={Link}
                  // to="/mobileapps"
                  to={`/logistics`}
                  variant="outlined"
                  className={classes.visitPartnerButtonsite}
                  onClick={() => <LogisticsPartner token={props.token} />}
                >
                  <span style={{ marginRight: 10 }}>
                    Become a Courier Partner
                  </span>
                  <ButtonArrow
                    height={10}
                    width={10}
                    fill={theme.palette.common.orange}
                  />
                </Button>
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Grid>

      {matchesMD ? (
        <Grid item>
          {/* <Button
            // component={Link}
            // to="/estimate"
            variant="contained"
            className={classes.estimateButton}
            // onClick={() => props.setValue(5)}
            //onClick={() => [setBecomePartnerOpen(true), history.push("/")]}
            onClick={(event) => {
              event.preventDefault();
              //  history.push(`/orders/completed`);
              //window.open("http://localhost:3009/");
              window.open("https://partners.eshieldafrica.com/");
            }}
          >
            Become a Vendor Partner
          </Button> */}
          <Button
            component={Link}
            // to="/mobileapps"
            to={`/vendors`}
            variant="outlined"
            className={classes.estimateButton}
            onClick={() => <VendorPartner token={props.token} />}
          >
            Become a Vendor Partner
          </Button>
        </Grid>
      ) : (
        <></>
      )}

      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={becomePartnerOpen}
        onClose={() => [setBecomePartnerOpen(false), history.push("/")]}
      >
        <DialogContent>
          <BecomePartnerFormContainer
            token={props.token}
            userId={props.userId}
            handleSuccessfulBecomeAPartnerOpenDialogBoxWithSnackbar={
              handleSuccessfulBecomeAPartnerOpenDialogBoxWithSnackbar
            }
            handleFailedBecomeAPartnerOpenDialogBoxWithSnackbar={
              handleFailedBecomeAPartnerOpenDialogBoxWithSnackbar
            }
          />
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
