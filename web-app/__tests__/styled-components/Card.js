import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { CardContainer as Card } from '../../src/components/common/Card/styled';

describe('Card', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Card />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
