import React from 'react'

import {
    MRT_TableHeadCellFilterContainer,
  } from 'material-react-table';
  import { Stack } from '@mui/material';

  
function Filter({table}) {
  return (
    <div>
    <Stack p="8px" gap="8px">
          {table.getLeafHeaders().map((header) => (
            <MRT_TableHeadCellFilterContainer
              key={header.id}
              
              header={header}
              table={table}
              in
            />
          ))}
        </Stack>
    </div>
  )
}

export default Filter