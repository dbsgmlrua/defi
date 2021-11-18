import { Navbar, Container, Nav } from "react-bootstrap";
import Identicon from "identicon.js";

const ReactNav = ({ account }) => {
    return(
        <Navbar bg="dark" variant="dark">
              <Container>
                  <Navbar.Brand href="/">
                      Defi app
                  </Navbar.Brand>
                    <small className="text-secondary">
                        <small id="account">{account}</small>
                        {account ? <img
                            className="ml-2"
                            width="30"
                            height="30"
                            src={`data:image/png;base64,${new Identicon(account, 30).toString()}`}
                        /> : <span></span>}
                    </small>
              </Container>
          </Navbar>
    );
}
 
export default ReactNav;