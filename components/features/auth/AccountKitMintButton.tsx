"use client";
import { useAuthModal, useLogout, useSignerStatus, useUser, useSigner} from "@account-kit/react";
import { FaUserCircle } from "react-icons/fa";
import { ethers } from "ethers";
import { useState } from "react";
import ABI from '../../../services/json/abi.json'
import { avalancheFuji } from "viem/chains";

const CONTRACT_ADDRESS = "0x32865A052005eC534c495d37bb58a06fCB7e111d";
const btncDisconnect  = "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" ;
const btnConnect = "m-2 absolute right-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" ;
export const AccountKitMintButton = () => {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();
  const [minting, setMinting] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="w-full">
      {signerStatus.isInitializing ? (
        <>Loading...</>
      ) : user ? (
        <div className="flex justify-between items-center gap-3 p-2">
          <div className="flex flex-row items-center gap-3">
            <FaUserCircle size={20} /> {user.email ?? user.address}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button 
            className={btncDisconnect}
            onClick={()=> logout()}>
            Desconectar
          </button>
        </div>
      ) : (
        <button 
          className={btnConnect}
          onClick={openAuthModal}>
          Entrar
        </button>
      )}
    </div>
  );
};
