"use client";
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";
import { FaUserCircle } from "react-icons/fa";
import Cube from "@/public/images/cube.svg";
import { ClaimButton } from "../claim/ClaimButton";

export const AccountKitButton = () => {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  return (
    <>
      <div className="w-full">
        {signerStatus.isInitializing ? (
          <>Loading...</>
        ) : user ? (
          <div className="flex flex-row items-center justify-between p-2">
            <div className="flex flex-row items-center justify-between gap-3">
              <FaUserCircle size={20} /> {user.email ?? user.address}
            </div>

            <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => logout()}>
              Desconectar
            </button>
          </div>
        ) : (
          <button className="m-2 absolute right-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 
                           focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 
                           mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={openAuthModal}>
            Conectar
          </button>
        )}
      </div>
    </>
  );
}