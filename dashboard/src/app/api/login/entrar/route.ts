import { LOCALHOST } from '@/app/constant';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
    const { email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json(
            { message: 'Email e senha são obrigatórios' },
            { status: 400 }
        );
    }

    try {
        const response = await fetch(`${LOCALHOST}/api/login/entrar/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return NextResponse.json(data, { status: 200 });
        } else {
            const errorData = await response.json();
            return NextResponse.json(errorData, { status: response.status });
        }

    } catch (error) {
        return NextResponse.json(
            { message: 'Erro ao comunicar com a API do Django', error: error.message },
            { status: 500 }
        );
    }
}
