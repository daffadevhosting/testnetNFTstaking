import type { NextPage } from "next";
import styles from "../styles/App.module.scss";
import {
  useAddress,
  useEditionDrop,
  useOwnedNFTs,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import { DROP_EDITION_ADDRESS } from "../const/contract";
import MintContainer from "../components/MintContainer";
import MiningToken from "../components/mining";
import SwitchNetwork from "../components/SwitchNetwork";
import Page from '../components/page';
import ConnectWallet from "../components/connect";
import LoadingSection from "../components/LoadingSection";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const editionDrop = useEditionDrop(DROP_EDITION_ADDRESS);

  const address = useAddress();
  const router = useRouter();

  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const {
    data: ownedNfts,
    isLoading,
    isError,
  } = useOwnedNFTs(editionDrop, address);

  // 0. Wallet Connect - required to check if they own an NFT
  if (!address) {
    return (
      <div className={styles.container}>
        <Page />
        <ConnectWallet />
      </div>
    );
  }

  // 1. Loading
  if (isLoading) {
    return <LoadingSection />;
  }

  // Something went wrong
  if (!ownedNfts || isError) {
    return <div className={styles.midcenter}>Error</div>;
  }

  // 2. No NFTs - mint page
  if (ownedNfts.length === 0) {
    return (
      <div className={styles.container}>
{networkMismatch ? (
        <SwitchNetwork />
) : (
        <MintContainer />
)}
      </div>
    );
  }

  // 3. Has NFT already - show button to take to game
  return (
    <div className={styles.container}>
{networkMismatch ? (
        <SwitchNetwork />
) : (
        <MiningToken />
)}
    </div>
  );
};

export default Home;
