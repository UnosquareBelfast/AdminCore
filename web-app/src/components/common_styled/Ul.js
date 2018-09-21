import styled from 'styled-components';

export default styled.ul`
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
