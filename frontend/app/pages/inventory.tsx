"use client";
import MNavbar from "../components/mnavbar";
import Charms from "../components/charms";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { Plus } from "lucide-react";
import client from "@/lib/ApolloClient";
import { getUserInventory } from "@/lib/getUserInventory";
import { getCharmById } from "@/lib/getCharmById";
import { random } from '../../lib/randomCharms';

export default function Inventory() {
  const [user, setUser] = useState("Login");
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [uid,setUid] = useState('');
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const displayName = user.displayName;
        setUser(displayName || "Login");
        setLogin(true);
        setEmail(user.email ||'');
        setUid(user.uid);
      }
    });
  }, []);
  
  const [isLoading,setIsLoading] = useState(false);

  useEffect(() => {
    if (uid) {
      fetchInventory(uid);
    }
  }, [uid]);
  
  const [charms, setCharms] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const fetchInventory = async (userId: string) => {
    try {
      const { data } = await client.query({
        query: getUserInventory,
        variables: { userId },
        fetchPolicy: 'network-only'
      });
      console.log("Inventory data:", data.getUserInventory);
      setInventory(data.getUserInventory);
      
      // Pass the data directly instead of using the state variable
      fetchCharmDetails(data.getUserInventory);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };
  
  const fetchCharmDetails = async (inventoryItems: any[]) => {
    if (!inventoryItems || inventoryItems.length === 0) {
      console.log("No inventory items to fetch details for");
      setCharms([]);
      return;
    }
    
    try {
      console.log("Fetching details for inventory items:", inventoryItems);
      const charmDetailsPromises = inventoryItems.map(async (item) => {
        try {
          const { data } = await client.query({
            query: getCharmById,
            variables: { charmId: item.charmId },
          });
          
          console.log(`Details for charm ${item.charmId}:`, data);
          
          // Assuming data.filterCharms is an array, take the first item
          // and add the expiration date from inventory
          if (data.filterCharms && data.filterCharms.length > 0) {
            return {
              ...data.filterCharms[0],
              expiresAt: item.expiresAt
            };
          }
          return null;
        } catch (err) {
          console.error(`Error fetching details for charm ${item.charmId}:`, err);
          return null;
        }
      });
  
      // Wait for all promises to resolve
      const charmsData = await Promise.all(charmDetailsPromises);
      
      // Filter out any null values
      const validCharms = charmsData.filter(charm => charm !== null);
      console.log("Final charms data:", validCharms);
      
      setCharms(validCharms);
    } catch (error) {
      console.error("Error fetching charm details:", error);
      setCharms([]);
    }
  };
  const formatExpiration = (timestamp: string) => {
    // Parse the timestamp to a number (milliseconds since epoch)
    const expirationTime = parseInt(timestamp);
    const now = Date.now();
    
    // Calculate difference in milliseconds
    const diffMs = expirationTime - now;
    
    // If expired
    if (diffMs <= 0) {
      return "Expired";
    }
    
    // Convert to hours
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    // Get days and remaining hours
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;
    
    // Format the output
    let result = '';
    
    if (days > 0) {
      result += days === 1 ? '1 day ' : `${days} days `;
    }
    
    if (hours > 0 || days === 0) {
      result += hours === 1 ? '1 hour' : `${hours} hours`;
    }
    
    return result.trim();
  };
  
  const [errorMessage, setErrorMessage] = useState("");
  const handleRandomCharms = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(""); // Clear any previous errors
  
      const { data } = await client.mutate({
        mutation: random,
        variables: {
          userId: uid,
        },
      });
  
      console.log("Random charm result:", data);
  
      fetchInventory(uid);
    } catch (error: unknown) {
      // Narrow down the error type
      if (error instanceof Error && error.message.includes("Inventory full!")) {
        setErrorMessage("Inventory full! Cannot randomize more charms.");
  
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen grid grid-rows-[auto_1fr] md:overflow-hidden lg:overflow-hidden">
      {/* Navbar */}
      <MNavbar user={user} email={email} login={login} onClick={() => {}} lp={false}/>

      {/* Main content */}
      <div className="grid grid-cols-5 md:overflow-hidden lg:overflow-hidden">
        {/* Side spacing */}
        <div className="col-span-1"></div>
        {/* CONTAINER */}
        <div className="col-span-5 md:col-span-3 lg:col-span-3 font-poppins sm:pl-6 sm:pr-6 grid grid-rows-[auto_1fr_auto] md:overflow-hidden lg:overflow-hidden">
          {/* Error Banner */}
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 mx-4 mt-4 text-center">
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}
          {/* TEXT */}
          <div className="text-center md:mt-20 lg:mt-20">
            <h1 className="text-black text-3xl font-[600] mb-1">
              YOUR INVENTORY
            </h1>
            <p className="text-black">Maximum 3 Charms</p>
          </div>
          {/* CHARMS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 self-center">
            {/* First charm with custom layout */}
            {charms.map((charm) => (
              <div key={`${charm.id}-${charm.expiresAt}`} className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-1 items-start">
                <div className="col-span-1 md:col-span-full mb-4">
                  <Charms
                    id={charm.id}
                    name={charm.name}
                    image={charm.image}
                    variant={charm.variant}
                    quote={charm.quote}
                    isRare={charm.rarity !== "COMMON"}
                    category={charm.category}
                    quantity={charm.availableQuantity}
                    invp={true}
                  />
                </div>

                {/* Expiration Text */}
                <div className="col-span-1 md:col-span-full flex items-center justify-center w-full h-full">
                  <p className="text-sm text-gray-600 md:text-center md:w-full">
                    Expires in <span className="font-bold">{formatExpiration(charm.expiresAt)}</span>
                  </p>
                </div>
              </div>
            ))}
            {Array.from({ length: Math.max(0, 3 - inventory.length) }).map((_, index) => (
              <div key={index} className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-1 items-start">
                <div className="col-span-1 md:col-span-full">
                  <div className="w-full aspect-[279.67/355.69] border-2 border-dashed border-purple-300 rounded-3xl grid items-center justify-center">
                    <button
                      className="w-12 h-12 bg-purple-100 rounded-full grid items-center justify-center hover:bg-purple-300 transition shadow-lg hover:duration-200 hover:scale-105"
                      onClick={() => {
                        router.push("/marketplace");
                      }}
                    >
                      <Plus className="w-6 h-6 text-purple-600" />
                    </button>
                  </div>
                </div>
                {/* Empty right column on small screens */}
                <div className="col-span-1 md:hidden"></div>
              </div>
            ))}
          </div>
          {/* BUTTON */}
          <div className="text-center sm:pb-6 md:pb-24 lg:pb-24">
            <button className={`bg-purple-200 px-6 py-2 rounded-lg text-purple-900 hover:bg-purple-300 transition hover:scale-105 hover:duration-200 shadow-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleRandomCharms} disabled={isLoading}>
            {isLoading ? "Loading..." : "Random"}
            </button>
          </div>
        </div>
        {/* Side spacing */}
        <div className="col-span-1"></div>
      </div>
    </div>
  );
}

