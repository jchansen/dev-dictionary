import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';
import PayloadStates from '../constants/PayloadStates';

@lore.connect(function(getState, props) {
  return {
    user: getState('user.byId', {
      id: props.definition.data.userId
    })
  }
})
class DefinitionAuthor extends Component {
  static propTypes = {
    definition: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired
  };

  render() {
    const { user } = this.props;

    if (user.state === PayloadStates.FETCHING) {
      return (
        <LoadingSpinner message={`Loading author...`} />
      );
    }

    return (
      <div className="submitted-by">
        <Image className="nav-avatar" src={user.data.avatarUrl} />
        {' '}
        <strong>{user.data.name}</strong>
      </div>
    );
  }
}

export default DefinitionAuthor;
