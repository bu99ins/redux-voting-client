import React, {PureComponent}  from 'react';
import {connect} from 'react-redux';
import Winner from './Winner';
import Vote from './Vote';
import * as actionCreators from '../action_creators';

export class Voting extends PureComponent {
  render() {
    return <div>
      <h1>Voting in the round #{this.props.roundId}</h1>
      {this.props.winner
        ? <Winner ref="winner" winner={this.props.winner} />
        : <Vote {...this.props} />
      }
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    roundId: state.getIn(['vote', 'roundId']),
    hasVoted: state.get('hasVoted'),
    winner: state.get('winner')
  };
}

export const VotingContainer = connect(
  mapStateToProps,
  actionCreators)(Voting);