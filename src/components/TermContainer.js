import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';
import PayloadStates from '../constants/PayloadStates';
import Term from './Term';

@lore.connect(function(getState, props) {
  return {
    terms: getState('term.find', {
      where: {
        q: props.params.termName
      },
      pagination: {
        _limit: 1
      }
    })
  }
})
class TermContainer extends Component {

  static propTypes = {
    params: React.PropTypes.shape({
      termName: React.PropTypes.string.isRequired,
    }),
    terms: React.PropTypes.object.isRequired
  };

  render() {
    const terms = this.props.terms;

    if (terms.state === PayloadStates.FETCHING) {
      return (
        <div className="term">
          Fetching term...
        </div>
      )
    }

    const term = terms.data[0];

    return (
      <div className="term">
        <Link to="/terms">
          <Glyphicon glyph="chevron-left" /> Back to terms
        </Link>
        <h1>
          {term.data.name}
        </h1>
        <Term
          key={term.id || term.cid}
          term={term} />
      </div>
    );
  }
}

export default TermContainer;
