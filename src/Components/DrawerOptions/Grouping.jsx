import { Button, FormControl, InputLabel, MenuItem, NativeSelect, Select, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';

const Grouping = ({ table, setColHeaderGroup }) => {
  const [colHeaderName, setColHeaderName] = useState([]);

  const handleChange = (event) => {

    setColHeaderName(event.target.value);
  };

  const handleClearGrouping = () => {
    // setColHeaderGroup(colHeaderName)
    table.resetGrouping()
  }
  
  return (
    <>
      <FormControl fullWidth>
      <span  >Select Grouping Parameters</span>
        <Select
        sx={{marginTop:"10px"}}
          labelId="demo-simple-select-label"
          placeholder='dkkd'
          value={colHeaderName }
          onChange={handleChange}
          multiple={true}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            headerGroup.headers.filter((header) => header.id === 'category' || header.id === 'subcategory')
            .map((header) => (
              <MenuItem  onClick={header.column.getToggleGroupingHandler()} key={header.id} value={header.id}>
              {header.id}
              </MenuItem>
            ))
          ))}
          {/* <MenuItem value={'category'}>Category</MenuItem>
          <MenuItem value={'subcategory'}>Subcategory</MenuItem> */}
        </Select>
      </FormControl>

      <Stack paddingTop={12}>
        <Button sx={{ height: '45px' }} variant="outlined"
          onClick={handleClearGrouping}
        >Clear Grouping</Button>
      </Stack>
      
    </>
  );
};

export default Grouping;