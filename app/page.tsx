"use client";
import { AccountKitMintButton } from "@/components/features/auth/AccountKitMintButton";
import Cube from "@/public/images/cube.svg";
import { ethers } from "ethers";
import { useState } from "react";
import ABI from '../services/json/abi.json';
import { useUser } from "@account-kit/react";
import { toast } from "react-toastify";
import Image from "next/image";

export default function Home() {
  const [minting, setMinting] = useState(false);
  const [error, setError] = useState("");
  const user = useUser();
  const btnClass = "bg-[rgba(35,35,36,1)] border text-white text-lg px-9 py-3 rounded-[20px] border-[rgba(228,228,228,1)] border-solid hover:bg-[rgba(50,50,51,1)]";

  const provider = new ethers.JsonRpcProvider("https://avax-fuji.g.alchemy.com/v2/SaZA6j8tWVWbSuoWu_O_dFbSvsNs_rQs");

  const handleMint = async () => {
    try {
      setMinting(true);
      setError("");

      if (!user || !user.address) throw new Error("User not authenticated.");

      const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

      const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ABI.abi, signer);

      const tx = await contract.publicMint(1, "", {
        value: BigInt(0),
      });

      toast.promise(
        tx.wait().then(() => {
          toast(
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                maxWidth: 500,
                padding: '1rem',
                boxSizing: 'border-box',
                color: '#fff',
                textAlign: 'center',
                backgroundColor: '#111', // só pra destacar
              }}
            >
              <Image
                src="https://tan-informal-minnow-205.mypinata.cloud/ipfs/bafkreiev3pysrjpjin6sdvvrsk42fzroy2ileclvtvf3j722zk6343hmzm"
                alt="Colecionável"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  marginBottom: '1rem',
                }}
              />
              <span>Colecionável resgatado com sucesso!</span>
            </div>,
            {
              position: 'top-center',
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            }
          );
        }),
        {
          pending: 'Mintando...',
          error: 'Não foi possível mintar o NFT.',
        },
        {
          position: 'top-center',
          autoClose: false,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        }
      );
    } catch (err) {
      setError(String(err) || "Error trying to mint NFT.");
    } finally {
      setMinting(false);
    }
  };


  return (
    <div className="flex flex-col w-full h-screen text-center">
      <div className="fixed top-0 left-0 w-full flex justify-center p-4 z-10">
        <AccountKitMintButton />
      </div>
      <div className="flex flex-1 flex-col justify-center items-center gap-12">
        <Cube />
        {user ? (
        <button
          className={btnClass}
          onClick={handleMint}
          disabled={minting}
        >
          {minting ? "Mintando..." : "RESGATAR"}
        </button> ) : <span> Usuário não conectado.</span>}
      </div>
    </div> 
  );
}
