import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavbarBrand,
  NavLink,
  NavItem,
} from 'reactstrap';


import React, { useContext } from 'react';
import { UidContext } from './AppContext';
import Logout from './Login/Logout';
import {useSelector} from 'react-redux';


const Header = () => {

  const uid = useContext(UidContext)
  const userData = useSelector((state) => state.userReducer)

  return (
    <header>
      <Navbar
        fixed="top"
        color="light"
        light
        expand="xs"
        className="border-bottom border-gray bg-white"
        style={{ height: 100 }}
      >
        <Container>
          <Row noGutters className="position-relative w-100 align-items-center">
            <Col className="d-flex justify-content-start">
              <Nav className="mrx-auto d-flex" navbar>
                <NavItem className="d-flex align-items-center">
                  <NavLink
                    className="font-weight-bold d-flex justify-content-xs-start justify-content-lg-center"
                    href="/profil"
                  >
                    <img
                      src=""
                      alt="avatar"
                      className="img-fluid rounded-circle"
                      style={{ width: 70 }}
                    />
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>

            <Col className="d-flex justify-content-xs-start justify-content-lg-center">
              <NavbarBrand
                className="d-inline-block p-0"
                href="/"
                style={{ width: 200 }}
              >
                <img
                  src="./img/icon-left-font-monochrome-black.png"
                  alt="logo"
                  className="position-relative img-fluid"
                />
              </NavbarBrand>
            </Col>

            <Col className="d-lg-flex justify-content-end">
              {uid ? (
                <>
                  <NavItem className="d-flex align-items-center">
                    <NavLink className="font-weight-bold" href="/profil">
                      <span className="me-3 ">Bienvenue {userData.pseudo}</span>
                      <Logout />
                    </NavLink>
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem className="d-flex align-items-center">
                    <NavLink className="font-weight-bold" href="/profil">
                      <span className="me-3">Inscription / Connexion</span>
                      <img
                        src="./img/login.png"
                        alt="login"
                        style={{ width: 40 }}
                      />
                    </NavLink>
                  </NavItem>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
