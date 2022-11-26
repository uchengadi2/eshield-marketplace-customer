import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles, useTheme } from "@material-ui/core/styles";

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

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    width: 1400,
  },
}));

function AppPagination({ setPage, page, pageNumber }) {
  const classes = useStyles();
  const theme = useTheme();

  const handleChange = (e, value) => {
    setPage(value);
    window.scroll(0, 0);
  };

  return (
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
  );
}

export default AppPagination;
