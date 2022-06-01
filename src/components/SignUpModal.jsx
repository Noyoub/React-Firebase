import React, { useContext, useRef, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

export default function SignUpModal() {

    const {modalState, toggleModals, signUp} = useContext(UserContext);

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

        if((inputs.current[1].value.length || inputs.current[2].value.length) < 6){
            setValidation("6 characters min");
            return;
        }
        else if(inputs.current[1].value !== inputs.current[2].value){
            setValidation("Passwords do not match");
            return;
        }

        try{
            const cred = await signUp(
                inputs.current[0].value, 
                inputs.current[1].value
            )
            formRef.current.reset()
            setValidation("");
            toggleModals("close");
            navigate("/private/private-home");
            

        } catch(err){
            if(err.code === "auth/invalid-email"){
                setValidation("Email format invalid");
            }
            if(err.code === "auth/email-already-in-use"){
                setValidation("Email already used");
            }
        }
    }

    const closeModal = () => {
        setValidation("");
        toggleModals("close");
    }

  return (
    <>
        {modalState.signUpModal && (
        <div className="position-fixed top-0 vw-100 vh-100">
            <div onClick={closeModal} className="w-100 h-100 bg-dark bg-opacity-75"></div>
            <div className="position-absolute top-50 start-50 translate-middle" style={{ minWidth: "400px" }}>
                <div className="modal-dialog">
                    <div className="modal-content bg-light">
                        <div className="modal-header">
                            <h5 className="modal-title">Sign up</h5>
                            <button onClick={closeModal} className="btn-close"> </button>
                        </div>
                        <div className="modal-body">
                            <form ref={formRef} onSubmit={handleForm} className="sign-up-form">
                                <div className="mb-3">
                                    <label htmlFor="signUpEmail" className="form-label">Email address</label>
                                    <input ref={addInput} name="email" required type="email" className="form-control" id="signUpEmail"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="signUpPassword" className="form-label">Password</label>
                                    <input ref={addInput} name="password" required type="password" className="form-control" id="signUpPassword"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="signUpPassword" className="form-label">Repeat Password</label>
                                    <input ref={addInput} name="password" required type="password" className="form-control" id="repeatPassword"/>
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
