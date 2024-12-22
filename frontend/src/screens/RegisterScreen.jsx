import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

const RegisterScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [register, { isLoading }] = useRegisterMutation();


    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if (userInfo) {
            navigate("/")
        }
    }, [navigate, userInfo])


    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Password do not match")
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }))
                toast.success("registered Successfully")
                navigate('/')
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <form onSubmit={submitHandler}>

                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">Email address</label>
                    <input type="text" name='name' placeholder='enter name' value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputName" aria-describedby="nameHelp" />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name='email' placeholder='enter email' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' placeholder='enter password' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
                </div>


                <div className="mb-3">
                    <label htmlFor="exampleInputConfirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" name='confirmPassword' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" id="exampleInputConfirmPassword" />
                </div>

                {isLoading && <Loader/>}
                <button type="submit" className="btn btn-primary">Sign Up</button>

                <div className="row py-3">
                    <div className="col">
                        Already have an account ? <Link to="/login">Login</Link>
                    </div>
                </div>
            </form>

        </FormContainer>
    )
}

export default RegisterScreen