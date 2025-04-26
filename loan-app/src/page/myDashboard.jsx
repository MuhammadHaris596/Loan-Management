import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';  
import 'bootstrap/dist/css/bootstrap.min.css';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import MovingIcon from '@mui/icons-material/Moving';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import { Button } from '@mui/material';
import { Row,Col } from 'react-bootstrap';
import { Link } from 'react-router';



export function MyDashoard() {

  
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
   
  return (
    <>
     <Box  component="main" sx={{ flexGrow: 1, p: 3,backgroundColor: '#f5f5f5 '  }}>
          
             <Box className=" bg-white p-4 mt-4 rounded-4" >
              <Typography variant='h4'> Welcome,{currentUser.firstName} {currentUser.lastName}!</Typography>
               <Typography className='mt-2'>Thankyou for using our platform, here's an overview of your account.</Typography>
             </Box>
    
    
          
     <Box className="mt-4">
          <Row className="g-4">
            <Col xs={12} sm={6} md={6} lg={3}>
              <Box className="bg-white rounded-4 shadow-sm p-3 h-100">
                <Box className="d-flex align-items-center gap-3 mb-3">
                  <Box
                    className="d-flex justify-content-center align-items-center rounded-circle"
                    sx={{
                      width: 50,
                      height: 50,
                      backgroundColor: '#e8f0fe',
                    }}
                  >
                    <CreditCardIcon color="primary" />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="textSecondary">
                      Active Loans  
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">0</Typography>
                  </Box>
                </Box>
    
    
    
    
                <Box className="d-flex justify-content-between">
                  <Typography variant="body2" color="textSecondary">
                    Status
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    Good Standing
                  </Typography>
                </Box>
              </Box>
            </Col>
    
    
            <Col xs={12} sm={6} md={6} lg={3}>
            <Box className="bg-white rounded-4 shadow-sm p-3 h-100">
              <Box className="d-flex  align-items-center gap-3 mb-3">
                <Box className="d-flex justify-content-center align-items-center rounded-circle" 
                sx={{width:50,height:50,backgroundColor:"#e8f0fe" }}>
                <MovingIcon style={{ color: 'green' }} />
                </Box>
                <Box>
                  <Typography variant='body-2' color='textSecondary'>Appproved Loans</Typography>
                  <Typography variant='h5' fontWeight="bold">0</Typography>
    
                </Box>
              </Box>
    
              <Box className="d-flex justify-content-between">
                <Typography variant='body-1' colro="textSecondary">Total Amount</Typography>
                <Typography variant='body-2' fontWeight="bold">$0.00</Typography>
              </Box>
            </Box>
            </Col>
    
            <Col xs={12} sm={6} md={6} lg={3}>
            <Box className="bg-white rounded-4 shadow-sm p-3 h-100">
              <Box className="d-flex  align-items-center gap-3 mb-3">
                <Box className="d-flex justify-content-center align-items-center rounded-circle" 
                sx={{width:50,height:50,backgroundColor:"#e8f0fe" }}>
                <AccessTimeIcon style={{ color: 'orange' }}/>
                </Box>
                <Box>
                  <Typography variant='body-2' color='textSecondary'>Pending Request</Typography>
                  <Typography variant='h5' fontWeight="bold">0</Typography>
    
                </Box>
              </Box>
    
              <Box className="d-flex justify-content-between">
                <Typography variant='body-1' colro="textSecondary">Last Request</Typography>
                <Typography variant='body-2' fontWeight="bold">N/A</Typography>
              </Box>
            </Box>
            </Col>
    
            <Col xs={12} sm={6} md={6} lg={3}>
            <Box className="bg-white rounded-4 shadow-sm p-3 h-100">
              <Box className="d-flex  align-items-center gap-3 mb-3">
                <Box className="d-flex justify-content-center align-items-center rounded-circle" 
                sx={{width:50,height:50,backgroundColor:"#e8f0fe" }}>
                <GroupIcon   style={{ color: 'purple' }}/>
                </Box>
                <Box>
                  <Typography variant='body-2' color='textSecondary'>References</Typography>
                  <Typography variant='h5' fontWeight="bold">0</Typography>
    
                </Box>
              </Box>
    
              <Box className="d-flex justify-content-between">
                <Typography variant='body-1' colro="textSecondary">Status</Typography>
                <Typography variant='body-2' fontWeight="bold">Not Verified</Typography>
              </Box>
            </Box>
            </Col>
          </Row>
        </Box>  
    
    
    
        <Box className="mt-4">
         <Typography  className='ms-3' variant='h5'> Recent Activity</Typography>
    
          <Box className="mt-2 bg-white">
            <Box className="d-flex flex-column justify-content-center align-items-center text-center gap-3 p-5">
           <Typography color='textSecondary' variant='body-1'>No Recent Activity to display</Typography>
           <Button  component={Link} to="/dashboard/LoanApplication" color="primary" variant="contained"> Apply for a new loan</Button>
      
    
            </Box>
          </Box>
        </Box>
        
          </Box>
   
    </>
  );
}

