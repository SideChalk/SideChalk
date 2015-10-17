var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
var Hello = require('../hello.react'); //my root-test lives in components/__tests__/, so this is how I require in my components.
var expect = chai.expect;

describe('root', function () {
  it('renders without problems', function () {
    var hello = TestUtils.renderIntoDocument(<Hello/>);
    expect(hello).to.exist;
  });
});
