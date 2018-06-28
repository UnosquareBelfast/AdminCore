import styled from 'styled-components';

export const Drawer = styled.div`
  background-color: ${props => props.theme.colours.unoBlue};
  color: ${props => props.theme.colours.white};
  position: fixed;
  left: -160px;
  top: 0;
  bottom: 0;
  width: 200px;
  transition: left 300ms;
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
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const HeaderItem = styled.div`
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

export const ToggleDrawer = styled.label`
  display: block;
  font-weight: bold;
  cursor: pointer;
  line-height: 40px;
  position: relative;
  padding: 0 15px 0 40px;
`;

export const SubSection = styled.div`
  display: none;
  padding: 10px 0 0 0;
  ${HeaderItem.selector} {
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

export const LayoutContainer = styled.div`
  width: calc(100% - 120px);
  margin-left: 80px;
  margin: ${props => (props.history == '/login' ? '0' : '50px auto')};
  height: 75vh;
  display: flex;
  flex-direction: row;
`;

export const Input = styled.input`
  display: none;

  &:checked ~ ${Drawer} {
    left: 0px;
    ${HeaderItem} ${Icon} {
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

    ${SubSection}.active {
      display: block;
    }
  }

  &:checked ~ ${LayoutContainer} {
    width: calc(100% - 230px);
    margin-left: 230px;
  }
`;
