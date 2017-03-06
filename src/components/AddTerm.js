import React, { Component } from 'react';
import { Button, ControlLabel, Form, FormControl, FormGroup, Col, Well } from 'react-bootstrap';

class AddTerm extends Component {
  static propTypes = {
    hide: React.PropTypes.func.isRequired,
  };

  static contextTypes = {
    loggedInUser: React.PropTypes.object.isRequired
  };

  state = {
    name: ''
  };

  createTerm = () => {
    const { loggedInUser } = this.context;
    lore.actions.term.create({
      name: this.state.name,
      userId: loggedInUser.id
    });
    this.props.hide();
  };

  onChange = (event) => {
    this.setState({
      name: event.target.value
    });
  };

  render() {
    const { hide } = this.props;
    const { name } = this.state;

    return (
      <Well className="add-term">
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Term
            </Col>
            <Col sm={10}>
              <FormControl
                componentClass="textarea"
                placeholder="Add your term"
                value={name}
                onChange={this.onChange} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="primary" onClick={this.createTerm}>
                Submit the term
              </Button>
              <Button bsStyle="link" onClick={hide}>Cancel</Button>
            </Col>
          </FormGroup>
        </Form>
      </Well>
    );
  }
}

export default AddTerm;
