import React from 'react'
import "./carStatistic.css"
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils  from '@date-io/date-fns';
import Button from '@mui/material/Button';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import { Link } from 'react-router-dom';


const columns = [
    { id: 'stt', label: 'STT', minWidth: 170 },
    { id: 'carName', label: 'Tên xe', minWidth: 170 },
    { id: 'carId', label: 'ID xe', minWidth: 170 },
    {
      id: 'doanhThu',
      label: 'Doanh thu',
      minWidth: 170
    },
    { id: 'action', label: 'Action', minWidth: 170 }
  ];
  
  function createData(stt, carName, carId, doanhThu) {
    return {stt, carName, carId, doanhThu};
  }
  
 
  

function CarStatistic() {

    let [page, setPage] = React.useState(0);
    let [rowsPerPage, setRowsPerPage] = React.useState(10);
    let [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
    let [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
    const [search, setSearch] = React.useState(false);
    const [rows, setRows] = React.useState([]);
  
    React.useEffect(async () => {
        if (search){
            let startDate = formatStartDate();
            let endDate = formatEndDate();
            fetch(`http://localhost:8080/api/v1/cars/statistic?startDate=${startDate}&endDate=${endDate}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .then(resJson => {
                let newData = resJson.map((item, id) => createData(id + 1, item.carName, item.carId, item.doanhthu));
                setRows(newData);
            });
            setSearch(false);
        }
    }, [search]);

    const formatStartDate = () => {
        const startDate = selectedStartDate.getDate() < 10 ? '0' + selectedStartDate.getDate() : selectedStartDate.getDate();
        const startYear = selectedStartDate.getFullYear();
        const startMonth = selectedStartDate.getMonth() + 1 < 10 ? '0' + (selectedStartDate.getMonth() + 1) : selectedStartDate.getMonth() + 1;
        return `${startYear}-${startMonth}-${startDate}`;
    }

    const formatEndDate = () => {
        const startDate = selectedEndDate.getDate() < 10 ? '0' + selectedEndDate.getDate() : selectedEndDate.getDate();
        const startYear = selectedEndDate.getFullYear();
        const startMonth = selectedEndDate.getMonth() + 1 < 10 ? '0' + (selectedEndDate.getMonth() + 1) : selectedEndDate.getMonth() + 1;
        return `${startYear}-${startMonth}-${startDate}`;
    }

    const handleStartDateChange = (date) => {
        setSelectedStartDate(date);
    }

    const handleEndDateChange = (date) => {
        setSelectedEndDate(date);
    }
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };  

    const handleSearching = (event) => {
        setSearch(true);
    }
        
    return (
        <div className='carStatistic'>
            <div className="datePicker">
                <div className="startDatePicker">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify='space-around'>
                            <KeyboardDatePicker
                                disableToolbar
                                variant='inline'
                                format='yyyy-MM-dd'
                                margin='normal'
                                id='startDatePicker'
                                label='Start Date'
                                value={selectedStartDate}
                                onChange={handleStartDateChange}
                                KeyboardButtonProps={{
                                    'arial-label': 'change date',
                                }}
                            />  
                        </Grid>
                    </MuiPickersUtilsProvider>
                </div>
                <div className="endDatePicker">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify='space-around'>
                            <KeyboardDatePicker
                                disableToolbar
                                variant='inline'
                                format='yyyy-MM-dd'
                                margin='normal'
                                id='endDatePicker'
                                label='End Date'
                                value={selectedEndDate}
                                onChange={handleEndDateChange}
                                KeyboardButtonProps={{
                                    'arial-label': 'change date',
                                }}
                            />  
                        </Grid>
                    </MuiPickersUtilsProvider>
                </div>
                <div className="btnSearch">
                    <Button onClick={handleSearching}>Search</Button>
                </div>
            </div>
            <div className="table">
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 600 }}>
                        <Table stickyHeader aria-label="sticky table" >
                        <TableHead>
                            <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                                >
                                {column.label}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                                        {columns.map((column) => {
                                            if (column.id == 'action'){
                                                return (
                                                    <TableCell>
                                                        {<Link to={`statistic/bills/car_id=${row.carId}&start_date=${formatStartDate()}&end_date=${formatEndDate()}`}>Xem danh sách hóa đơn</Link>}
                                                    </TableCell>
                                                )
                                            } else {
                                                const value = row[column.id];
                                                return (    
                                                        <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                        </TableCell>                                      
                                                );
                                            }
                                        })}
                                    </TableRow>
                                
                                );
                            })}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </div>
    )
}

export default CarStatistic