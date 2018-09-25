import styled from 'styled-components';

export const Ul = styled.ul`

    --border-style: 2px solid #d6d6d6;
    --employee-1-message-color: #0eb5d1;
    --employee-2-message-color: #0ecaea;

    li {
        list-style-type: none;
        margin: 10px;
        border-radius: 25px;
        width: 75%;
        padding-left: 30px;
        padding-top: 1px;
        padding-bottom: 1px;
        word-wrap:break-word;
    }

    h1 {
        margin: 10px;
        position: relative;
        color:white;
    }

    h3 {
        text-transform: none;
        margin: 7px 10px 13px 7px;
        color: white;
        font-family: Open Sans,sans-serif;
        padding-right: 20px;
        padding-left: 20px;
    }
    
    height: 300px; 
    overflow: auto;
    border: var(--border-style);
    text-align: center;
    
    .employee-message-2{
        background-color: var(--employee-2-message-color);
    }
    .employee-message-1{
        background-color: var(--employee-1-message-color);
    }

    .legacy-message-container {
        display: flex;
        justify-content: space-between;
    }

`;
