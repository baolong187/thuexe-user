import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import './billList.css';

const columns = [
    { id: 'stt', label: 'STT', minWidth: 140 },
    { id: 'billId', label: 'Mã hóa đơn', minWidth: 140 },
    { id: 'carId', label: 'ID xe', minWidth: 140 },
    { id: 'employeeName', label: 'Người tạo đơn', minWidth: 140 },
    { id: 'customerName', label: 'Khách hàng', minWidth: 140 },
    {id: 'createdAt', label: 'Tạo lúc', minWidth: 140},
    { id: 'action', label: 'Action', minWidth: 140 }
  ];
  
function createData(stt, billId, carId, employeeName, customerName, createdAt) {
    console.log(employeeName);
    console.log(customerName);
    return {stt, billId, carId, employeeName, customerName, createdAt};
}

function  BillList() {

    let [page, setPage] = React.useState(0);
    let [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);
    
    React.useEffect(() => {
        fetch("http://localhost:8080/api/v1/bills/confirm", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            setRows(data.map((item, index) => createData(index + 1, item.id, item.car.id, item.employee.fullName, item.customer.fullName, item.createAt)));
        });
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

  return (    
    <div className="billList">
        <div className="title">Danh sách hóa đơn chờ duyệt</div>
        <div className="billListContent">
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
                                                    {<Link to={`/admin/bills/confirm/${row.billId}`} >Chi tiết</Link>}
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

export default  BillList