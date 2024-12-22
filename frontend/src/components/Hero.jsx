import React from 'react'
import { NavLink } from 'react-router-dom'
const Hero = () => {
    return (
        <div className="card text-center w-50 mx-auto my-4 bg-light">
            <div className="card-body">
                <h2 className="card-title">MERN AUTH APP </h2>
                <p className="card-text py-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique minus cum accusantium voluptatum alias rerum perspiciatis iste vel, modi eius.
                </p>
                <NavLink to={"/login"} className="btn btn-primary">Sign In</NavLink>
                <NavLink to={"/register"} className="btn btn-secondary">Sign Up</NavLink>
            </div>
        </div>

    )
}

export default Hero