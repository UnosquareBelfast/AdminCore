import styled from 'styled-components';

export const Drawer = styled.div`
  background-color: ${props => props.theme.colours.unoBlue};
  color: ${props => props.theme.colours.white};
  position: fixed;
  left: -200px;
  top: 0;
  bottom: 0;
  width: 200px;
  transition: left 300ms;
  z-index: 10;
  @media (min-width: ${props => props.theme.mediaQueries.sm}) {
    left: -160px;
  }

  &::after {
    transition: all 300ms;
    content: '';
    opacity: 0;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    @media (min-width: ${props => props.theme.mediaQueries.lg}) {
      display: none;
    }
  }
`;

export const Icon = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  font-size: 20px;
  line-height: 40px;
  width: 40px;
  height: 40px;
  text-align: center;
`;

export const Tooltip = styled.div`
  display: none;
  @media (min-width: ${props => props.theme.mediaQueries.sm}) {
    display: block;
    background-color: black;
    position: absolute;
    left: 30px;
    top: 10px;
    font-size: 10px;
    width: 100px;
    line-height: 20px;
    opacity: 0;
    color: #ffffff;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    transition: 300ms all;
  }
`;

export const MenuItem = styled.div`
  display: block;
  margin-bottom: ${props => (props.underline ? '20px' : '0')};
  cursor: pointer;
  line-height: 40px;
  position: relative;

  a {
    text-decoration: none;
    color: #ffffff;
    padding: 0 15px 0 40px;
    display: block;
    line-height: 40px;
    position: relative;

    &:hover {
      opacity: 0.9;
      background-color: #ffffff;
      color: ${props => props.theme.colours.unoBlue};
      ${Icon} {
        color: ${props => props.theme.colours.unoBlue};
        ${Tooltip} {
          opacity: 0.8;
          left: 40px;
        }
      }
    }

    &.active {
      background-color: #ffffff;
      color: ${props => props.theme.colours.unoBlue};
      ${Icon} {
        color: ${props => props.theme.colours.unoBlue};
      }
    }
  }
`;

export const ToggleDrawerBtn = styled.label`
  display: block;
  font-weight: bold;
  cursor: pointer;
  line-height: 40px;
  position: relative;
  padding: 0 15px 0 40px;
  background-color: ${props => props.theme.colours.unoBlue};
  transform: translateX(40px);
  @media (min-width: ${props => props.theme.mediaQueries.sm}) {
    transform: none;
  }
`;

export const MenuItemSubSection = styled.div`
  display: none;
  padding: 10px 0 0 0;
  ${MenuItem.selector} {
    background-color: #ffffff;
    a {
      color: ${props => props.theme.colours.unoBlue};
      font-size: 14px;

      &:hover {
        background-color: ${props => props.theme.colours.lightgrey};
      }
      &.active {
        background-color: ${props => props.theme.colours.lightgrey};
      }
    }
  }
`;

// The calc in min-height below just subtracts the padding to avoid
// unrequired scroll bars.
export const LayoutContainer = styled.div`
  min-height: 100vh;
  background-color: white;
  box-sizing: border-box;
  padding: ${props =>
    props.history == '/login' ? '0' : '60px 20px 20px 20px'};
  padding-bottom: none;
  width: 100%;
  transition: ${props =>
    props.history == '/login' ? 'none' : 'transform 300ms, width 300ms;'};

  @media (min-width: ${props => props.theme.mediaQueries.sm}) {
    padding: ${props => (props.history == '/login' ? '0' : '20px')};
    transform: ${props =>
      props.history == '/login' ? 'none' : 'translateX(40px)'};
    width: calc(100% - 40px);
  }
`;

export const Input = styled.input`
  display: none;

  &:checked ~ ${Drawer} {
    left: 0px;

    ${ToggleDrawerBtn} {
      transform: none;
    }

    ${MenuItem} ${Icon} {
      right: auto;
      left: 0px;

      ${Tooltip} {
        opacity: 0;
      }
      &:hover {
        ${Tooltip} {
          opacity: 0;
        }
      }
    }

    &::after {
      opacity: 1;
      content: '';
      position: fixed;
      right: 0;
      left: 200px;
      background-color: rgba(0, 0, 0, 0.6);
      @media (min-width: ${props => props.theme.mediaQueries.lg}) {
        display: none;
      }
    }

    ${MenuItemSubSection}.active {
      display: block;
    }
  }

  &:checked ~ ${LayoutContainer} {
    @media (min-width: ${props => props.theme.mediaQueries.lg}) {
      width: calc(100% - 200px);
      transform: translateX(200px);
    }
  }
`;
