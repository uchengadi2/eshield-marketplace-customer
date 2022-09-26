import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@material-ui/core/Box";

// const rows = [
//   { id: 1, name: "Hello", title: "World" },
//   { id: 2, name: "DataGridPro", title: "is Awesome" },
//   { id: 3, name: "Material-UI", title: "is Amazing" },
// ];

// const columns = [
//   { field: "name", headerName: "Name", width: 150 },
//   { field: "title", headerName: "Title", width: 150 },
// ];

export default function DataGridContainer({ rows, columns }) {
  return (
    <Box style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection={true}
        disableColumnMenu={true}
        hideFooter={true}
        components={{
          Toolbar: GridToolbar,
        }}
        disableSelectionOnClick
        onCellDoubleClick={() =>
          console.log("just double clicked this cell now")
        }
      />
    </Box>
  );
}
