import React, { Component } from 'react';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock, Image, Well } from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

// TODO: Fetch list of users from server via API.
const options = [
  {
    "id": 1,
    "name": "Alice",
    "avatarUrl": "/assets/avatars/alice.png"
  },
  {
    "id": 2,
    "name": "Dilbert",
    "avatarUrl": "/assets/avatars/dilbert.png"
  },
  {
    "id": 3,
    "name": "Wally",
    "avatarUrl": "/assets/avatars/wally.png"
  }
];

const userComponent = props => {
  const value = props.value ? props.value : props.option;
  return (
    <div className="user-select-component" onClick={() => props.onSelect(value)}>
      <Image className="nav-avatar" src={'/avatars/' + value.avatarUrl} />
      {' '}
      <strong>{value.name}</strong>
    </div>
  )
};

class AddDefinition extends Component {
  static propTypes = {
    hide: React.PropTypes.func.isRequired,
    term: React.PropTypes.object.isRequired
  };

  state = {
    who: null,
    definition: null,
  };

  createDefinition = (e) => {
    // e.preventDefault();
    // e.stopPropagation();
    lore.actions.definition.create({
      content: this.state.definition,
      termId: this.props.term.id,
      userId: this.state.who.id
    });
    this.props.hide();
  };

  selectWho = user => this.setState({
    who: user
  });

  changeDefinition = (event) => {
    this.setState({
      definition: event.target.value
    });
  };

  render() {
    const { hide } = this.props;
    const { who, definition } = this.state;

    return (
      <Well className="add-term">
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Definition
            </Col>
            <Col sm={10}>
              <FormControl
                componentClass="textarea"
                placeholder="Add your definition"
                value={definition}
                onChange={this.changeDefinition} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={2}>
              Who's definition?
            </Col>
            <Col sm={10}>
              <Select
                options={options}
                optionComponent={userComponent}
                ignoreCase
                onChange={this.selectWho}
                value={who}
                valueComponent={userComponent}
              />
              <HelpBlock>
                If you heard someone provide this definition, you can credit it to them. Otherwise, choose yourself.
              </HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="primary" onClick={this.createDefinition}>
                Submit the definition
              </Button>
              <Button bsStyle="link" onClick={hide}>
                Cancel
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Well>
    );
  }
}

export default AddDefinition;
