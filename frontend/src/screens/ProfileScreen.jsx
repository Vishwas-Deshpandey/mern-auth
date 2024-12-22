import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { setCredentials } from '../slices/authSlice'
import { useUpdateUserMutation } from '../slices/usersApiSlice'

const ProfileScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth)
    const [updateProfile, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
        setName(userInfo.name)
        setEmail(userInfo.email)
    }, [userInfo.setName, userInfo.setEmail])


    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Password do not match")
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password
                }).unwrap();

                dispatch(setCredentials({ ...res }));

                toast.success("Profile Updated Successfully")
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }
    return (
        <FormContainer>
            <h1>Update Profile</h1>
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

                {isLoading && <Loader />}
                <button type="submit" className="btn btn-primary">Update Profile</button>

            </form>

        </FormContainer>
    )
}

export default ProfileScreen