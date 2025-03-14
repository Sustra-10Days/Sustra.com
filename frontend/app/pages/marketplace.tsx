'use client'
import Charms from "../components/charms"
import Sidebar from "../components/sidenav"
import Navbar from "../components/navbar";
import { auth } from '../firebase/config'
import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function MarketPlace() {
    const [log, setLogin] = useState(false);
    const [username, setUsername] = useState('Logon');
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsername(user.displayName ||'Username');
                setLogin(true);
            }
            else{router.push('/')}
        })
    }, [router]
    )

    const onClick = ()=>{
        router.push('/profile')
    }
    return (
        <div className='grid grid-cols-5 gap-1'>
            <div className="col-span-5">
                <Navbar user={username} onClick={onClick} login={log}/>
            </div>
            <div className="row-span-4 row-start-2 hidden sm:block">
                    <Sidebar />
            </div>
            <div className="col-span-5 row-span-4 row-start-2 md:col-span-4 lg:col-span-4">
                <main className="h-screen bg-white flex-1 p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-auto justify-center items-center">
                        <Charms
                            id="1"
                            name="testr"
                            image="https://cdn.discordapp.com/attachments/519834856159444992/1350053846172303361/sigmaconsulting.png?ex=67d5571f&is=67d4059f&hm=0cb711bfd0dac2aba3ce97df3a34277a13a3bafedc7391f7e3690be2f89b4dc7&"
                            variant="testestseasdasdt"
                            quote="it's that simple."
                            isRare={true}
                            category="health"
                        />
                        <Charms
                            id="2"
                            name="testr"
                            image="https://cdn.discordapp.com/attachments/519834856159444992/1350053846172303361/sigmaconsulting.png?ex=67d5571f&is=67d4059f&hm=0cb711bfd0dac2aba3ce97df3a34277a13a3bafedc7391f7e3690be2f89b4dc7&"
                            variant="testestseasdasdt"
                            quote="dasfjklasdhf jadshfjk ladshfjk ashdfjk ashdfjk sahfk lhasjdk fh."
                            isRare={true}
                            category="study"
                        />
                        <Charms
                            id="3"
                            name="testr"
                            image="https://cdn.discordapp.com/attachments/519834856159444992/1350053846172303361/sigmaconsulting.png?ex=67d5571f&is=67d4059f&hm=0cb711bfd0dac2aba3ce97df3a34277a13a3bafedc7391f7e3690be2f89b4dc7&"
                            variant="testestseasdasdt"
                            quote="adfadsfdafasfasd."
                            isRare={true}
                            category="love"
                        />
                        <Charms
                            id="4"
                            name="testr"
                            image="https://cdn.discordapp.com/attachments/519834856159444992/1350053846172303361/sigmaconsulting.png?ex=67d5571f&is=67d4059f&hm=0cb711bfd0dac2aba3ce97df3a34277a13a3bafedc7391f7e3690be2f89b4dc7&"
                            variant="testestseasdasdt"
                            quote="adfadsfdafasfasd."
                            isRare={true}
                            category="money"
                        />
                    </div>
                </main>
            </div>
        </div>)
}
