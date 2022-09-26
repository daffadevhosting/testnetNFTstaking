import {
  useAddress,
  useContract,
  useEditionDrop,
  useToken,
} from "@thirdweb-dev/react";
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CurrentGear from "../components/CurrentGear";
import LoadingSection from "../components/LoadingSection";
import OwnedGear from "../components/OwnedGear";
import Rewards from "../components/Rewards";
import Shop from "../components/Shop";
import ConnectWallet from "../components/connect";
import {
  MINING_CONTRACT_ADDRESS,
  DROP_EDITION_ADDRESS,
  INITIAL_EDITION_ADDRESS,
  INITIAL_TOKEN_ADDRESS,
} from "../const/contract";
import styles from "../styles/App.module.scss";

export default function Mining() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const address = useAddress();
  const { contract: miningContract } = useContract(MINING_CONTRACT_ADDRESS);
  const dropContract = useEditionDrop(DROP_EDITION_ADDRESS);
  const unknownContract = useEditionDrop(INITIAL_EDITION_ADDRESS);
  const tokenContract = useToken(INITIAL_TOKEN_ADDRESS);

  if (!address) {
    return (
      <div className={styles.container}>
        <ConnectWallet />
      </div>
    );
  }

  return (
    <div>
      {miningContract &&
      dropContract &&
      tokenContract &&
      unknownContract ? (
        <div className={styles.mainSection}>
          <CurrentGear
            miningContract={miningContract}
            dropContract={dropContract}
            unknownContract={unknownContract}
          />
          <Rewards
            miningContract={miningContract}
            tokenContract={tokenContract}
          />
        </div>
      ) : (
        <LoadingSection />
      )}

      <hr className={`${styles.divider} ${styles.bigSpacerTop}`} />

      {unknownContract && miningContract ? (
        <>
          <h2 className={`${styles.noGapTop} ${styles.noGapBottom}`}>
            Your Owned NFTs
          </h2>
          <div
            style={{
              width: "100%",
              minHeight: "10rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 8,
            }}
          >
            <OwnedGear
              unknownContract={unknownContract}
              miningContract={miningContract}
            />
          </div>
        </>
      ) : (
        <LoadingSection />
      )}

      <hr className={`${styles.divider} ${styles.bigSpacerTop}`} />

      {unknownContract && tokenContract ? (
        <>
      <Button variant="primary" onClick={handleShow} className="me-2">
        Shop
      </Button>
      <Offcanvas show={show} placement='bottom' onHide={handleClose} style={{height: '80vh'}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shop</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div
            style={{
              width: "100%",
              minHeight: "10rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 8,
            }}
          >
            <Shop unknownContract={unknownContract} />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
        </>
      ) : (
        <LoadingSection />
      )}
    </div>
  );
}
