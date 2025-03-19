'use client'
import { useEffect, useState } from "react";
import { auth } from '@/app/firebase/config';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, onAuthStateChanged } from 'firebase/auth';

export default function SignOut() {
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                // User is signed out, redirect to home page
                router.push('/');
            }
        });
        const handleSignOut = async () => {
            try {
                await signOut(auth);
                router.push('/');
            } catch (error) {
                setError("Failed to sign out. Please try again.");
            }
        };

        handleSignOut();

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [router]);


    return (
        <>
        {error.length > 2 && (
            <main className="flex flex-col items-center justify-center h-screen bg-white">
            <div className="flex flex-col items-center justify-center">
                {/*header container*/}
                <div className="items-center justify-center flex">
                    <Link
                        href="/"
                        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 font-poppins"
                    >
                        Sustra.com
                    </Link>
                </div>
                {/*button container*/}
                <div className="flex flex-col items-center">
                    <button
                        onClick={() =>{}}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Sign Out
                    </button>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>
            </div>
        </main>
        )}
        </>
    );
}

