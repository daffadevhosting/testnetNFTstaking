import {
  NFT,
  ThirdwebNftMedia,
  useActiveClaimCondition,
  useAddress,
  useClaimNFT,
} from "@thirdweb-dev/react";
import { EditionDrop } from "@thirdweb-dev/sdk";
import { BigNumber, ethers } from "ethers";
import React from "react";
import styles from "../styles/App.module.scss";

type Props = {
  unknownContract: EditionDrop;
  item: NFT<EditionDrop>;
};

export default function ShopItem({ item, unknownContract }: Props) {
  const address = useAddress();

  const { data: claimCondition } = useActiveClaimCondition(
    unknownContract,
    item.metadata.id
  );

  const { mutate: claimNft, isLoading } = useClaimNFT(unknownContract);

  console.log(claimCondition);

  async function buy(id: BigNumber) {
    if (!address) return;

    try {
      claimNft({
        to: address,
        tokenId: id,
        quantity: 1,
      });
    } catch (e) {
      console.error(e);
      alert("Something went wrong. Are you sure you have enough tokens?");
    }
  }

  return (
    <div className={styles.nftBox} key={item.metadata.id.toString()}>
      <ThirdwebNftMedia
        metadata={item.metadata}
        className={`${styles.nftMedia} ${styles.spacerTop}`}
        height={"64"}
      />
      <h3>{item.metadata.name}</h3>
      <p>
        Price:{" "}
        <b>
          {claimCondition && ethers.utils.formatUnits(claimCondition?.price)}{" "} ID
        </b>
      </p>

      <button
        onClick={() => buy(item.metadata.id)}
        className={`${styles.mainButton} ${styles.spacerBottom}`}
      >
        {isLoading ? "buying..." : "Buy"}
      </button>
    </div>
  );
}
