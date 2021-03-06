import React                  from 'react';
import TestUtils              from 'react-addons-test-utils';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import ReactDOM from 'react-dom';

import { MemoryList } from './MemoryList.js';

function shallowRender (component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<MemoryList {...props} />);
}

function renderWithProps (props = {}) {
  return TestUtils.renderIntoDocument(<MemoryList {...props} />);
}

function generateMemory () {
  return {
      ownerId: 'owner123',
      private: false,
      createdAt: 123,
      content: {
        title:'hello',
        data: 'world',
        type: 'text'
      },
      key: 'KEY' + Math.floor(Math.random() * 1000000),
      location: [0,0],
      distance: 100
    }
}

describe('(Component) MemoryList', () => {
  let component, _props;

  before(() => {
    _props = {
      memories: [
        generateMemory(1),
        generateMemory(2)
      ],
      memoryModalState: {
        memoryInFocus: {

        },
        showMemoryModal: false
      },
      memoryModalActions: {
        showMemoryDetails: () => {},
        dismissMemoryDetails: () => {}
      }
    };
    component = renderWithProps(_props);
  });

  it('(Meta) Should have a test that works with Chai expectations.', () => {
    expect(true).to.be.true;
    expect(component).to.be.ok;
  });

  it('Should render a ListGroup <div> element', () => {
    let rendered = ReactDOM.findDOMNode(component)
    expect(TestUtils.findRenderedDOMComponentWithClass(component, 'memory-list')).to.exist;
    expect(rendered.nodeName).to.equal('UL');
    expect(rendered.className.split(' ')[0]).to.equal('memory-list');
  });

  it('Should render a list item for each memory', () => {
    let rendered = ReactDOM.findDOMNode(component);
    expect(rendered.children.length).to.equal(2);
  });  
});
