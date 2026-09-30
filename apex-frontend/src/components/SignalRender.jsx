"use client"
import React from 'react'
import Single_blog from './Single_blog';
import Header from './Header';
import Footer from './Footer';
import { redirect, useRouter } from 'next/navigation';

const SignalRender = ({ data,headers,
  footers, }) => {
    const router = useRouter();

    
  
        return (
          <>
            <Header headers={headers}/>
              
            <Single_blog data={data} />
           
            <Footer footers={footers} />
          </>
        );
     
    };
    
  

export default SignalRender