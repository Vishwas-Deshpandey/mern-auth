import React from 'react'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { toast } from 'react-toastify'

const Navbar = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const [logoutApiCall] = useLogoutMutation()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            toast.success("Logged Out Successfully !")
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <NavLink to="/" className="navbar-brand">MERN AUTH</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {userInfo ? (
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {userInfo.name}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li><NavLink className="dropdown-item" to="/profile">Profile</NavLink></li>
                                            <li><NavLink className="dropdown-item" to="/" onClick={logoutHandler}>logout</NavLink></li>
                                        </ul>
                                    </li>
                                </ul>
                            ) : (
                                <>
                                    <NavLink to='/login'> <FaSignInAlt /> Sign in</NavLink>
                                    <NavLink to='/register'> <FaSignOutAlt /> Sign Up</NavLink>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar