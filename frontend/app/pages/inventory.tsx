'use client'
import Navbar from "../components/navbar";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged  } from "firebase/auth";
import { auth } from '../firebase/config'

export default function Inventory() {
    const [user, setUser] = useState('Login');
    const [login, setLogin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const displayName = user.displayName
                setUser(displayName || 'Login');
                setLogin(true);
            }
        })
    }, []);

    return (
        <main className="grid grid-cols-5 gap-1 min-h-screen bg-white overflow-hidden">
            <div className="col-span-3">
                <Navbar user={user} login={login} onClick={()=>{}} lp={true} />
            </div>
        </main>
    );
}