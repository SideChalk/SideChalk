import React                  from 'react';
import TestUtils              from 'react-addons-test-utils';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';

import { MemoryListItem } from './MemoryListItem.js';

function shallowRender (component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<MemoryListItem {...props} />);
}

describe('(Component) MemoryListItem', () => {
  let component, _props;

  beforeEach(() => {
    _props = {
      memory: {
        content: {title:'hello', data: 'world', type: 'text'},
        distance: 1000,
        key: 123,
        location: [50, 50]
      },
      onClick: () => {}
    };
    component = shallowRenderWithProps(_props);
  })
  it('(Meta) Should have a test that works with Chai expectations.', () => {
    expect(true).to.be.true;
  });

  it('Should render an <ListGroupItem> element', () => {
    expect(component.type).to.equal('ListGroupItem');
  });

  it('Should contain 3 child elements', () => {
    expect(component.props.children.length).to.equal(3);
  });  
  
  it('First element should be a <span> child element', () => {
    expect(component.props.children[0].type).to.equal('span');
  });  
  
  it('Second element should be a <span> child element', () => {
    expect(component.props.children[1].type).to.equal('span');
  }); 
  
  it('Third element should be a <span> child element', () => {
    expect(component.props.children[2].type).to.equal('span');
  }); 

  xit('Should open a modal when clicked', () => {

  });
});