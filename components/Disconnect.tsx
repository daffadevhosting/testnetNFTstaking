import React from "react";
import {
  useAddress,
  useDisconnect,
} from "@thirdweb-dev/react";
import Button from 'react-bootstrap/Button';


export default function Disconnect() {
  const address = useAddress();
  const disconnectWallet = useDisconnect();

  return (
    <>
        {address ? (
        <Button onClick={() => disconnectWallet()}>
                    <p style={{margin: 0}}>{address.slice(0, 7).concat("*").concat(address.slice(-4))}</p>
        </Button>
          ) : (<></>)}
    </>
  );
}
