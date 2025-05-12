"use client";
import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { ethers } from 'ethers';
import abi from './json/abi.json'
import { useUser, useSignerStatus, useSigner } from '@account-kit/react';


const COLLECTION_ADDRESS = '0x32865A052005eC534c495d37bb58a06fCB7e111d';
const FUJI_CHAIN_ID_HEX = '0xa869'; // 43113
const FUJI_PARAMS = {
  chainId: FUJI_CHAIN_ID_HEX,
  chainName: 'Avalanche Fuji Testnet',
  rpcUrls: ['https://avax-fuji.g.alchemy.com/v2/SaZA6j8tWVWbSuoWu_O_dFbSvsNs_rQs'],
  nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
  blockExplorerUrls: ['https://testnet.snowtrace.io'],
};

declare global {
  interface Window {
    ethereum?: any;
  }
}

const MintPage: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isInitializing } = useSignerStatus();
  const user = useUser();

  function getMetaMaskProvider(): any {
    if (!window.ethereum) return null;
    if (Array.isArray(window.ethereum.providers)) {
      return window.ethereum.providers.find((p: any) => p.isMetaMask);
    }
    return window.ethereum.isMetaMask ? window.ethereum : null;
  }

  async function switchToFuji(mm: any) {
    try {
      await mm.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: FUJI_CHAIN_ID_HEX }],
      });
    } catch (switchError: any) {
      // se a rede não existe, adiciona
      if (switchError.code === 4902) {
        await mm.request({
          method: 'wallet_addEthereumChain',
          params: [FUJI_PARAMS],
        });
        // depois de adicionar, tenta novamente
        await mm.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: FUJI_CHAIN_ID_HEX }],
        });
      } else {
        throw switchError;
      }
    }
  }

  async function handleMint() {
    try {
      setLoading(true);
      setError(null);

      const mm = getMetaMaskProvider();
      if (!mm) throw new Error('MetaMask não encontrado');

      // pede conect
      await mm.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.BrowserProvider(mm);
      const { chainId } = await provider.getNetwork();

      if (chainId !== BigInt(43113)) {
        await switchToFuji(mm);
      }

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(COLLECTION_ADDRESS,abi.abi, signer);

      const tx = await contract.publicMint(1, '', { value: 0n });
      await tx.wait();
      console.log('transacao',tx);
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">      
      {success ? (
        <p className="text-green-600 text-xl">✅ Mintado com sucesso!</p>
      ) : (
        <>
          <button
            onClick={handleMint}
            disabled={loading}
            className="bg-[rgba(35,35,36,1)] border text-white text-lg px-9 py-3 rounded-[20px] border-[rgba(228,228,228,1)] border-solid hover:bg-[rgba(50,50,51,1)]"
          >
            {loading ? 'Processando...' : 'RESGATAR'}
          </button>
          {error && <p className="mt-4 text-red-600">❌ {error}</p>}
        </>
      )}
    </div>
  );
};


export default MintPage;
