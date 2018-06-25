import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../src/pages/Login';
const mockHandleEvent = jest.fn();

afterEach(() => {
  mockHandleEvent.mockReset();
});

describe('Login Component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Login handleChange={mockHandleEvent} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
  it('onChange of email input calls handleChange', () => {
    const wrapper = shallow(<Login handleChange={mockHandleEvent} />);
    let emailInput = wrapper.find('[name="email"]');
    
    expect(mockHandleEvent.mock.calls.length).toEqual(0);    
    emailInput.simulate('change');
    expect(mockHandleEvent.mock.calls.length).toEqual(1);
  });
  it('onChange of password input calls handleChange', () => {

    const wrapper = shallow(<Login handleChange={mockHandleEvent} />);
    let passwordInput = wrapper.find('[name="password"]');

    expect(mockHandleEvent.mock.calls.length).toEqual(0);    
    passwordInput.simulate('change');
    expect(mockHandleEvent.mock.calls.length).toEqual(1);
  });
  it('on Form Submit handleSubmit is called', () => {

    const wrapper = shallow(<Login handleSubmit={mockHandleEvent} />);
    let form = wrapper.find('form');

    expect(mockHandleEvent.mock.calls.length).toEqual(0);    
    form.simulate('submit');
    expect(mockHandleEvent.mock.calls.length).toEqual(1);
  });
});
