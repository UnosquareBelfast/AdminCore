import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../src/pages/Login';
const mockHandleEvent = jest.fn();
import * as createMemoryHistory from 'history/createMemoryHistory';
const history = createMemoryHistory.default('/');

afterEach(() => {
  mockHandleEvent.mockReset();
});

describe('Login Component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <Login handleChange={mockHandleEvent} history={history} />,
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});
