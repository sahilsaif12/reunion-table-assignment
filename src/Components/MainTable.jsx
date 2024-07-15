import axios from 'axios'
import React, { useEffect, useState } from 'react'


  import {
    MRT_GlobalFilterTextField,
    MRT_TableContainer,
    useMaterialReactTable,
  } from 'material-react-table';
  
  import {
    Box,
    IconButton,
    Stack,
    Tooltip,
  } from '@mui/material';
  import Pagination from '@mui/material/Pagination';

  import Visibility from '@mui/icons-material/Visibility'
  import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';
  import MyDrawer from './Drawer.jsx';
  import FilterListIcon from '@mui/icons-material/FilterList';
  import LayersIcon from '@mui/icons-material/Layers';
  
import TableHook from '../Utils/TableHook.jsx';
import moment from 'moment/moment.js';


function MainTable() {
    const [items, setitems] = useState([])
    const [page, setPage] = useState(1)
    const { columns } = TableHook();
    const [openModal, setOpenModal] = useState(false);
  const [btnType, setBtnType] = useState()
  const [colHeaderGroup, setColHeaderGroup] = useState([])

    useEffect(() => {
      axios.get('https://file.notion.so/f/f/ca71608c-1cc3-4167-857a-24da97c78717/b041832a-ec40-47bb-b112-db9eeb72f678/sample-data.json?id=ce885cf5-d90e-46f3-ab62-c3609475cfb6&table=block&spaceId=ca71608c-1cc3-4167-857a-24da97c78717&expirationTimestamp=1721052000000&signature=cZ3w0ijE322sAa6n5OEAxONS6zD8imze7XMnw5BvyOo&downloadName=sample-data.json')
      .then(res=>{
        let data=res.data
        data.forEach((item)=>{
            item.createdAt=moment(item.createdAt).format('MMMM Do YYYY, h:mm a')
            item.updatedAt=moment(item.updatedAt).format('MMMM Do YYYY, h:mm a')
        });
        setitems(data);
          
      })
      .catch(err =>{
        console.log(err);
      })
    }, [])
    
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10, //customize the default page size
      });
      

    const table = useMaterialReactTable({
        columns,
        data:items,
        columnFilterDisplayMode: 'custom', //we will render our own filtering UI
    muiFilterTextFieldProps: ({ column }) => ({
      label: `Filter by ${column.columnDef.header}`,
    }),
        enableFacetedValues: true,
        enableColumnActions: false,
        enableBottomToolbar:true,
        enableGlobalFilterModes: true,
    enableColumnOrdering: true,
    groupedColumnMode:'reorder',
        enableColumnDragging: false,
        initialState: {
      showGlobalFilter: true, 
      enableGlobalFilterModes: true
        },

    enableGrouping:true,
        // sorting:['category'],
        grouping:colHeaderGroup,
        onPaginationChange: setPagination, //hoist pagination state to your state when it changes internally
        state: { pagination }, 
        
      });


      
  const handleShowHideCols=()=> {
    setBtnType('showHideColsBtn')
    setOpenModal(true);
    
  }
  const handlesortColsBtn = () => {
    setBtnType('sortColsBtn')
    setOpenModal(true);
  }
  const handleFliterCols = () => {
    setBtnType('filterColsBtn')
    setOpenModal(true);
  }
  const handleCreateGroups = () => {
    setBtnType('createGroupsBtn')
    setOpenModal(true);
  }

  const handleCloseModal=()=> {
    setOpenModal(false);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setPagination({
        pageIndex:  newPage-1,
        pageSize:10,
    })
  };


  return (
    <div>
        <Stack >
        <Box sx={{margin:"10px", display: 'flex', justifyContent: 'end', alignItems: 'center', gap: '8px', backgroundColor: 'white', padding: '10px' }}>
          <MRT_GlobalFilterTextField table={table} />  
          <Tooltip title="Hide/Show Columns">
          <IconButton onClick={handleShowHideCols} >
              <Visibility />
            </IconButton>
          </Tooltip>
          <Tooltip title="Sort Columns">
          <IconButton onClick={handlesortColsBtn} >
              <SwapVertRoundedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filter Columns">
          <IconButton onClick={handleFliterCols} >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Create Groups">
          <IconButton onClick={handleCreateGroups} >
              <LayersIcon />
            </IconButton>
          </Tooltip>
            
        </Box>
          <MRT_TableContainer sx={{borderRadius:"15px"}} table={table} />
          </Stack>
          <Stack spacing={2}   sx={{margin:"10px", display: 'flex', justifyContent: 'end', alignItems: 'center', gap: '8px', backgroundColor: 'white', padding: '10px' }}>
      <Pagination  count={(items.length)/10}       onChange={handleChangePage} variant="outlined" shape="rounded" />
    </Stack>

    <MyDrawer isOpen={openModal}  onClose={handleCloseModal} table={table} btnType={btnType} setColHeaderGroup={setColHeaderGroup}/>
    
    </div>
  )
}

export default MainTable