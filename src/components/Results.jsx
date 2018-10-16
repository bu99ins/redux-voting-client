import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PageActions from './PageActions';
import Tally from './Tally';
import Winner from './Winner';
import * as actionCreators from '../action_creators';

export class Results extends PureComponent {
    render() {
        return this.props.winner
            ? <Winner ref="winner" winner={this.props.winner} />
            : <div className="results">
                <h1>Voting in the round #{this.props.roundId}</h1>
                <Tally {...this.props} />
                <PageActions ref="actions" next={this.props.next} />
            </div>;
        }
}

function mapStateToProps(state) {
    return {
      pair: state.getIn(['vote', 'pair']),
      tally: state.getIn(['vote', 'tally']),
      roundId: state.getIn(['vote', 'roundId']),
      winner: state.get('winner')
    }
}

export const ResultsContainer = connect(mapStateToProps, actionCreators)(Results);