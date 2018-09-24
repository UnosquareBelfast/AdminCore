import styled from 'styled-components';

export const StyleContainer = styled.div`
  margin: 20px;
  @media (min-width: ${props => props.theme.mediaQueries.lg}) {
    margin: 40px;
  }
  #closeBookingModal {
    position: absolute;
    cursor: pointer;
    top: 5px;
    font-weight: ${props => props.theme.fonts.weight.bold};
  }
  h1 {
    margin: 0 0 10px 0;
  }
  h4 {
    margin: 0;
  }
`;

export const FormContainer = styled.div`
  position: relative;
  form {
    @media (min-width: ${props => props.theme.mediaQueries.lg}) {
      margin-right: -10px;
      margin-left: -10px;
    }
    .date {
      transition: all 300ms;
      visibility: visible;
      @media (min-width: ${props => props.theme.mediaQueries.lg}) {
        margin: 0 0 20px 0;
        display: inline-block;
        width: 50%;
        padding: 0 10px;
        box-sizing: border-box;
        vertical-align: bottom;
      }
    }
    .select {
      @media (min-width: ${props => props.theme.mediaQueries.lg}) {
        margin: 20px 10px;
        width: calc(100% - 20px);
      }
    }
    .checkbox {
      position: relative;
      left: 2px;
      margin: 0 10px 20px 10px;
    }
    .input {
      @media (min-width: ${props => props.theme.mediaQueries.lg}) {
        margin: 0px 10px 20px 10px;
      }
    }
    > div:last-child {
      @media (min-width: ${props => props.theme.mediaQueries.lg}) {
        width: calc(50% - 10px);
        box-sizing: border-box;
        margin-left: calc(50% + 10px);
      }
    }
  }
`;

export const ButtonFloat = styled.div`
  width: 25% !important;
  margin-bottom: 10px !important;
  float: right;
`;

export const Ul = styled.ul`
    li {
        list-style-type: none;
        margin: 10px 10px 10px 10px;
        border-radius: 25px;
        width: 75%;
        padding-left: 30px;
        padding-top: 1px;
        padding-bottom: 1px;
        word-wrap:break-word;
    }

    h1 {
        margin: 10px 10px 10px 10px;
        position: relative;
        color:white;
    }

    h3 {
        text-transform: none;
        margin: 7px 10px 13px 7px;
        color: white;
        font-family: Open Sans,sans-serif;
        padding-right: 20px;
        padding-left: 19px;
    }
    
    height: 300px; 
    overflow: auto;
    border: 2px solid #d6d6d6;
    text-align: center;
    
    .employee-message-2{
        background-color:#0ecaea;
    }
    .employee-message-1{
        background-color: #0eb5d1;
    }

    .legacy-message-container {
        display: flex;
        justify-content: space-between;
    }

`;
