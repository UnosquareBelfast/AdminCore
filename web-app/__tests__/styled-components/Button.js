import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Container as Button } from '../../src/components/common/Button/styled';
import { theme } from '../../src/styled';

describe('Button', () => {
  it('renders correctly when background is not disabled', () => {
    const tree = renderer.create(<Button disabled={false} theme={theme}/>).toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('background', theme.colours.unoBlue);
  });
  it('renders correctly when background is disabled', () => {
    const tree = renderer.create(<Button disabled theme={theme}/>).toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('background', '#f4f4f4');
  });
});
