import  React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {useParams} from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './confirmBill.css';


function formatPrice(price){
    return price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}


function ConfirmBill() {

    const [data, setData] = React.useState([]);
    const [fetched, setFetched] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = React.useState("Xác nhận");
    const [status, setStatus] = React.useState("");


    const handleClickConfirm = () => {
        setAlert("Xác nhận đơn thành công");
        setStatus("Confirmed");
        setOpen(true);
    };

    const handleClickCancel = () => {
        setAlert("Hủy đơn thành công");
        setStatus("Cancel");
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const bill_id = useParams().id;

    React.useEffect(() => {

        fetch(`http://localhost:8080/api/v1/bills/bill_id?id=${bill_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
            setData(result);
            setFetched(true);
           
        });

        if (open){
            fetch("http://localhost:8080/api/v1/bills/confirm", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: bill_id,
                    status: status
                })
            })
        }

    }, [open]);

  
    const Body = (data) => {
        return (
            <div className="bill">
                <div className="alert">
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Thông báo"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {alert}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>OK</Button>
                    </DialogActions>
                </Dialog>
                </div>
                <div className="billInfo">
                    <Card sx={{ maxWidth: 600 }}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="180"
                            image={data.car.image}
                            alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Hóa đơn thuê xe {data.car.name} - {data.car.licensePlate}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Ngày tạo đơn: {data.startDate}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Trạng thái xác nhận: {data.confirmStatus}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Trạng thái thanh toán: {data.paymentStatus}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Ngày mượn xe: {data.startDate}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Ngày trả xe: {data.endDate}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Số chỗ ngồi: {data.car.seatNumber}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Màu xe: {data.car.color}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Khách thuê xe: {data.customer.fullName}
                                </Typography>    
                                <Typography variant="body1" color="text.secondary">
                                    Địa chỉ:  {data.customer.address}
                                </Typography> 
                                <Typography variant="body1" color="text.secondary">
                                    Số điện thoại:  {data.customer.telephone}
                                </Typography> 
                                <Typography variant="body1" color="red">
                                    Tổng số tiền: {formatPrice(data.totalPrice)}
                                </Typography>
                            
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
                <br/>
                <div className="buttons">
                    <Button onClick={handleClickConfirm} className="button" variant="contained" color="success">
                        Xác nhận
                    </Button>
                    <Button onClick={handleClickCancel} className="button" variant="contained" color="error">
                        Hủy đơn
                    </Button>
                </div>
            </div>
        
        )
    }

    const EmptyBody = () => {
        return (
            <div></div>
        )
    }

    return (<div className='confirmBill'>
        {(fetched === true) ? Body(data) : EmptyBody()}
    </div>);
    
}

export default ConfirmBill
