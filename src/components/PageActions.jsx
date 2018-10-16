import React, {PureComponent}  from 'react';

class PageActions extends PureComponent {
    render() {
        return <div className="actions">
            <button ref="next"
                    className="next"
                    onClick={this.props.next}>
                Next
            </button>
        </div>;
    }
}

export default PageActions;