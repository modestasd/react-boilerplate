import React from 'react';
import { shallow } from 'enzyme';
import COMPONENT_NAME from './COMPONENT_NAME';

describe('COMPONENT_NAME', () => {
  const wrapped = shallow(<COMPONENT_NAME>Text</COMPONENT_NAME>);

  it('Should render', () => {
    expect(wrapped).toBeTruthy();
  });

  it('Match latest snapshot', () => {
    expect(wrapped.debug()).toMatchSnapshot();
  });
  
});
