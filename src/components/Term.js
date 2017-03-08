import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import Definition from './Definition';
import AddDefinition from './AddDefinition';
import { Link } from 'react-router';
import PayloadStates from '../constants/PayloadStates';
import LoadingSpinner from './LoadingSpinner';
import TermAuthor from './TermAuthor';

@lore.connect(function(getState, props) {
  return {
    definitions: getState('definition.find', {
      where: {
        termId: props.term.id
      },
      pagination: {
        _expand: 'user',
        // _expand: 'term'
      }
    })
  }
})
class Term extends Component {
  static propTypes = {
    term: React.PropTypes.object.isRequired,
    definitions: React.PropTypes.object.isRequired,
  };

  state = {
    showAddDefinition: false
  };

  toggleAdd = () => this.setState({
    showAddDefinition: !this.state.showAddDefinition
  });

  renderDefinition(definition, index) {
    return (
      <Definition
        key={definition.id || definition.cid}
        definition={definition}
        index={index + 1} />
    );
  }

  render() {
    const { term, definitions } = this.props;
    const { showAddDefinition } = this.state;

    if (definitions.state === PayloadStates.FETCHING) {
      return (
        <div className="term">
          <h3>
            <Link to={`/terms/${term.name}`}>
              {term.data.name}
            </Link>
          </h3>
          <TermAuthor term={term} />
          <div>
            <LoadingSpinner message={`Loading definitions...`} />
          </div>
        </div>
      );
    }

    return (
      <div className="term">
        <h3>
          <Link to={`/terms/${term.data.name}`}>
            {term.data.name}
          </Link>
        </h3>
        <TermAuthor term={term} />
        {definitions.data.map(this.renderDefinition)}
        <div className="add-definition-section">
          <Button bsStyle="info" bsSize="xsmall" onClick={this.toggleAdd}>
            <Glyphicon glyph="plus-sign" /> Add definition
          </Button>
          {showAddDefinition && (
            <AddDefinition hide={this.toggleAdd} term={term} />
          )}
        </div>
      </div>
    );
  }
}

export default Term;
