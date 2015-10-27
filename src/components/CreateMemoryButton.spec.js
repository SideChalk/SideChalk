import React                  from 'react';
import TestUtils              from 'react-addons-test-utils';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import ReactDOM from 'react-dom';

import { CreateMemoryButton } from './CreateMemoryButton.js';

function renderWithProps (props = {}) {
  return TestUtils.renderIntoDocument(<CreateMemoryButton {...props} />);
}
describe('(Component) CreateMemoryButton', () => {
  let text_button_ref, 
    music_button_ref, 
    drawing_button_ref;

  before(() => {
    text_button_ref = renderWithProps({ memType:'text'});
    music_button_ref = renderWithProps({ memType:'music'});
    drawing_button_ref = renderWithProps({ memType:'drawing'});
  });



  it('Should render a button element onto the DOM', () => {
    let rendered = ReactDOM.findDOMNode(text_button_ref);
    expect(rendered).to.exist;
    expect(rendered.className.split(' ')[0]).to.equal('create-memory-button');
  });

  it('Should display the correct button text', () => {
    let rendered = ReactDOM.findDOMNode(text_button_ref);
    expect(rendered.textContent).to.equal('Add text');

    rendered = ReactDOM.findDOMNode(music_button_ref);
    expect(rendered.textContent).to.equal('Add music');

    rendered = ReactDOM.findDOMNode(drawing_button_ref);
    expect(rendered.textContent).to.equal('Add drawing');
  })
})

