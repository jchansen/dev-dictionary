import React, { Component } from 'react';
import DefinitionAuthor from './DefinitionAuthor';

class Definition extends Component {
  static propTypes = {
    definition: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired,
  };

  render() {
    const { definition, index } = this.props;

    return (
      <div className="definition-container">
        <div className="definition">
          <div className="definition-index">
            {index}.
          </div>
          <div className="definition-content">
            {definition.data.content}
          </div>
        </div>
        <DefinitionAuthor definition={definition} />
      </div>
    );
  }
}

export default Definition;
