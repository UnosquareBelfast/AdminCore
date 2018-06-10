import React from 'react';
import { shallow } from 'enzyme';
import { Modal } from '../../src/components/common';

describe('Modal', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Modal>
      <p>Paragraph</p>
    </Modal>);

    expect(wrapper.exists());
    expect(wrapper.children().length).toEqual(1);
    expect(wrapper.children().childAt(0).length).toEqual(1);
    expect(wrapper.children().childAt(0).text()).toEqual('Paragraph');
    
  });
});
