// @flow
// src/components/Home/index.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, CardTitle, CardText } from 'reactstrap';
import queryString from 'query-string';
import { getCurrentUser } from "../../lib/api.js";
import McsAlert from "../Utilities/alert.js";
import PaymentForm from '../PaymentForm';

class Home extends Component {
  state: State = {
    currentUser: {},
    success: "",
    error: ""
  };

  componentDidMount() {
    this.setState({
      currentUser: getCurrentUser()
    });
    this.getAlertFromQuery();
  }

  getAlertFromQuery = () => {
    if (this.props.location) {
      if (this.props.location.search) {
        var parsedSearch = queryString.parse(this.props.location.search);
        if (parsedSearch["success"]) {
          this.setState({success: parsedSearch["success"]})
        }
        if (parsedSearch["error"]) {
          this.setState({error: parsedSearch["error"]})
        }
      }
    }
  };

  onToggleSuccess = () => {
    this.setState({success: ""});
    window.history.replaceState("", "", "/");
  }

  onToggleError = () => {
    this.setState({error: ""});
    window.history.replaceState("", "", "/");
  }


  render() {
    let containerContent;
    if (this.state.currentUser) {
      if (this.state.currentUser.isAdmin) {
        containerContent = <Row>
          <Col>
            <Card className="card-body text-center mb-2">
              <CardTitle className="front-page-card">New Student Form</CardTitle>
              <CardText className="front-page-card">Fill out new student details form.</CardText>
              <Link to="/new-student"><Button size="lg">New Student</Button></Link>
            </Card>
          </Col>
          <Col>
            <Card className="card-body text-center mb-2">
              <CardTitle className="front-page-card">Returning Student Class Check-in</CardTitle>
              <CardText className="front-page-card">Returning students check in here.</CardText>
              <Link to="/class-checkin"><Button size="lg">Class Check-in</Button></Link>
            </Card>
          </Col>
          <Col>
            <Card className="card-body text-center mb-2">
              <CardTitle className="front-page-card">Dance Check-in</CardTitle>
              <CardText className="front-page-card">Check into the dance.</CardText>
              <Link to="/dance-checkin"><Button size="lg">Dance Check-in</Button></Link>
            </Card>
          </Col>
          <Col>
            <Card className="card-body text-center mb-2">
              <CardTitle className="front-page-card">Event Check-in</CardTitle>
              <CardText className="front-page-card">Check into a special event.</CardText>
              <Link to="/event-checkin"><Button size="lg">Event Check-in</Button></Link>
            </Card>
          </Col>
        </Row>
      } else {
        containerContent = <PaymentForm />
      }
    } else {
      containerContent = <Row>
        <Col>
          <Card className="card-body text-center mb-2">
            <CardTitle>Sign In</CardTitle>
            <CardText>Sign in or create a new admin user.</CardText>
            <Link to="/signin"><Button size="lg">Sign In</Button></Link>
          </Card>
        </Col>
      </Row>
    }
    return (
      <div className="App">
        <div>
          <McsAlert color="success" text={this.state.success} visible={this.state.success.length > 0} onToggle={this.onToggleSuccess.bind(this)}></McsAlert>
          <McsAlert color="danger" text={this.state.error} visible={this.state.error.length > 0} onToggle={this.onToggleError.bind(this)}></McsAlert>
          <Container>
            {containerContent}
          </Container>
        </div>
      </div>
    );
  }
}

export default Home;
