import React, { Component } from 'react';
import Navigation from './Navigation';
import { Grid, Row, Col } from 'react-bootstrap';

class Layout extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Grid>
          <Row>
            <Col>
              {React.cloneElement(this.props.children)}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Layout;
