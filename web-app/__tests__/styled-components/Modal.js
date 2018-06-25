import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Container , Content } from '../../src/components/common/Modal/styled';

describe('Modal', () => {
  it('Container renders correctly', () => {
    const tree = renderer.create(<Container />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Content renders correctly', () => {
    const tree = renderer.create(<Content />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
