// @flow
// src/components/Home/index.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, CardTitle, CardText } from 'reactstrap';
import queryString from 'query-string';
import { getCurrentUser } from "../../lib/api.js";
import McsAlert from "../Utilities/alert.js";


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

    return (
      <div className="App">
        <div>
          <McsAlert color="success" text={this.state.success} visible={this.state.success.length > 0} onToggle={this.onToggleSuccess.bind(this)}></McsAlert>
          <McsAlert color="danger" text={this.state.error} visible={this.state.error.length > 0} onToggle={this.onToggleError.bind(this)}></McsAlert>
          <Container>
            <Row>
              <Col>
                <Card className="card-body text-center mb-2">
                  <Link to="/new-student"><Button size="lg">New Student From</Button></Link>
                  <CardText className="front-page-card">Fill out new student details form.</CardText>
                </Card>
              </Col>
              <Col>
                <Card className="card-body text-center mb-2">
                  <Link to="/class-checkin"><Button size="lg">Class Check-in</Button></Link>
                  <CardText className="front-page-card">Returning students check in here.</CardText>
                </Card>
              </Col>
              <Col>
                <Card className="card-body text-center mb-2">
                  <Link to="/dance-checkin"><Button size="lg">Dance Check-in</Button></Link>
                  <CardText className="front-page-card">Check into the weekly dance.</CardText>
                </Card>
              </Col>
              <Col>
                <Card className="card-body text-center mb-2">
                  <Link to="/event-checkin"><Button size="lg">Event Check-in</Button></Link>
                  <CardText className="front-page-card">Check into a special event.</CardText>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Home;
