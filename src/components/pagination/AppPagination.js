import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "flxed",
    bottom: 0,
    zIndex: 200,
    backgroundColor: "#FFF6BF",
    padding: "10px 80px",
    color: "white",
    width: "100%",
  },
  rootMobile: {
    position: "flxed",
    bottom: 0,
    zIndex: 200,
    backgroundColor: "#FFF6BF",
    padding: "10px 80px",
    color: "white",
    width: "100%",
  },

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    width: 1400,
  },
  containerMobile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    width: 400,
  },
}));

function AppPagination({ setPage, page, pageNumber }) {
  const classes = useStyles();
  const theme = useTheme();

  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMDUp = useMediaQuery(theme.breakpoints.up("md"));

  const handleChange = (e, value) => {
    setPage(value);
    window.scroll(0, 0);
  };

  return (
    <>
      {matchesMDUp ? (
        <div className={classes.container}>
          <div className={classes.root}>
            <Pagination
              //   onChange={(e) => handleChange(e.target.textContent)}
              onChange={handleChange}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
              //   hidePrevButton
              //   hideNextButton
              variant="outlined"
              count={pageNumber}
              page={page}
            />
          </div>
        </div>
      ) : (
        <div className={classes.containerMobile}>
          <div className={classes.rootMobile}>
            <Pagination
              //   onChange={(e) => handleChange(e.target.textContent)}
              onChange={handleChange}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
              //   hidePrevButton
              //   hideNextButton
              variant="outlined"
              count={pageNumber}
              page={page}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default AppPagination;
