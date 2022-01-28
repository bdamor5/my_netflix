import React from 'react';
import { useSelector } from 'react-redux';
import {Outlet,Navigate} from 'react-router-dom'

const ProtectedRoute = () => {
    const {isAuthenticated,loading} = useSelector(state => state.userOptions)

    if(loading === false){

        if(isAuthenticated === false)
            return <Navigate to="/" />
        else 
            return <Outlet/>
    }

    return <></>

};

export default ProtectedRoute;
