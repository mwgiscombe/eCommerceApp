import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState} from 'react'
import Form from 'react-bootstrap/Form'
import shoppingcartstill from '../assets/shoppingcartstill.png'
import shoppingcart from '../assets/shopping-cart.gif'
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Dropdown from 'react-bootstrap/Dropdown';
import userImage from '../assets/user.png'
import heart from '../assets/fullHeart.png'
import logo from '../assets/logo.png'

function MyNav({balance, setBalance, cartItems, added, show, setShow}) {
  const [showModal, setShowModal]=useState(false)
  

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  return (
    <>
    <Navbar expand="lg" className="bg-body-white navbar shadow-sm">
      <Container>
        <Link to='/'><Navbar.Brand><img className='logo' src={logo} /></Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
          </Nav>
          
         <Link to='/cart'>
         <div className='shoppingCart'>
          {cartItems.length > 0 ? <Badge bg="warning" text="dark" className={`cartBadge ${added ? 'move' : ''}`}>
               {cartItems.length}
          </Badge> : ''}
          <img src={added ? shoppingcart : shoppingcartstill}></img>
          </div>
          </Link> 
          <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic" className='shadow-sm ms-4'>
        <img src={userImage} className='userImage mx-2'></img>My Account
      </Dropdown.Toggle>
      

      <Dropdown.Menu>
  <Dropdown.Item
    onClick={(e) => {
      e.stopPropagation()
      handleShow()
    }}
  >
    My Balance: ${balance}
  </Dropdown.Item><hr></hr>

  <Dropdown.Item
    onClick={(e) => {
      e.stopPropagation()
      setShow(true)
    }}
  >
    <img className='userImage1 me-1' src={heart} />My Favorites
  </Dropdown.Item>

  <Dropdown.Item href="#/action-3">
  <img src={userImage} className='userImage1 me-1'></img>Edit Profile
  </Dropdown.Item>
</Dropdown.Menu>

    </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Control
        type="number"
        id="myBalance"
        Value = {balance}
        min='1'
        onChange = {(o)=>{setBalance(Number(o.target.value))}}
      />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyNav;