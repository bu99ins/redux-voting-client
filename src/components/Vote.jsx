import React, {PureComponent}  from 'react';

class Vote extends PureComponent {
  getPair() {
    return this.props.pair || [];
  }

  isDisabled() {
    return !!this.props.hasVoted;
  }

  hasVotedFor(entry) {
    return this.props.hasVoted === entry;
  }

  render() {
    return <div className="voting">
      {this.getPair().map(entry =>
        <button key={entry}
                disabled={this.isDisabled()}
                onClick={() => this.props.vote(entry)}>
        <h2>{entry}</h2>
        {
            this.hasVotedFor(entry)
            ? <div className="label">Voted</div>
            : null
        }
        </button>)
      }
    </div>;
  }
}

export default Vote;