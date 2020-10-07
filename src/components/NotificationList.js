import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";

import Notification from "./Notification";
import * as actions from "../actions/notificationActions";

class NotificationList extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      notifications: this.props.notifications,
      disableBtns: true,
      checkRootCheckbox: false,
    };
  }

  componentDidMount() {
    this.props.getAllNotifications();
  }

  handleRootCheckbox = (event) => {
    let checkboxStatus = event.target.checked;
    this.setState({
      notifications: this.state.notifications.map((obj) => ({
        ...obj,
        checked: checkboxStatus,
      })),
      disableBtns: !checkboxStatus,
      checkRootCheckbox: checkboxStatus,
    });
  };

  handleIndividualChange = (event, id) => {
    let changedNotifications = this.state.notifications.map((obj) => {
      if (obj.id === id) {
        return { ...obj, checked: event.target.checked };
      } else {
        return { ...obj };
      }
    });
    this.setState({
      notifications: changedNotifications,
      disableBtns: !changedNotifications.some((n) => n.checked === true),
    });
  };

  handleBtns = (e, state) => {
    let modifyReadState = this.state.notifications.map((obj) => {
      if (obj.checked) {
        return { ...obj, checked: false, read: state };
      } else {
        return { ...obj };
      }
    });
    this.setState({
      notifications: modifyReadState,
      disableBtns: true,
      checkRootCheckbox: false,
    });
    this.props.modifyNotification(modifyReadState);
  };

  render() {
    return (
      <>
        <ListGroup className="notification-list">
          <ListGroup.Item>
            <span>
              <Form.Check
                className="d-inline-block mr-2"
                label="Select all"
                type="checkbox"
                checked={this.state.checkRootCheckbox}
                onChange={this.handleRootCheckbox}
              />
              <Button
                variant="outline-primary mr-2"
                size="sm"
                disabled={this.state.disableBtns}
                onClick={(e) => {
                  this.handleBtns(e, true);
                }}
              >
                Mark as read
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                disabled={this.state.disableBtns}
                onClick={(e) => {
                  this.handleBtns(e, false);
                }}
              >
                Mark as unread
              </Button>
            </span>
          </ListGroup.Item>
          {this.state.notifications.map((n, i) => {
            return (
              <Notification
                key={i}
                index={i}
                data={n}
                handleIndividualChange={this.handleIndividualChange}
                checked={this.state.selectAll}
              />
            );
          })}
        </ListGroup>
      </>
    );
  }
}

function mapStateToProps(state) {
  let data = state.map((obj) => ({ ...obj, checked: false }));
  return {
    notifications: data,
  };
}

export default connect(mapStateToProps, actions)(NotificationList);
