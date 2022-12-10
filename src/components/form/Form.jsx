import React from "react";
import { validation } from "./validation";

export default function Form(props){
    const [userData, setUserData]= React.useState({
        username:'',
        password:'',
    })
    const [errors, setErrors]= React.useState({
        username:'',
        password:'',
    })
    function handleInputChange(e){
        setUserData({...userData,[e.target.name]:e.target.value})
        setErrors(validation({...userData,[e.target.name]:e.target.value}))
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        props.login(userData)
    }
    return <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input 
            type="text" 
            id="username"
            name="username"
            placeholder="Ingrese el usuario..."
            value={userData.username}
            onChange={handleInputChange}
            />
            <p>{errors.username}</p>
            <label htmlFor="password">Password:</label>
            <input 
            id="password"
            name="password"
            type="password"
            value={userData.password}
            onChange={handleInputChange}
            />
            <p>{errors.password}</p>
            <input type="submit" />
        </form>
    </div>
}