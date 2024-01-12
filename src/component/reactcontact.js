import React, { useState } from "react";
import "./contact.css";
const Reactcontact = () => {
    const [user, setUser] = useState({
        name:"",
        email:"",
        message:"",
    });
    // saving the data that is inputed by user 
    let name, value;
    const getUserdata = (event) => {
        name = event.target.name;
        value = event.target.value;
        setUser({...user , [name] : value});
    };

    // posting data to firebase
    const postData = async (e) =>{
        e.preventDefault();
        
        const {name, email, message} = user;
        if(name && email && message){
            // this can be found on firebase documentation !! 
            const response = await fetch(
                "https://contact-me-form-4a11a-default-rtdb.firebaseio.com/contact-me-form-db.json",
                {
                    method:"POST",
                    headers:{
                        "Content-type" : "application/json",
                    },
                    body:JSON.stringify({
                        name,
                        email,
                        message,
                    }),
                }
            );
            
            if(response){
                alert("your response has been submitted !!!");
                setUser({
                    name : "",
                    email: "",
                    message:"",
                })
            }
        }
        else{
            alert("please fill all the fields");
        }
    };

    return(
    <div className="big-container">
    <div className="contact-form-container">
      <h2>Contact Us</h2>
      <form >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={user.name}
          onChange={getUserdata}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={getUserdata}
          required
        />

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={user.message}
          onChange={getUserdata}
          required
        ></textarea>

        <button type="submit" onClick={postData}>Submit</button>
      </form>
    </div>
    </div>
    );
};

export default Reactcontact;