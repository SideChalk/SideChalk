import React                  from 'react';
import TestUtils              from 'react-addons-test-utils';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';

import { MemoryListContainer } from './MemoryListContainer.js';

function shallowRender (component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function renderWithProps (props = {}) {
  return TestUtils.renderIntoDocument(<MemoryListContainer {...props} />);
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<MemoryListContainer {...props} />)
}

describe('(Container) MemoryListContainer', function () {
  // let component, rendered, _props, _spies;

  // beforeEach(function () {
  //   const sampleMemory = {
  //     content: {title:'hello', data: 'world', type: 'text'},
  //     distance: 1000,
  //     key: 123,
  //     location: [50, 50]
  //   };

  //   _spies = {};
  //   _props = {
  //     actions : bindActionCreators({
  //       syncData : (_spies.syncData = sinon.spy())
  //       }, _spies.dispatch = sinon.spy()
  //     ),

  //     memories: Immutable.List.of(sampleMemory)
  //   };

  //   component = shallowRenderWithProps(_props);
  //   rendered  = renderWithProps(_props);
  // });

  it('(Meta) Should have a test that works with Chai expectations.', function () {
    expect(true).to.be.true;
  });

  // it('Should render as a <div>.', function () {
  //   expect(component.type).to.equal('div');
  // });
});
