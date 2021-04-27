import React, { useContext } from "react";
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import UserContext from "../utils/UserContext";


//==================Images====================
import logo from "../images/logo74KBblack.png"
//============================================


function NavTabs() {

  const user = useContext(UserContext);

  return (
    <div>
      <Navbar style={{zIndex: "20"}} bg="#2f4f4f" expand="lg">
        <Navbar.Brand><img src={logo} alt="ner herred logo" className="logo-small"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavItem>
              <NavLink className="nav-link" to="/">Home</NavLink>
            </NavItem>

            {user ?
            <>
            <NavItem>
              <NavLink className="nav-link" to="/search">Search</NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link" to="/profile">Profile</NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link" to="/messages">Messages</NavLink>
            </NavItem>
            </>
            :
            <>
            <NavItem>
              <NavLink to="/signup" target="_blank"><Button className="">Sign Up</Button></NavLink>
            </NavItem>
            </>
            }

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavTabs;