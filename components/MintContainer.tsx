import {
  ThirdwebNftMedia,
  useAddress,
  useClaimNFT,
  useEditionDrop,
} from "@thirdweb-dev/react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Navigation from './Navbar';
import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { DROP_EDITION_ADDRESS } from "../const/contract";
import styles from "../styles/App.module.scss";

export default function MintContainer() {
  const editionDrop = useEditionDrop(DROP_EDITION_ADDRESS);
  const { mutate: claim, isLoading } = useClaimNFT(editionDrop);
  const address = useAddress();
 
  // Function to mint/claim an NFT
  async function mint() {
    try {
      claim(
        {
            quantity: 1,
            to: address as string,
            tokenId: 0,
          },
        {
          onSuccess: (data) => {
            Swal.fire({
              title: 'Success!',
              text: 'NFT berhasil diclaim..!',
              icon: 'success',
              confirmButtonText: 'Cool'
              });
          },
          onError: (error) => {
            const e = error;
            Swal.fire({
              title: 'Gagal',
              text: 'Gagal Claim NFT..!',
              icon: 'error',
              confirmButtonText: 'Blah'
              });
          },
        }
      );
    } catch (error) {
            Swal.fire({
              title: 'Error!',
              text: 'Do you want to continue',
              icon: 'error',
              confirmButtonText: 'Blah'
              });
        }
  }


  return (
<>
<Navigation />
    <div className={styles.collectionContainer}>
      <h1>FreePass Card</h1>

      <p>Claim your FreePass card NFT to join.</p>

      <Card className={`${styles.nftBox} ${styles.spacerBottom}`}>
        <Image src="/avatar.gif" width={280} height={280} alt='avatar' />

        {isLoading ? (
      <Button className={styles.btn_absBottom} disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span> Minting...</span>
      </Button>
    ) : (
      <Button className={styles.btn_absBottom}
        onClick={() =>
          mint()
        }

      >Claim</Button>
 )}
      </Card>
    </div>
</>
  );
}
