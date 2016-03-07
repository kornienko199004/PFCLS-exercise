import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Main from '../src/components/Main';
import Button from '../src/components/Buttons';

describe('Main', () => {
  it('counter is a state that defaults to 0', () => {
    const component = shallow(<Main />);

    expect(component.state().counter).to.eq(0);
  });
});

describe('Buttons', () => {
  it('invokes a callback when a button is clicked', () => {
    const onButtonClick = sinon.spy();
    const component = shallow(<Button onButtonClick={onButtonClick} />);

    component.simulate('click');
    expect(onButtonClick.calledOnce).to.be.true;
  });
});
