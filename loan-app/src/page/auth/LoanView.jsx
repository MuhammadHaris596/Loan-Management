import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';  
import { Button } from '@mui/material';
import {TableContainer,Table,TableHead ,TableBody ,TableRow,TablePagination,TableCell} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Pagination, Stack } from '@mui/material';
import { useState ,useEffect} from 'react';
import { Link } from 'react-router';
import { supabase } from '../../utils/config';
import { LanOutlined } from '@mui/icons-material';



export function LoanView(){
    

    useEffect(() => {
        loadData();
      }, []);

    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const[myLoan,setMyLoan] = useState([])
   
   
    async function loadData(){


   
    try{


        let userLoan= []
       const { data ,error } = await supabase
      .from("LoanRequest")
      .select();

      if(error)throw error

      if(data){
        console.log("All data:", data);

        userLoan = data.filter((item) => {
        // console.log("Matching:", item.id, currentUser.userId);
        return  item.id === currentUser.userId
      });
       

      console.log(userLoan)
      
      }
     
      if(userLoan){
        setMyLoan(userLoan);
        
      }

      console.log(myLoan)
      console.log(userLoan)


    //   myLoan.map((data)=>{
    //     console.log(data.id)
    //     console.log(data.userID)

    // })

      
    }catch(error){
        console.log(error.message)
    }

    }
   
        const [page, setPage] = useState(1);
      
        const handleChange = (event, value) => {
          setPage(value);
        };
      

       

       
    return(
        <Box  component="main" sx={{ flexGrow: 1, p: 3,backgroundColor: '#f5f5f5 '  }}>
            
            <Box  className=" bg-white p-4 mt-5 rounded-2">
                <Box className="d-flex gap-4 flex-column justify-content-center align-items-center text-center">
                    <Typography fontWeight="bold" variant='h4'>My Loan Request</Typography>
                    <Button component={Link} to="/dashboard/LoanApplication" variant='contained'> Loan Request</Button>

                </Box>

                   <TableContainer className='mt-4'>
                    <Table>
                        <TableHead  sx={{ '& .MuiTableCell-root': { borderBottom: 'none' } , backgroundColor:"#e3f2fd" }}>
                            <TableRow>
                            <TableCell>REQUEST ID</TableCell>
                            <TableCell>REQUEST DATE</TableCell>
                            <TableCell>LOAN PACKAGE </TableCell>
                            <TableCell>PAY FERQUENCY</TableCell>
                            <TableCell>REFERENCE</TableCell>
                            <TableCell>NEXT PAY DATE</TableCell>
                            <TableCell>STATUS</TableCell>
                            <TableCell>Actions</TableCell>
 


                            </TableRow>
                           
                        </TableHead>

                        <TableBody>
                        {myLoan.map((loan, index) => (
                            <TableRow key={index}>
                            <TableCell sx={{ fontWeight: "800" }}>{loan.userID}</TableCell>
                            <TableCell>{loan.created_atLoan}</TableCell>
                            <TableCell>$6000-4 Months</TableCell>
                            <TableCell>{loan.payFrequency}</TableCell>
                            <TableCell>{loan.incomeSource}</TableCell>
                            <TableCell>{loan.nextPayDate}</TableCell>
                            <TableCell>
                                <Button sx={{ paddingX: "16px", textTransform: 'none', borderRadius: "25px" }} variant='contained'>Pending</Button>
                            </TableCell>
                            <TableCell><MoreVertIcon /></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>

                    </Table>
                   </TableContainer>
               
                   <Box className="d-flex mt-4 justify-content-between align-items-center">
                            <Typography >Showing <span  style={{fontWeight:"bold"}}>1</span>  to  <span  style={{fontWeight:"bold"}}>5</span> of <span  style={{fontWeight:"bold"}}>6</span> results</Typography>
                        
                           <Box> <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
                                <Pagination
                                    count={2} // total pages
                                    page={page}
                                    onChange={handleChange}
                                    variant="outlined"
                                    shape="rounded"
                                />
                                </Stack></Box>
                        </Box>
                       <Box className="w-100"><Typography> <span style={{fontWeight:"bold"}}> Note:</span>  You can view the details of each loan  request by clicking on the action menu</Typography></Box>
            </Box>
        </Box>
        
    )
}