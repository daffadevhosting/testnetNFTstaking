import React, { useState } from 'react';
import {
  useNetwork,
  useNetworkMismatch,
  ChainId,
  useChainId
} from "@thirdweb-dev/react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiErrorWarningFill } from "react-icons/ri";
import { ChainIdname } from '../const/aLinks';
import styles from "../styles/App.module.scss";


export default function SwitchNetwork() {
  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);

  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const networkName = ChainIdname();

  return (
<>
{networkMismatch ? (
      <Modal show={showModal}
        centered
        backdrop="static"
        keyboard={false}>
        <Modal.Header>
          <Modal.Title style={{color: '#cd0228',justifyContent: 'center'}} className={styles.flx_center}><RiErrorWarningFill/> Salah Jaringan</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>Pindah ke jaringan {networkName} untuk memulai.<br /><p />
    <Button onClick={() => switchNetwork(Number(process.env.NEXT_PUBLIC_CHAIN_ID))} className={styles.mainButton}>
      Ganti Jaringan
    </Button>
        </Modal.Body>
      </Modal>) : (<></>)}
</>
    );
}
