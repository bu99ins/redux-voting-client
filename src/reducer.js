import {List, Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function vote(state, entry) {
  const currentPair = state.getIn(['vote', 'pair']);
  if (currentPair && currentPair.includes(entry)) {
    return state.set('hasVoted', entry);
  } else {
    return state;
  }
}

function resetVote(state, newState) {
  const hasVoted = state.get('hasVoted');
  const votedForRound = state.getIn(['vote', 'roundId']);
  const currentRound = newState['vote']
    ? newState['vote']['roundId']
    : votedForRound;

  if (hasVoted && votedForRound !== currentRound) {
    return state.remove('hasVoted');
  } else {
    return state;
  }
}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(resetVote(state, action.state), action.state);
    case 'VOTE':
      return vote(state, action.entry);
  }
  
  return state;
}
