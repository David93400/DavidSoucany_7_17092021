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

const Avatar = './img/defaultAvatar.jpeg';
const pseudo = localStorage.getItem('pseudo');

const Header = () => (
  <header>
    <Navbar
      fixed="top"
      color="light"
      light
      expand="xs"
      className="border-bottom border-gray bg-white"
      style={{ height: 80 }}
    >
      <Container>
        <Row noGutters className="position-relative w-100 align-items-center">
          <Col className="d-none d-lg-flex justify-content-start">
            <Nav className="mrx-auto" navbar>
              <NavItem className="d-flex align-items-center">
                <NavLink className="font-weight-bold" href="/profil">
                  <img
                    src={Avatar}
                    alt="avatar"
                    className="img-fluid rounded-circle"
                    style={{ width: 80 }}
                  />
                </NavLink>
              </NavItem>

              <NavItem className="d-flex align-items-center">
                <NavLink className="font-weight-bold" href="/profil">
                  {pseudo}
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

          <Col className="d-none d-lg-flex justify-content-end"></Col>
        </Row>
      </Container>
    </Navbar>
  </header>
);

export default Header;
