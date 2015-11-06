import React                  from 'react';
import TestUtils              from 'react-addons-test-utils';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import ReactDOM from 'react-dom';

import { MemoryListItem } from './MemoryListItem.js';

function shallowRender (component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<MemoryListItem {...props} />);
}

function renderWithProps (props = {}) {
  return TestUtils.renderIntoDocument(<MemoryListItem {...props} />);
}

describe('(Component) MemoryListItem', () => {
  let component, _props;

  before(() => {
    _props = {
      memory: {
        content: {title:'My Title', data: 'List Data', type: 'text'},
        distance: 1000,
        key: 123,
        location: [50, 50]
      }
    };
    component = renderWithProps(_props);
  })
  it('(Meta) Should have a test that works with Chai expectations.', () => {
    expect(true).to.be.true;
    expect(component).to.be.ok;
  });

  it('Should render a styled <div> wrapper', () => {
    expect(ReactDOM.findDOMNode(component).nodeName).to.equal('DIV');
  });

  it('Should contain an <ListGroupItem> element', () => {
    let listGroupItem = ReactDOM.findDOMNode(component).children[0];
    expect(listGroupItem.nodeName).to.equal('SPAN');
  });

  it('That ListGroupItem should contain 3 child elements', () => {
    let rendered = ReactDOM.findDOMNode(component).children[0];
    expect(rendered.children.length).to.equal(3);
  });

  it('First element should be a <div> containing an <i> child element with type icon', () => {
    let rendered = ReactDOM.findDOMNode(component).children[0];
    expect(rendered.children[0].nodeName).to.equal('DIV');
    expect(rendered.children[0].children[0].nodeName).to.equal('I');
    expect(rendered.children[0].children[0].className).to.equal('fa fa-comment-o pull-right type-icon');
  });

  it('Second element should be a <h4> child element with title info', () => {
    let rendered = ReactDOM.findDOMNode(component).children[0];
    expect(rendered.children[1].nodeName).to.equal('H4');
    expect(rendered.children[1].textContent).to.equal('My Title');
    expect(rendered.children[1].className).to.equal('list-group-item-heading');
  });

  // TODO: create test for reactions
  // it('Second element should be a <p> child element with reactions info', () => {
  //   let rendered = ReactDOM.findDOMNode(component)
  //   expect(rendered.children[1].nodeName).to.equal('P');
  //   expect(rendered.children[1].textContent).to.equal('List Data');
  //   expect(rendered.children[1].className).to.equal('memory-list-item-data');
  // });

  // it('Third element should be a <span> child element distance info', () => {
  //   let rendered = ReactDOM.findDOMNode(component)
  //   expect(rendered.children[2].nodeName).to.equal('SPAN');
  //   expect(rendered.children[2].className).to.equal('memory-list-item-distance');
  // });

  xit('Should open a modal when clicked', () => {

  });
});
