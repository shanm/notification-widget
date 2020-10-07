import React from "react";
import { withRouter } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

class Notification extends React.Component {
  handleChange = (e, id) => {
    this.props.handleIndividualChange(e, id);
  };

  goToDetailPage = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/notification/${id}`);
  };

  render() {
    return (
      <>
        <ListGroup.Item
          className={this.props.data.read === false ? "light-blue" : "white"}
        >
          <span>
            <Form.Check
              className="d-inline-block"
              type="checkbox"
              checked={this.props.data.checked}
              onChange={(e) => this.handleChange(e, this.props.data.id)}
            />
            <div className="message-container">
              <div className="message-author">
                <img src={this.props.data.avator} width="50" height="50" />
                <span className="author-text">
                  {this.props.data.author} Wrote
                </span>
              </div>
              <div className="message-text">{this.props.data.text}</div>
              <div className="float-right">{this.props.data.dateTime}</div>
            </div>
          </span>

          <span></span>
        </ListGroup.Item>
      </>
    );
  }
}

export default withRouter(Notification);
