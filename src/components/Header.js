import React from "react";
import { withRouter } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import { connect } from "react-redux";

import * as actions from "../actions/notificationActions";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unread: this.props.unread,
    };
  }

  navigateToNotifications = () => {
    this.props.history.push("/notifications");
  };

  navigateToHome = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark" fixed="top">
          <Nav className="mr-auto">
            <Nav.Link onClick={this.navigateToHome}>Home</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={this.navigateToNotifications}>
              <i className="fa fa-bell"></i>
              <Badge className="notification-count" variant="secondary">
                {this.props.unread}
              </Badge>
            </Nav.Link>
          </Nav>
        </Navbar>
      </>
    );
  }
}

function mapStateToProps(state) {
  let data = state.filter((n) => n.read === false);
  return {
    unread: data.length,
  };
}

export default connect(mapStateToProps, actions)(withRouter(Header));
