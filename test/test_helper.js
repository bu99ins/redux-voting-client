import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const {JSDOM} = jsdom;
const {document} = (new JSDOM('<!doctype html><html><body></body></html>')).window;

global.document = document;
global.window = document.defaultView;

// Make window's properties accessible globally.
// (Hack for React's compatibility)
Object.keys(window).forEach((key) => {
    if (!(key === 'localStorage' || key === 'sessionStorage' || key in global)) {
      global[key] = window[key];
    }
});

chai.use(chaiImmutable);