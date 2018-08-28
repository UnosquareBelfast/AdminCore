import styled from 'styled-components';

export const InnerLayout = styled.div`
  width: 100%;
  h2 {
    margin: 0;
  }

  .columnWrap {
    display: flex;
    margin-top: 20px;
    border-radius: 8px;

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 10px;
      width: 100%;
      border: 1px solid ${({ theme }) => theme.colours.grey};
      border-right: none;

      :first-of-type {
        border-radius: 8px 0 0 8px;
      }
      :last-of-type {
        border-radius: 0 8px 8px 0;
        border-right: 1px solid ${({ theme }) => theme.colours.grey};
      }

      h3 {
        margin: 0 0 10px 0;
      }

      a {
        color: ${({ theme }) => theme.colours.unoBlue};
        font-weight: ${props => props.theme.fonts.weight.bold};
        text-decoration: none;
        margin-bottom: 5px;

        :hover {
          color: ${({ theme }) => theme.colours.darkBlue};
          text-decoration: underline;
        }
      }
    }
  }
`;
