import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { ErrorContainer as Errorbox } from '../../src/components/common/Errorbox/styled';
import { theme } from '../../src/styled';
describe('Errorbox', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Errorbox theme={theme} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
