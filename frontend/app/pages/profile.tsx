"use client";
import MNavbar from "../components/mnavbar";
import { User, Edit } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { verify } from '@/lib/getUser';
import client from "@/lib/ApolloClient";
import { auth } from '@/app/firebase/config';
import { modify } from '@/lib/modifyUser';
import { getUserInventory } from '../../lib/getUserInventory';

export default function Profile() {
  const [user, setUser] = useState("Login");
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [major, setMajor] = useState("");
  const [username, setUsername] = useState("");
  const [uid, setUid] = useState("");
  const router = useRouter();

  // Handle auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const displayName = user.displayName;
          setUser(displayName || "Login");
          setLogin(true);
          setEmail(user.email || '');
          setUid(user.uid);
        } catch (error) {
          console.error("Error setting user data:", error);
        }
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (uid) {
        try {
          console.log("Fetching user data for:", uid);
          const { data } = await client.query({
            query: verify,
            variables: { uid: uid },
            fetchPolicy: 'network-only' // Force fresh data from server
          });
          if (data) {
            console.log("User data received:", data.getUserbyId);
            setUsername(data.getUserbyId.name);
            setMajor(data.getUserbyId.major||"");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [uid]);

  const [showEdit, setShowEdit] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [isShown, setShown] = useState(false);

  const closeModal = (e: React.MouseEvent) => {
    setShowEdit(false);
  }

  useEffect(() => {
    if (showEdit) {
      setShown(true);
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
      const timer = setTimeout(() => setShown(false), 300);
      return () => clearTimeout(timer);
    }
  }, [showEdit]);

  const handleSaveProfile = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        const uid = currentUser.uid;
        const { data } = await client.mutate({
          mutation: modify,
          variables: {
            uid: uid,
            major: major,
            name: username,
          },
        });
        if (data.editUser.success) {
          alert("Profile updated successfully!");
          // Update UI states
          setUser(username);
          setMajor(major);
          setShowEdit(false);
        } else {
          alert("Failed: " + data.editUser.message);
        }
      } catch (error: any) {
        console.error("Error:", error);
        alert("Error: " + error.message);
      }
    }
  };

  return login?(
    <div className="min-h-screen w-screen">
      {/* Navbar */}
      <MNavbar user={username} email={email} login={login} onClick={() => { }} lp={false} />
      <div className="flex justify-center items-center flex-grow p-4">
        <section className="bg-white p-10 rounded-lg shadow-xl flex flex-col sm:flex-row justify-between items-center w-full max-w-[90vw] sm:max-w-[60vw] lg:max-w-[65vw]">
          <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 text-center sm:text-left">
            {/* Profile Icon */}
            <div className="relative mb-4 sm:mb-0">
              <div className="w-16 h-16 bg-purple-300/40 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-purple-800" />
              </div>
              <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer">
                <Edit className="w-4 h-4 text-gray-600" />
              </div>
            </div>

            {/* User Info */}
            <div>
              <h2 className="text-xl font-semibold text-purple-800">{username}</h2>
              <p className="text-gray-500">{email}</p>
              <p className="text-gray-600">Major: <span className="font-semibold">{major}</span></p>
            </div>
          </div>

          {/* Edit Button */}
          <button className="bg-purple-200 px-6 py-2 mt-4 sm:mt-0 rounded-lg font-semibold drop-shadow-lg text-purple-800 hover:bg-purple-300 transition hover:scale-105 shadow-lg" onClick={() => { setShowEdit(!showEdit) }}>
            Edit
          </button>
        </section>
      </div>
      {isShown && (
        <div
          className={`fixed inset-0 bg-white z-[9999] flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeModal}
        >
          <div
            className={`bg-white rounded-lg p-6 w-full max-w-md mx-4 transition-all duration-300 border-solid border-2 border-gray-100 shadow-lg ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-indigo-950">Edit Profile</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-indigo-950 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>

              <div>
                <label htmlFor="major" className="block text-sm font-medium text-indigo-950 mb-1">
                  Major
                </label>
                <select
                  id="major"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                >
                  <option value="COMPUTER">COMPUTER</option>
                  <option value="CEDT">CEDT</option>
                  <option value="CHEMICAL">CHEMICAL</option>
                  <option value="MECHANICAL">MECHANICAL</option>
                  <option value="ELECTRICAL">ELECTRICAL</option>
                  <option value="PETROLEUM">PETROLEUM</option>
                  <option value="CIVIL">CIVIL</option>
                  <option value="INDUSTRIAL">INDUSTRIAL</option>
                  <option value="SURVEY">SURVEY</option>
                  <option value="ENVIRONMENTAL">ENVIRONMENTAL</option>
                  <option value="NUCLEAR">NUCLEAR</option>
                  <option value="ADME">ADME</option>
                  <option value="NANO">NANO</option>
                  <option value="ICE">ICE</option>
                  <option value="AERO">AERO</option>
                  <option value="AI">AI</option>
                </select>
              </div>

              <div className=" flex pt-4 items-center justify-center">
                <button className="bg-purple-200 px-6 py-2 sm:mt-0 rounded-lg font-semibold drop-shadow-lg text-purple-800 hover:bg-purple-300 transition hover:scale-105 shadow-lg" onClick={handleSaveProfile}>Done</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}