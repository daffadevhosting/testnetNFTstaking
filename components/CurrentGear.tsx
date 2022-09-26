import { ThirdwebNftMedia, useAddress, useDisconnect, useNFT } from "@thirdweb-dev/react";
import { EditionDrop, SmartContract } from "@thirdweb-dev/sdk";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Disconnect from './Disconnect';
import ContractMappingResponse from "../types/ContractMappingResponse";
import EditionDropMetadata from "../types/EditionDropMetadata";
import GameplayAnimation from "./GameplayAnimation";
import styles from "../styles/App.module.scss";

type Props = {
  miningContract: SmartContract<any>;
  dropContract: EditionDrop;
  unknownContract: EditionDrop;
};

/**
 * This component shows the:
 * - Currently equipped miner drop (right now there is just one (token ID 0))
 * - Currently equipped drop's unknown
 */
export default function CurrentGear({
  miningContract,
  dropContract,
  unknownContract,
}: Props) {
  const address = useAddress();
  const disconnectWallet = useDisconnect();

  const { data: playerNft } = useNFT(dropContract, 0);
  const [unknown, setUnknown] = useState<EditionDropMetadata>();

  useEffect(() => {
    (async () => {
      if (!address) return;

      const p = (await miningContract.call(
        "miningToken",
        address
      )) as ContractMappingResponse;

      // Now we have the tokenId of the equipped unknown, if there is one, fetch the metadata for it
      if (p.isData) {
        const unknownMetadata = await unknownContract.get(p.value);
        setUnknown(unknownMetadata);
      }
    })();
  }, [address, miningContract, unknownContract]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
        {/* Currently equipped player */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",  borderRadius: 16 }}>
          {playerNft && (
            <ThirdwebNftMedia metadata={playerNft?.metadata} height={"64"} />

          )}
        <Disconnect/>
        </div>
      <h2 className={`${styles.noGapTop} `}>Staked Items</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {/* Currently equipped unknown */}
        <div
          style={{ outline: "1px solid grey", borderRadius: 16, marginLeft: 8 }}
        >
          {unknown && (
            // @ts-ignore
            <ThirdwebNftMedia metadata={unknown.metadata} height={"200"} />
          )}
        </div>
      </div>
    </div>
  );
}
