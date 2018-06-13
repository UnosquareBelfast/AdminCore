import React from 'react';
import { shallow } from 'enzyme';
import { Card } from '../../src/components/common';

describe('Card', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Card>
      <p>Paragraph</p>
    </Card>);

    expect(wrapper.exists());
    expect(wrapper.children().length).toEqual(1);
    expect(wrapper.children().childAt(0).text()).toEqual('Paragraph');
    expect(wrapper.contains(<p>Paragraph</p>)).toEqual(true);
  });



});
