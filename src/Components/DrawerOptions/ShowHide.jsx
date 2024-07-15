import React, { useState } from 'react';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Switch,
} from '@mui/material';


const ShowHide = ({ table }) => {
  // const {table} = useMaterialTableHook();
//   const [isColumnVisible, setIsColumnVisible] = useState(true)
//   const [pendingHiddenColumns, setPendingHiddenColumns] = useState([]);

//   const handleToggleColumnVisibility = (columnId) => {
//     if (pendingHiddenColumns.includes(columnId)) {
//       setPendingHiddenColumns(pendingHiddenColumns.filter((id) => id !== columnId));
//     } else {
//       setPendingHiddenColumns([...pendingHiddenColumns, columnId]);
//     }
//   };

  return (
    <>
      {table.getAllLeafColumns().map((column) => {
        return (
          <Stack key={column.id}>
            <List sx={{ border: '1px solid #d9d9d9', margin: '2px' }}>
              <ListItem sx={{ height: '30px' }}>
                <ListItemText primary={column.id} />
                <Switch
                  edge='end'
                  checked={column.getIsVisible()}
                  onChange={column.getToggleVisibilityHandler()}
                  aria-label="Column ON/OFF"
                />
              </ListItem>
            </List>
          </Stack>

        )
      })}

      <Stack spacing={1} paddingTop={1}  >

        <Button sx={{ height: '45px' }} variant="outlined"
          onClick={table.getToggleAllColumnsVisibilityHandler()}
        >{table.getIsAllColumnsVisible()?"Hide":"Show"} all column</Button>

        <Button sx={{ height: '45px' }} variant="contained"
        >Apply</Button>
      </Stack>

    </>
  );
};

export default ShowHide;