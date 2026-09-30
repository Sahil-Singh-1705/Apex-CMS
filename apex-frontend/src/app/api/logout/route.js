import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function POST(req) {
    try {
        const existingToken = cookies().get('token');

        if (existingToken) {
            // Clear the token cookie to logout
            cookies().delete('token');
            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            // The token cookie doesn't exist, treat it as a successful logout
            return NextResponse.json({ success: true }, { status: 200 });
        }
    } catch (err) {
        // console.log(err)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
