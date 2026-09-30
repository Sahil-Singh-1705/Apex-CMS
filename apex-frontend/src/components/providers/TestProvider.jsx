"use client"

import { AlertContext } from '@/context/context'
import Alert from '@mui/material/Alert';
import React, {useEffect, useState} from 'react'

const TestProvider = ({children}) => {

    const [alert, setAlert] = useState({
        message: '',
        type: 'success',
        open: false
    });

    useEffect(() => {
        let time = setTimeout(() => {
            setAlert({
                message: '',
                type: 'success',
                open: false
            })
        }, 3000);
        return () => clearTimeout(time);
    }, [alert]);

    // console.log("alert",alert)

  return (
    <>
{alert.open && <Alert
 sx={{
    position:"fixed",
    top: 20,
    right:10,
    zIndex: 10000000,
    width: '30%',

}} severity={alert.type}>{alert.message}</Alert>}
    <AlertContext.Provider value={{ setAlert }}>
        {children}
    </AlertContext.Provider>
    </>
  )
}

export default TestProvider