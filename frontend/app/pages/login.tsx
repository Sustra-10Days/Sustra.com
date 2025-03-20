"use client";
import { useEffect, useState } from "react";
import { auth, googleProvider } from '@/app/firebase/config';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithRedirect, onAuthStateChanged } from 'firebase/auth';
import client from "@/lib/ApolloClient";
import { Register } from "@/lib/register";
import { verify } from "@/lib/verify";


export default function Login() {
    const [error, setError] = useState("");
    const router = useRouter();

    const handleGoogleSignin = async () => {
        try {
            await signInWithRedirect(auth, googleProvider);
        } catch (error) {
            setError("Failed to sign in with Google. Please try again.");
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    console.log("User logged in:", user.uid, user.email);
                    const idToken = await user.getIdToken(true);
                    
                    // Add this debug statement
                    console.log("Attempting to verify token...");
                    
                    const { data } = await client.query({
                        query: verify,
                        variables: {
                            token: idToken,
                        }
                    });
                    console.log("Verification result:", data);
                    
                    if (data.verify && data.verify.success) {
                        
                        const { data: registerData } = await client.mutate({
                            mutation: Register,
                            variables: {
                                id: user.uid,
                                email: user.email,
                                name: user.displayName || "Anonymous",
                                picture: user.photoURL || "",
                            },
                        });
                        
                        console.log("Registration result:", registerData);
                        
                        if (registerData) {
                            router.push('/marketplace');
                        } else {
                            setError("Registration failed. Please try again.");
                        }
                    }
                } catch (error: unknown) {
                    // More detailed error logging
                    console.error("Authentication error:", error);
                }
            }
        });
    
        return () => unsubscribe();
    }, [router]);

    return (
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
                {error !== '' && ("Failed to sign in with Google. Please try again.")}
                {/*button container*/}
                <button onClick={handleGoogleSignin} className="gsi-material-button flex items-center justify-between bg-white border border-gray-400 rounded-2xl box-border text-gray-800 cursor-pointer font-roboto text-sm h-10 px-3 relative transition duration-200 ease-in-out hover:shadow-md hover:bg-gray-100 focus:bg-gray-200 active:bg-gray-300 disabled:cursor-default disabled:bg-gray-200 disabled:border-gray-200">
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-200 ease-in-out"></div>
                    <div className="flex items-center justify-between w-full h-full">
                        <div className="h-5 w-5 mr-3">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" className="block">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                            </svg>
                        </div>
                        <span className="flex-grow font-medium overflow-hidden text-ellipsis">Continue with Google</span>
                    </div>
                </button>
            </div>
        </main>
    );

}