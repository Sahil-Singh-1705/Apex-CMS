import { NextResponse } from "next/server";
import {cookies} from 'next/headers';

export async function POST(req) {
    try {
        const data = await req.json();
        // console.log("bansi",data);
     
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`;
        // console.log(url);
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
        })
        response = await response.json();

        if (response.token) {
            cookies().set('token', response.token);
            return NextResponse.json({success: true}, {status: 200});
        } else {
            return NextResponse.json({success: false}, {status: 400});
        }
    } catch (err) {
        return NextResponse.json({ message: 'Internal Server Error' }, {status: 500});
    }
}

