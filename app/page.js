"use client";
import { useState, useEffect } from "react";
import MintTokenModal from "./components/Mint-token";
import TransferTokenModal from "./components/Transfer-token";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState(null);

  const [isMintModalOpen, setIsMintModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  const openMintModal = () => {
    setIsMintModalOpen(true);
  };

  const closeMintModal = () => {
    setIsMintModalOpen(false);
  };

  const openTransferModal = () => {
    setIsTransferModalOpen(true);
  };

  const closeTransferModal = () => {
    setIsTransferModalOpen(false);
  };

  useEffect(() => {
    const storedWalletAddress = sessionStorage.getItem("walletAddress");
    if (storedWalletAddress) {
      setWalletAddress(storedWalletAddress);
    }
  }, []);

  const clearWalletAddress = () => {
    sessionStorage.removeItem("walletAddress");
    setWalletAddress(null);
  };

  //fix function here late
  const handleMintSubmit = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/token/mint`,
        {
          method: "POST",
          headers: {
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mint token");
      }

      const result = await response.json();
      console.log("Token Minted:", result);

      if (!walletAddress) {
        throw new Error("Wallet address not found in the response");
      }

      toast.success(
        `🦄 Minted token successfully!
        Wallet address: ${walletAddress}`,
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      closeModal();
    } catch (error) {
      console.error("Error minting token:", error);
      toast.error("🦄 Error minting token", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // Don't send the request if there's an error
      return;
    }
  };

  //fix function here late
  const handleTransferSubmit = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/token/token-transfer`,
        {
          method: "POST",
          headers: {
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to transfer token");
      }

      const result = await response.json();
      console.log("Transfered Token:", result);
      // const walletAddress = result.result.wallet.wallet_address;
      // //   console.log("Wallet address:", walletAddress);
      // // Store the wallet address in sessionStorage
      // sessionStorage.setItem("walletAddress", walletAddress);

      if (!walletAddress) {
        throw new Error("Wallet address not found in the response");
      }

      toast.success(
        `🦄 Token transfered successfully!
        Wallet address: ${walletAddress}`,
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      closeModal();
    } catch (error) {
      console.error("Error transfering token:", error);
      toast.error("🦄 Error transfering token", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // Don't send the request if there's an error
      return;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      

      {/* //==========================Health Dashboard========================== */}

      <div className="container mx-auto mt-8 p-4 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Scheduling Section */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">Scheduling</h3>
          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <p className="text-sm font-medium">Appointments</p>
            <p className="text-xl font-bold">12</p>
            <p className="text-xs text-gray-500">Last Updated: 1 hour ago</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-sm font-medium">Roster</p>
            <p className="text-xl font-bold">2</p>
            <p className="text-xs text-gray-500">Last Updated: 2 weeks ago</p>
          </div>
        </div>

        {/* Records Section */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">Records</h3>
          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <p className="text-sm font-medium">Patients</p>
            <p className="text-xl font-bold">128</p>
            <p className="text-xs text-gray-500">Last Updated: 2 min ago</p>
          </div>
        </div>

        {/* Financial Section */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">Financial</h3>
          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <p className="text-sm font-medium">Billing</p>
            <p className="text-xl font-bold">24</p>
            <p className="text-xs text-gray-500">Last Updated: 2 days ago</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <p className="text-sm font-medium">Invoices</p>
            <p className="text-xl font-bold">36</p>
            <p className="text-xs text-gray-500">Last Updated: 1 week ago</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-sm font-medium">Insurance</p>
            <p className="text-xl font-bold">87</p>
            <p className="text-xs text-gray-500">Last Updated: 3 hours ago</p>
          </div>
        </div>

        {/* Contacts Section */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">Contacts</h3>
          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <p className="text-sm font-medium">Staff</p>
            <p className="text-xl font-bold">62</p>
            <p className="text-xs text-gray-500">Last Updated: 2 days ago</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <p className="text-sm font-medium">Pharmacy</p>
            <p className="text-xl font-bold">25</p>
            <p className="text-xs text-gray-500">Last Updated: 4 days ago</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-sm font-medium">Hospital</p>
            <p className="text-xl font-bold">17</p>
            <p className="text-xs text-gray-500">Last Updated: 3 hours ago</p>
          </div>
        </div>
        
      </div>

      {/* Notifications Section */}

      <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <div style={{ backgroundColor: '#45586a' }} className="bg-gray-100 p-4 rounded-md mb-4">
            <p className="text-sm font-medium text-white">New patient data received</p>
            <p className="text-sm text-white">Sandra Cook - 09:45, 22 Jan 2018</p>
            <button className="text-blue-500 text-sm mt-1">View Details</button>
          </div>
          <div style={{ backgroundColor: '#45586a' }} className="bg-gray-100 p-4 rounded-md mb-4">
            <p className="text-sm font-medium text-white">New patient data received</p>
            <p className="text-sm text-white">Sandra Cook - 09:45, 22 Jan 2018</p>
            <button className="text-blue-500 text-sm mt-1">View Details</button>
          </div>
          <div style={{ backgroundColor: '#45586a' }} className="bg-gray-100 p-4 rounded-md">
            <p className="text-bg font-medium text-white">Patient revoking access</p><br></br>
            <div style={{display: 'flex' }}>
              <div>
            <img src="https://via.placeholder.com/150/000000/FFFFFF/?text=Anon" alt="Annoymous Patient" className="w-10 h-10 rounded-full mr-4"/>
            </div>
            <div>
                <p className="text-sm text-white">Herman Patterson - 09:30, 18 Dec 2017</p>
                <button className="text-blue-500 text-sm mt-1">View Details</button>
              </div>
            </div>            
          </div>
        </div>
    </div>

    {/* //======================================== Patient Database UI*/}
      <div className="container mx-auto mt-8 p-4 bg-white shadow-lg rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Sandra Cook</h2>
        <button className="border rounded-md py-2 px-4 hover:bg-blue-500 hover:text-white transition-all duration-300">
          Save & Create
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Section */}
        <div className="col-span-1 lg:col-span-2">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Today's Consultation</h3>
            <div className="p-4 bg-gray-100 rounded-md">
              <p><strong>Complaint/Symptoms:</strong> New patient, Diabetes</p>
              <p><strong>New Diagnosis:</strong> 250 Diabetes / Diabetes mellitus</p>
              <p><strong>Referral Notes:</strong> N/A</p>
              <p><strong>Current Medications:</strong> N/A</p>
              <p><strong>Prescribe Medication:</strong> N/A</p>
              <p><strong>Patient Documents:</strong> N/A</p>
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="col-span-1">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Medical History</h3>
            <div className="p-4 bg-gray-100 rounded-md">
              <p><strong>Prescription:</strong> Dr. Levine, Family Care Clinic</p>
              <p><strong>GP Visit:</strong> Dr. Levine, Family Care Clinic</p>
              <p><strong>Discharge Letter:</strong> Saint Luke's Hospital</p>
              <p><strong>Surgery Documentation:</strong> Saint Luke's Hospital</p>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Prescription</h3>
            <div className="p-4 bg-gray-100 rounded-md">
              <p><strong>Referee:</strong> Dr. Levine, Family Care Clinic</p>
              <p><strong>Date & Time:</strong> 09/11/16, 11.26 am</p>
              <p><strong>Practice Address:</strong> 44 Rath Overpass Suite 997</p>
              <p><strong>Practice Details:</strong> Pain Killer - Paracetamol 1,500 mg IV q12 hours x 3 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
      {/* //========================================================================== */}
      <p className="text-sm text-gray-500 lowercase font-normal mt-4">
        {walletAddress ? (
          <>
            {`Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(
              -4
            )}`}
            <div className="flex flex-col items-center justify-center">
              <button
                onClick={clearWalletAddress}
                className="w-full mt-4 border rounded-md py-2 px-4 hover:bg-black hover:text-white transition-all duration-300"
              >
                Disconnect Wallet
              </button>
              <button
                onClick={openMintModal}
                className="mt-4 border w-full rounded-md py-2 px-4 hover:bg-black hover:text-white transition-all duration-300"
              >
                Mint Token
              </button>

              <button
                onClick={openTransferModal}
                className="mt-4 w-full border rounded-md py-2 px-4 hover:bg-black hover:text-white transition-all duration-300"
              >
                Transfer Token
              </button>
            </div>
          </>
        ) : (
          "Create Wallet to Get Started"
        )}
      </p>
      <AnimatePresence>
        {isMintModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <MintTokenModal
              onSubmit={handleMintSubmit}
              onClose={closeMintModal}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isTransferModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <TransferTokenModal
              onSubmit={handleTransferSubmit}
              onClose={closeTransferModal}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
}
