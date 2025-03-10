import React from 'react'
import { useEffect, useState } from 'react'
import Swal from "sweetalert2"
import axios from "axios"
import {useNavigate} from "react-router-dom"

export default function Login() {
    const[username, setUserName] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const navigate = useNavigate()

    const data = (e) => {
        e.preventDefault()
        const userData = {
            username : username,
            email: email,
            password: password
        }

     axios.post("http://localhost:3000/login", userData).then((response) => {
        localStorage.setItem("access_token", response.data.access_token)
        const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
              }
          })
        console.log(response.status, response.data)
        Toast.fire({
            icon: "success",
            title: "Success login"
        })

        navigate('/')
     }). catch((error) => {
        console.log(error.response, "<<<< ini response error")
                  Swal.fire({
              title: "Failed!",
              html: error.response.data.message,
              icon: "error",
              confirmButtonText: "Ok"
          })
     })
    }

   async function handleCredentialResponse(response) {
      console.log("Encoded JWT ID token: " + response.credential);
    try {
      let {data} = await axios.post("http://localhost:3000/login/google", null, {
        headers : {
          google_token: response.credential
        }
      } )
      localStorage.setItem("access_token", data.access_token)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
    }

    useEffect(() => {
      google.accounts.id.initialize({
        client_id: "993412506101-8ljrn6g2bjvjjg8ablmmsquui3ko7r9l.apps.googleusercontent.com",
        callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    }, [])
    
  return (
    <section id="user-add-menu" className="vh-100">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black">
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
  
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
  
                  <form onSubmit={data} method='post' className="mx-1 mx-md-4">

  
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                      <input type="text" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                      </div>
                    </div>
  
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                      <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label className="form-label" htmlFor="form3Example4c">Password</label>
                      </div>
                    </div>
  
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <input type="submit" className="btn btn-primary btn-lg" value="Login" />
                    </div>

                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <div id="buttonDiv"></div>
                    </div>
  
                  </form>
  
                </div>
                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
  
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                    className="img-fluid" alt="Sample image"></img>
  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
