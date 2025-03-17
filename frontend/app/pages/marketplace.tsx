'use client'
import Charms from "../components/charms"
import Sidebar from "../components/sidenav"
import MNavbar from "../components/mnavbar";
import { auth } from '../firebase/config'
import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import data from '@/app/data/charm.json'

export default function MarketPlace() {
    const [log, setLogin] = useState(false);
    const [username, setUsername] = useState('Login');
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsername(user.displayName || 'Login');
                setLogin(true);
            }
            else { router.push('/login') }
        })
    }, [router]
    )

    const onClick = () => {
        router.push('/profile')
    }
    return (
        log ? (<div className='grid grid-cols-5 gap-1'>
            <div className="col-span-5">
                <MNavbar user={username} onClick={onClick} login={log} lp={false} />
            </div>
            <div className="row-span-4 row-start-2 hidden sm:block">
                <Sidebar />
            </div>
            <div className="col-span-5 row-span-4 md:row-start-2 md:col-span-4 lg:col-span-4">
                <main className="h-screen bg-white flex-1 p-4">
                    <h1 className="text-black font-semibold text-xl md:text-2xl">Recommended Charms</h1>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {data.charms.map((charm) => (
                            <div key={charm.id} >
                                <Charms
                                    id={charm.id}
                                    name={charm.name}
                                    image={charm.image}
                                    variant={charm.variant}
                                    quote={charm.quote}
                                    isRare={charm.isRare}
                                    category={charm.category}
                                />
                            </div>
                        ))}

                    </div>
                </main>
            </div>
        </div>) : null
    )
}
