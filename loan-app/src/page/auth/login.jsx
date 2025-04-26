import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Container, Button } from 'react-bootstrap';
import { FiMail,} from 'react-icons/fi';
import { FaLock } from 'react-icons/fa'
import { Link } from 'react-router';
import { useState } from 'react';
import { supabase } from '../../utils/config';
import { useNavigate } from "react-router-dom"
import { Password } from '@mui/icons-material';
import Swal from 'sweetalert2'





export function Login() {


  const pageNavigate = useNavigate()


  
     

    const[Login,setLogin]= useState({
        EmailAdress: " ",
        Password: " "
    })

    async function LoginUSer(){
   
        console.log(Login)

        if (Login.EmailAdress.trim() !== "" && Login.Password.trim() !=="")
        {
       try{

        const { data, error } = await supabase.auth.signInWithPassword({
            email: Login.EmailAdress,
            password: Login.Password,
           })

           if(error) throw error

           if(data){
            console.log(data)
            Swal.fire({
                position: 'top-end',
                html: `
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 15px;
                    padding: 4px 8px;
                    margin: 0;
                  ">
                    <span style="color: #155724;">Successfully Sign in!</span>
                    <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="16" fill="#a5dc86"/>
                      <path d="M9 17l4 4 10-10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                `,
                showConfirmButton: false,
                timer: 2000,
                background: '#d4edda',
                backdrop: false,
                width: 'auto',
                padding: '0',
              });
              
              
            setTimeout(()=>{
                pageNavigate('/dashboard')
            },500)
          }
        
       }catch(error){

        console.log(error.message)
        Swal.fire({
            position: 'top-end',
            html: `
              <div style="
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 14px;
                padding: 6px 10px;
              ">
                <span style="color: #d9534f;">${error.message}!</span>
                <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="16" fill="#d9534f"/>
                  <path d="M10 10 L22 22 M22 10 L10 22" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
            `,
            showConfirmButton: false,
            timer: 2000,
            background: '#f8d7da',
            backdrop: false,
            width: 'auto',
            padding: '0',
        });
          
       }

    }

    else {
        Swal.fire({
            position: 'top-end',
            html: `
              <div style="
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 14px;
                padding: 6px 10px;
              ">
                <span style="color: #d9534f;">Emaill Adress and Password is required!</span>
                <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="16" fill="#d9534f"/>
                  <path d="M10 10 L22 22 M22 10 L10 22" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
            `,
            showConfirmButton: false,
            timer: 2000,
            background: '#f8d7da',
            backdrop: false,
            width: 'auto',
            padding: '0',
        });
     
        
    }
        

     }


    return (
        <>
            <Container className=" mt-5 d-flex overflow justify-content-center align-items-center p-4" style={{ backgroundColor: '#87CEFA'}}>
                <div className=' d-flex  flex-column justify-content-center align-items-center  '>
                <div>
                    <h1 style={{fontWeight:"700"}}>Sign in to your account</h1>
                  <p className='text-center'>Or  <Link to="/signup" className='text-decoration-none'><span className='text-primary'>create a new account</span></Link> </p>
                </div>

                <div   className='custom-w p-3  ' style={{ backgroundColor: 'white',borderRadius:"10px"}}>
                    <form>
                        <Row md={12}  className="justify-content-center gap-4">

                        <div>
                         
                            <label   className="form-label d-block text-start">Email Address</label>
                           
                                
                            <div className="input-group">
                                    <span className="input-group-text">
                                        <FiMail/>
                                    </span>
                                    <input type="text" onChange={(e) => setLogin({ ...Login, EmailAdress: e.target.value })}  placeholder="you@example.com"   className="form-control"  aria-label="Email-Address"/>
                                </div>
                           
                            
  
                        </div>

                        <div >
                            <label  className="form-label d-block text-start">Password</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaLock/>
                                </span>
                                    <input type="password" onChange={(e) => setLogin({ ...Login, Password: e.target.value })}  placeholder="*********"  className="form-control"   aria-label="Email-Address" />
                                      
                                       
                                       
                                 
                                        
                                    </div>
  
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="rememberMe" />
                                <label className="form-check-label" htmlFor="rememberMe">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="text-primary text-decoration-none">Forget your password?</a>
                        </div>


                            <div className='w-100 text-center'>
                                <Button style={{width:"60%"}} className='fs-5' onClick={LoginUSer} variant="primary">Sign in</Button>
                                 <Link className='text-decoration-none' to="/"><p className='mt-4 text-primary fs-5'>Back to home</p></Link> 
                            </div>
                        </Row>
                    </form>
                </div>
                </div>
            </Container>
        </>
    );
}