import { Link } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export default function Home() {
  const posts = JSON.parse(localStorage.getItem("posts"));
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Meeting Room Booking App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/dashboard"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  Dashboard
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container mx-auto my-5">
        <h1 className="h1 mb-4 text-center">Meeting Rooms</h1>
        {posts
          ? posts
              .filter((p) => p.status === "publish" || p.status === "private")
              .map((post) => {
                return (
                  <div key={post.id} className="card mb-2">
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <div className="text-end">
                        <Link
                          to={`/room/${post.id}`}
                          className="btn btn-primary btn-sm"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
          : null}
      </div>
    </div>
  );
}
