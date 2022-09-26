import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Disconnect from './Disconnect';

function Navigation() {
  return (
    <Container>
      <Navbar expand="lg" variant="light" bg="white" sticky="top">
        <Container>
          <Navbar.Brand href="#">TestNet</Navbar.Brand>
          <Disconnect/>
        </Container>
      </Navbar>
    </Container>
  );
}

export default Navigation;
