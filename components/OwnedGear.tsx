import {
  ThirdwebNftMedia,
  useAddress,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { EditionDrop, SmartContract } from "@thirdweb-dev/sdk";
import React from "react";
import LoadingSection from "./LoadingSection";
import styles from "../styles/App.module.scss";
import { BigNumber } from "ethers";
import { MINING_CONTRACT_ADDRESS } from "../const/contract";

type Props = {
  unknownContract: EditionDrop;
  miningContract: SmartContract<any>;
};

export default function OwnedGear({ unknownContract, miningContract }: Props) {
  const address = useAddress();
  const { data: ownedUnknown, isLoading } = useOwnedNFTs(
    unknownContract,
    address
  );

  if (isLoading) {
    return <LoadingSection />;
  }

  async function equip(id: BigNumber) {
    if (!address) return;

    // The contract requires approval to be able to transfer the unknown
    const hasApproval = await unknownContract.isApproved(
      address,
      MINING_CONTRACT_ADDRESS
    );

    if (!hasApproval) {
      await unknownContract.setApprovalForAll(MINING_CONTRACT_ADDRESS, true);
    }

    await miningContract.call("stake", id);

    // Refresh the page
    window.location.reload();
  }

  return (
    <>
      <div className={styles.nftBoxGrid}>
        {ownedUnknown?.map((p) => (
          <div className={styles.nftBox} key={p.metadata.id.toString()}>
            <ThirdwebNftMedia
              metadata={p.metadata}
              className={`${styles.nftMedia} ${styles.spacerTop}`}
              height={"64"}
            />
            <h3>{p.metadata.name}</h3>

            <button
              onClick={() => equip(p.metadata.id)}
              className={`${styles.mainButton} ${styles.spacerBottom}`}
            >
              Equip
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
