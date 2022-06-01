import React, {useContext} from 'react'
import { UserContext } from '../../context/UserContext'
import {Outlet, Navigate} from 'react-router-dom'

export default function Private() {

    const {currentUser} = useContext(UserContext);

    if(!currentUser){
        return  <Navigate to="/" />
    }


    return (
        <div className="container">
            <Outlet />
        </div>
    )
}
