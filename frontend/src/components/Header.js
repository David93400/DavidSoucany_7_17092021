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
          <Row
            noGutters
            className="w-100 align-items-center justify-content-center d-flex flex-nowrap"
          >
            <Col className="d-flex justify-content-start">
              <Nav className="mrx-auto d-flex" navbar>
                <NavItem className="d-flex align-items-center">
                  {uid ? (
                    <NavLink
                      className="font-weight-bold d-flex justify-content-xs-start justify-content-lg-center"
                      href="/profil"
                    >
                      <img
                        src={userData.avatar}
                        alt="avatar"
                        className="img-fluid rounded-circle"
                        style={{ width: 70 }}
                      />
                    </NavLink>
                  ) : null}
                </NavItem>
              </Nav>
            </Col>

            <Col className="d-flex justify-content-xs-start justify-content-lg-center">
              <NavbarBrand
                className="d-inline-block p-0"
                href="/"
                style={{ width: 140 }}
              >
                <img
                  src="./img/icon-left-font-monochrome-black.png"
                  alt="logo groupomania"
                  className="img-fluid"
                />
              </NavbarBrand>
            </Col>

            <Col className="d-lg-flex justify-content-end">
              {uid ? (
                <>
                  <NavItem className="d-flex align-items-center">
                    <NavLink className="font-weight-bold" href="/profil">
                      <span className="me-3 text-danger">
                        Bienvenue {userData.pseudo}
                      </span>
                    </NavLink>
                    <NavLink className="font-weight-bold" href="/">
                      <Logout />
                      </NavLink>
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem className="d-flex align-items-center">
                    <NavLink className="font-weight-bold" href="/profil">
                      <span className="me-3 text-danger">
                        Inscription / Connexion
                      </span>
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
