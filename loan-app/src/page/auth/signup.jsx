import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Container, Col, Button } from 'react-bootstrap';
import { FiMail } from 'react-icons/fi';
import { FaLock } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { FiUser } from 'react-icons/fi';
import { FaPhoneAlt } from 'react-icons/fa';
import * as React from 'react';
import { supabase } from '../../utils/config';
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'



export function Signup() {

    const pageNavigate = useNavigate()
   
  
       const[Signup,setSignup] = React.useState({
        firstname:" " ,
        lastname:" " ,
        EmailAdress:" " ,
        PhoneNumber:" ",
        Password:" "


       
    })
    


       async  function CreateUSer(){
        console.log(Signup)

        if (Signup.EmailAdress.trim() !== "" && Signup.Password.trim() !== "") { 
            console.log("Success");
        
            try {
                const { data, error } = await supabase.auth.signUp({
                    email: Signup.EmailAdress,
                    password: Signup.Password,
                    options: {
                        data: {
                            firstname: Signup.firstname,
                            lastname: Signup.lastname,
                            phone: Signup.PhoneNumber
                        }
                    }
                });
        
                if (error) throw error;
        
                if (data) {
                    console.log(data);
                    try {
                      const { data: userData, error: insertError } = await supabase
                        .from("user")
                        .insert({
                          id: data.user.id,
                          firstname: Signup.firstname,
                          lastname: Signup.lastname,
                          email: Signup.EmailAdress,
                          phonenumber: Signup.PhoneNumber
                        });
                    
                      if (insertError) throw insertError;
                    
                      if (userData) {
                        console.log(userData)

                        Swal.fire({
                          title: "Good job!",
                          text: "You clicked the button!",
                          icon: "success"
                        });
                        // Swal.fire({
                        //   position: 'top-end',
                        //   html: `
                        //     <div style="
                        //       display: flex;
                        //       align-items: center;
                        //       gap: 6px;
                        //       font-size: 15px;
                        //       padding: 4px 8px;
                        //       margin: 0;
                        //     ">
                        //       <span style="color: #155724;">Successfully Sign up!</span>
                        //       <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                        //         <circle cx="16" cy="16" r="16" fill="#a5dc86"/>
                        //         <path d="M9 17l4 4 10-10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        //       </svg>
                        //     </div>
                        //   `,
                        //   showConfirmButton: false,
                        //   timer: 2000,
                        //   background: '#d4edda',
                        //   backdrop: false,
                        //   width: 'auto',
                        //   padding: '0',
                        // });
                    
                        setTimeout(() => {
                          pageNavigate('/login');
                        }, 500);
                      }
                    } catch (insertCatchError) {
                      console.log(insertCatchError.message);
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
                            <span style="color: #721c24;">${insertCatchError.message}</span>
                            <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                              <circle cx="16" cy="16" r="16" fill="#f27474"/>
                              <path d="M16 9v8" stroke="white" stroke-width="2" stroke-linecap="round"/>
                              <circle cx="16" cy="21" r="1.5" fill="white"/>
                            </svg>
                          </div>
                        `,
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#f8d7da',
                        backdrop: false,
                        width: 'auto',
                        padding: '0',
                      });
                    }
                    
         } 
            } catch(error) {
                console.error("Signup error:", error);
                
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
                        <span style="color: #721c24;">${error.message}</span>
                        <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                          <circle cx="16" cy="16" r="16" fill="#f27474"/>
                          <path d="M16 9v8" stroke="white" stroke-width="2" stroke-linecap="round"/>
                          <circle cx="16" cy="21" r="1.5" fill="white"/>
                        </svg>
                      </div>
                    `,
                    showConfirmButton: false,
                    timer: 3000,
                    background: '#f8d7da',
                    backdrop: false,
                    width: 'auto',
                    padding: '0',
                  });
                  
                  
            }
        }

        else{
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
                            <span style="color: #d9534f;">Emaill Adress and Password is neccesarry!</span>
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
            <Container className="mt-4 d-flex overflow justify-content-center align-items-center p-5 " style={{ backgroundColor: '#87CEFA'}}>
                <div className='w-100 w-md-50 d-flex  flex-column justify-content-center align-items-center  '>
                <div>
                    <h1 style={{fontWeight:"700"}}>Create a new Account</h1>
                    <p className='text-center'>Or <Link to="/login" className='text-decoration-none '> <span className='text-primary'>sign in to your existing account</span></Link></p>
                </div>

                <div  className='p-3 w-100 w-md-50' style={{ backgroundColor: 'white',borderRadius:"10px"}}>
                    <form>
                        <Row  className="gap-4">

                       <div md={12}>
                        <Row md={12} sm={6}>
                            <Col md={6} sm={12}>
                             <div className='w-100'>
                         
                         <label className="form-label d-block text-start">First name</label>
                         <div className="input-group">
                                 <span className="input-group-text">
                                     <FiUser/>
                                 </span>
                                 <input type="text" onChange={(e) => setSignup({ ...Signup, firstname: e.target.value })}  placeholder="Enter first name" className="form-control" aria-label="First-name"/>
                             </div>
                     </div>
                     </Col>

                     <Col md={6} sm={12}>
                             <div className='w-100'>
                         
                         <label className="form-label d-block text-start">Last name</label>
                         <div className="input-group">
                                 <span className="input-group-text">
                                     <FiUser/>
                                 </span>
                                 <input type="text" onChange={(e) => setSignup({ ...Signup, lastname: e.target.value })} placeholder="Enter last name" className="form-control" aria-label="Last-name"/>
                             </div>
                     </div>
                     </Col>
                     </Row>
                     </div>
                      
                        <div>
                            <label className="form-label d-block text-start">Email Address</label>
                            <div className="input-group">
                                    <span className="input-group-text">
                                        <FiMail/>
                                    </span>
                                    <input type="email" onChange={(e) => setSignup({ ...Signup, EmailAdress: e.target.value })} placeholder="you@example.com" className="form-control" aria-label="Email-Address"/>
                                </div>
                        </div>

                        <div>
                            <label className="form-label d-block text-start">Phone number</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaPhoneAlt/>
                                </span>
                                <input type="tel" onChange={(e) => setSignup({ ...Signup, PhoneNumber: e.target.value })} placeholder="1234567890" className="form-control" aria-label="Phone-number" />
                            </div>
                        </div>

                        <div>
                            <label className="form-label d-block text-start">Password</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaLock/>
                                </span>
                                <input type="password" onChange={(e) => setSignup({ ...Signup, Password: e.target.value })} placeholder="*********" className="form-control" aria-label="Password" />
                            </div>
                        </div>

                        <div className="d-flex mb-3">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="termsAgreement" />
                                <label className="form-check-label" htmlFor="termsAgreement">
                                    I agree to  the <span className='text-primary'>Terms </span>
                                        and   <span className='text-primary'>Privacy Policy</span>
                                </label>
                            </div>
                        </div>

                        <div className='w-100 text-center'>
                            <Button  style={{width:"60%",fontSize:"1em"}} onClick={CreateUSer} variant="primary">Create Account</Button>
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