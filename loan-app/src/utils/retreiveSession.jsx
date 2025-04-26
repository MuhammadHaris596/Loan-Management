import Swal from 'sweetalert2';
import { supabase } from './config';
import {useEffect,useState} from 'react'



export function Session(){


   
    
    useEffect(()=>{
        UserDetails()
    },[])


 async function UserDetails() {
        
    try {
        console.log("getUserr ...");
    const {
        data: { user,session },
    } = await supabase.auth.getUser();
    if (user) {
        console.log(user);

        try {
        const { data, error } = await supabase
            .from("user")
            .select("id,created_at, firstname , lastname,phonenumber,email")
            .eq("id", user.id);

            if(error) throw error


        if (data) {
            console.log(data);
        console.log(data[0].firstname)
        console.log(data[0].lastname)

            let currentUser = {
            firstName:data[0].firstname,
            lastName:data[0].lastname,
            Email: data[0].email,
            userId: data[0].id,
            phoneNumber:data[0].phonenumber,
            createdAt:data[0].created_at
            }

            console.log(currentUser.firstName)
            console.log(currentUser.lastName)
            console.log(currentUser.Email)
            console.log(currentUser.userId)
            console.log(currentUser.phoneNumber)
            console.log(currentUser.createdAt)



            
            localStorage.setItem('currentUser' , JSON.stringify(currentUser))
          
         
        }
       
        }


        catch (error) {
    console.log(error);
            
        }
    }
    } catch (error) {
    console.log(error);
    }
}



}
