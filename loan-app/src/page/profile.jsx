import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';  
import {TableContainer,Table,TableHead ,TableBody ,TableRow,TablePagination,TableCell} from '@mui/material';

export function Profile(){

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return(
        <Box  component="main" sx={{ flexGrow: 1, p: 3,backgroundColor: '#f5f5f5 '  }}>

                <Box style={{backgroundColor: '#edf7f6'}} className="mt-5  p-5  rounded-3">
                  <Box className="d-flex flex-column gap-2 p-3">
                    <Typography fontWeight="bold" variant='h5'>Customer Profile </Typography>
                    <Typography color='textSecondary' variant='body1'>Personal details and information. </Typography>

                  </Box>

                        <Box >
                   <TableContainer >
                    <Table>
                        <TableBody sx={{ '& .MuiTableCell-root': { borderBottom: 'none' }}}>
                            <TableRow className='bg-white'>
                                <TableCell>Full Name</TableCell>
                                <TableCell>{currentUser.firstName} {currentUser.lastName}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Email Address</TableCell>
                                <TableCell>{currentUser.Email} </TableCell>
                            </TableRow>

                            <TableRow className='bg-white'>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>{currentUser.phoneNumber}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Account Created</TableCell>
                                <TableCell>{new Date(currentUser.createdAt).toLocaleDateString()}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer> 
                    </Box>
                 
                </Box>
             
            </Box>
    )
}