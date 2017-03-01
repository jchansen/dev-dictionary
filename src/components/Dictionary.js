import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import Term from './Term';
import AddTerm from './AddTerm';
import jsonData from '../../db.json';
import filter from 'lodash/filter'

// Don't do this. You need to actually fetch the data from the server using
// the API. This is a cheater way just to provide a visual example of what you
// should see when you're done.
const terms = jsonData.terms.map(term => ({
  ...term,
  definitions: filter(jsonData.definitions, { termId: term.id })
}))


class Dictionary extends Component {
  state = {
    showAddTerm: false
  };

  toggleAdd = () => this.setState({ showAddTerm: !this.state.showAddTerm })

  render() {
    const { showAddTerm } = this.state;

    return (
      <div>
        <h2>Terms</h2>
        <Button bsStyle="success" onClick={this.toggleAdd}>
          <Glyphicon glyph="plus-sign" /> Add term
        </Button>
        {showAddTerm && <AddTerm hide={this.toggleAdd} />}
        <div className="terms">
          {terms.map(term => {
            return <Term key={term.id} term={term} />;
          })}
        </div>
      </div>
    );
  }
}

export default Dictionary;
