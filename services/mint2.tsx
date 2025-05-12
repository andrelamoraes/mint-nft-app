import { createLightAccount } from "@account-kit/smart-contracts";
import { sepolia } from "@account-kit/infra";
import { http } from "viem";
import { signer } from "../signer";

const account = await createLightAccount({
  signer,
  chain: sepolia,
  transport: http(`https://avax-fuji.g.alchemy.com/v2/SaZA6j8tWVWbSuoWu_O_dFbSvsNs_rQs`),
});

const user = await signer.getAuthDetails().catch(() => null);