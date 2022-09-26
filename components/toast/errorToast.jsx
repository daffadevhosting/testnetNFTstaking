import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function ErrorToast() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleClose = () => setShow(false);



  return (
        <Toast onHide={handleClose} show={show} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Gagal</strong>
            <small>Claim nft</small>
          </Toast.Header>
          <Toast.Body>Gagal Claim NFT..!</Toast.Body>
        </Toast>
  );
}

export default ErrorToast;
