import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import Term from './Term';
import AddTerm from './AddTerm';
import PayloadStates from '../constants/PayloadStates';

@lore.connect(function(getState, props) {
  return {
    terms: getState('term.find')
  }
})
class Dictionary extends Component {

  static propTypes = {
    terms: React.PropTypes.object.isRequired
  };

  state = {
    showAddTerm: false
  };

  toggleAdd = () => this.setState({
    showAddTerm: !this.state.showAddTerm
  });

  renderTerm(term) {
    return (
      <Term key={term.id || term.cid} term={term} />
    );
  }

  render() {
    const { showAddTerm } = this.state;
    const { terms } = this.props;

    if (terms.state === PayloadStates.FETCHING) {
      return (
        <div>
          <h2>Terms</h2>
          <div className="terms">
            Fetching terms...
          </div>
        </div>
      );
    }

    return (
      <div>
        <h2>Terms</h2>
        <Button bsStyle="success" onClick={this.toggleAdd}>
          <Glyphicon glyph="plus-sign" /> Add term
        </Button>
        {showAddTerm && <AddTerm hide={this.toggleAdd} />}
        <div className="terms">
          {terms.data.map(this.renderTerm)}
        </div>
      </div>
    );
  }
}

export default Dictionary;
