"use client"
import { AlertContext } from '@/context/context'
import React from 'react'
const [openAlert, setOpenAlert] = useState(null);
const [openAlertdetails, setOpenAlertdetails] = useState(null);
const [timerId, setTimerId] = useState(null);
export const AlertProvider = ({children}) => {
    const showAlert = ({message, severity}) => {
      // console.log("showAlert",{message,severity});
        setOpenAlert(message);
        setOpenAlertdetails(severity);
    
        setTimerId(setTimeout(() => {
          setOpenAlert(null);
          setOpenAlertdetails(null);
        },1500));
      };
  return (
    <>
    <AlertContext.Provider
    value={{showAlert}}>
        

        {children}
    </AlertContext.Provider>
    </>
  )
}
