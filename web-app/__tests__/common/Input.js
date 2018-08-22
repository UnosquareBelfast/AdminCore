import React from 'react';
import { shallow, mount } from 'enzyme';
import { Input } from '../../src/components/common';
import { theme } from '../../src/styled';

const getInputEl = () => {
  theme.colours.grey = '#d6d6d6';
  return (
    <Input
      theme={theme}
      type="input"
      htmlAttrs={{
        type: 'text',
        name: 'test',
        placeholder: 'Test placeholder value',
      }}
      value="Hello"
      label="Test input field:"
    />
  );
};

xdescribe('Input Component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(getInputEl());
    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('Test onchange of a text input', done => {
    const wrapper = mount(getInputEl());
    const input = wrapper.find('input[name="test"]');

    input.simulate('focus');
    input.simulate('change', { target: { value: 'Changed' } });
    expect(input.get(0).value).to.equal('Changed');

    done();
  });
});
