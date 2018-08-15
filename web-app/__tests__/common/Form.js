import React from 'react';
import { shallow } from 'enzyme';
import { Form } from '../../src/components/common';

const mockHandleEvent = jest.fn();
const formData = {
  test: 'test',
};

xdescribe('Form Component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <Form
        formData={formData}
        actions={[
          {
            label: 'Test Form Name',
            event: mockHandleEvent,
            disabled: false,
          },
        ]}
      />,
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
  xit('on Form Submit handleSubmit is called', () => {
    const wrapper = shallow(<Form handleSubmit={mockHandleEvent} />);
    let form = wrapper.find('form');

    expect(mockHandleEvent.mock.calls.length).toEqual(0);
    form.simulate('submit');
    expect(mockHandleEvent.mock.calls.length).toEqual(1);
  });
});
