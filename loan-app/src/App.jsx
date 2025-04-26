import { useState,useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row,Container,Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { Session } from './utils/retreiveSession';

function App() {
  
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // const [user, setUser] = useState()
  
 
  // useEffect(() => {
  //   const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //   if (currentUser) {
  //     setUser(currentUser);
  //     UserDetails()
  //   }
  // }, []);


  // console.log(user)
  return (
    <>
   
     <Container  className='d-flex overflow flex-column justify-content-center align-items-center' style={{height:"90vh"}}> 


      <Row className='gap-2 text-center justify-content-center align-items-center' style={{ backgroundColor: '#87CEFA',padding:"5em" ,borderRadius:"20px"}} >

        <Col md={12} > <h1 style={{ color: '#1877F2' }}>Welcome to Our Platform</h1>
        <p>Experience the  best service  with out cutting-edge <br/> solutions.</p> </Col>
    
      <div className='d-flex justify-content-center'>
         <span className='me-3'>  <Link to="/login"><Button className='w-100'> Login</Button></Link> </span>
        <span ><Link to="/signup"> <Button className='text-primary w-100 text-nowrap ' variant="light"> Sign Up</Button></Link></span> 
      </div>
      </Row>
     </Container>
   
    <Session/>
     

    

   

    </>
  )
}

export default App

