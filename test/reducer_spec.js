import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({Trainspotting: 1})
        })
      })
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      }
    }));
  });

  it('handles SET_STATE with the plain JS data', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {Trainspotting: 1}
        }
      }
    };
    const nextState = reducer(initialState, action);
  
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      }
    }));
  });

  it('handles SET_STATE with no initial state given', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {Trainspotting: 1}
        }
      }
    };
    const nextState = reducer(undefined, action);
  
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      }
    }));
  });

  it('handles VOTE by setting hasVoted and roundId', () => {
    const state = fromJS({
      vote: {
        roundId: 42,
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      }
    });
    const action = {type: 'VOTE', entry: 'Trainspotting'};
    const nextState = reducer(state, action);
  
    expect(nextState).to.equal(fromJS({
      vote: {
        roundId: 42,
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      },
      hasVoted: 'Trainspotting'
    }));
  });

  it('in case of invalid entry does not set hasVoted for VOTE', () => {
    const state = fromJS({
      vote: {
        roundId: 42,
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      }
    });
    const action = {type: 'VOTE', entry: 'Sunshine'};
    const nextState = reducer(state, action);
  
    expect(nextState).to.equal(fromJS({
      vote: {
        roundId: 42,
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      }
    }));
  });

  it('if the round had changed, resets hasVoted on SET_STATE', () => {
    const initialState = fromJS({
      vote: {
        roundId: 42,
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      },
      hasVoted: 'Trainspotting'
    });

    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          roundId: 43,
          pair: ['Sunshine', 'Trainspotting']
        }
      }
    };
    const nextState = reducer(initialState, action);
  
    expect(nextState).to.equal(fromJS({
      vote: {
        roundId: 43,
        pair: ['Sunshine', 'Trainspotting']
      }
    }));
  });
  
});