import { useAddress, useMetamask, useWalletConnect, useCoinbaseWallet, useDisconnect } from "@thirdweb-dev/react";
import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import style from "../styles/App.module.scss";


export default function Connect() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const disconnectWallet = useDisconnect();

return (
<>
<Stack className="col-md-5 mx-auto">
    <Card className={`${style.loginBox} ${style.glass}`} style={{maxWidth: '22rem'}}>
      <Card.Body>
           <Card.Title style={{textAlign: 'center'}}>Connect your Wallet</Card.Title>
    <ListGroup className={style.glass}>
      <ListGroup.Item className={style.flx_btn_between} action  
          onClick={connectWithCoinbaseWallet}>
        Coinbase <i className={style.coinbase}></i>
      </ListGroup.Item>
      <ListGroup.Item className={style.flx_btn_between} action  
          onClick={connectWithWalletConnect}>
        WalletConnect <i className={style.walletconnect}></i>
      </ListGroup.Item>
      <ListGroup.Item className={style.flx_btn_between} action 
          onClick={connectWithMetamask}>
        MetaMask <i className={style.metamask}></i>
      </ListGroup.Item>
    </ListGroup>
      </Card.Body>
    </Card>
</Stack>
</>
    );
}
