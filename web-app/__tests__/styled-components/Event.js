import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Container as Event } from '../../src/components/common/Event/styled';
import { theme } from '../../src/styled';

describe('Event', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Event theme={theme} status={1}/>).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('background', theme.holidayStatus[1]);
  });
  it('renders correctly when given a differenet status', () => {
    const tree = renderer.create(<Event theme={theme} status={2}/>).toJSON();
    expect(tree).toHaveStyleRule('background', theme.holidayStatus[2]);
  });
});
