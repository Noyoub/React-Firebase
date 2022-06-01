import React, { useContext, useRef, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

export default function SignInModal() {

    const {modalState, toggleModals, signIn} = useContext(UserContext);

    const navigate = useNavigate();

    const [validation, setValidation] = useState("");


    const inputs = useRef([])

    const addInput = el => {
        if(el && !inputs.current.includes(el)){
            inputs.current.push(el);
        }
    }

    const formRef = useRef();

    const handleForm = async (e) => {
        e.preventDefault()

        try{
            const cred = await signIn(
                inputs.current[0].value, 
                inputs.current[1].value
            )
            //formRef.current.reset()
            setValidation("");
            toggleModals("close");
            navigate("/private/private-home");
            

        } catch{
           setValidation("Email and/or password incorrect");
        }
    }

    const closeModal = () => {
        setValidation("");
        toggleModals("close");
    }

  return (
    <>
        {modalState.signInModal && (
        <div className="position-fixed top-0 vw-100 vh-100">
            <div onClick={closeModal} className="w-100 h-100 bg-dark bg-opacity-75"></div>
            <div className="position-absolute top-50 start-50 translate-middle" style={{ minWidth: "400px" }}>
                <div className="modal-dialog">
                    <div className="modal-content bg-light">
                        <div className="modal-header">
                            <h5 className="modal-title">Sign in</h5>
                            <button onClick={closeModal} className="btn-close"> </button>
                        </div>
                        <div className="modal-body">
                            <form ref={formRef} onSubmit={handleForm} className="sign-up-form">
                                <div className="mb-3">
                                    <label htmlFor="signInEmail" className="form-label">Email address</label>
                                    <input ref={addInput} name="email" required type="email" className="form-control" id="signInEmail"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="signInPassword" className="form-label">Password</label>
                                    <input ref={addInput} name="password" required type="password" className="form-control" id="signInPassword"/>
                                </div>
                                <button className="btn btn-primary">Submit</button>
                                <p className="text-danger mt-1">{validation}</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )}
    </>
  )
}
