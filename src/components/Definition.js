import React, { Component } from 'react';
import { Alert } from 'react-bootstrap'
import DefinitionAuthor from './DefinitionAuthor';
import PayloadStates from '../constants/PayloadStates';

class Definition extends Component {
  static propTypes = {
    definition: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired,
  };

  render() {
    const { definition, index } = this.props;
    let error = null;
    let styles = {};

    if (definition.state == PayloadStates.CREATING) {
      styles.opacity = 0.3;
    }

    if (definition.state === PayloadStates.ERROR_CREATING) {
      error = (
        <Alert bsStyle="danger">
          <strong>Uh oh!</strong> Something went wrong: {definition.error.message}
        </Alert>
      )
    }

    return (
      <div className="definition-container" style={styles}>
        <div className="definition">
          <div className="definition-index">
            {index}.
          </div>
          <div className="definition-content">
            {definition.data.content}
          </div>
        </div>
        <DefinitionAuthor definition={definition} />
        {error}
      </div>
    );
  }
}

export default Definition;
