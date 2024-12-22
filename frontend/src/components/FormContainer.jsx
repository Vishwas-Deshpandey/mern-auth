import React from 'react'

const FormContainer = ({children}) => {
  return (
    <div className='container w-50'>
        <div className="row justify-content-md-center mt-2">
            <div className="col card p-5">
                {children}
            </div>
        </div>
    </div>
  )
}

export default FormContainer