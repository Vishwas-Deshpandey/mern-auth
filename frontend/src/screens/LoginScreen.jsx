import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import FormContainer from '../components/FormContainer'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'


const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if (userInfo) {
            navigate("/")
        }
    }, [navigate, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }))
            toast.success("LoggedIn Successfully")
            navigate('/')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name='email' placeholder='enter email' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' placeholder='enter password' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
                </div>

                {isLoading && <Loader />}

                <button type="submit" className="btn btn-primary">Sign In</button>

                <div className="row py-3">
                    <div className="col">
                        New Customer? <Link to="/register">Register</Link>
                    </div>
                </div>
            </form>

        </FormContainer>
    )
}

export default LoginScreen