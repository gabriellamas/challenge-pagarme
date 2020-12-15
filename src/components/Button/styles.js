import styled from 'styled-components';

export const Container = styled.div`

    position:relative;
    padding:16px 16px 24px;

    button{
        background: #3F2787;
        color: #fff;
        padding:12px;
        width: 100%;
        height:auto;
        border: none;
        box-shadow: 0px 4px 6px rgba(112, 82, 200, 0.3);
        border-radius: 8px;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        display:flex;
        align-items:center;
        justify-content:center;
        &:disabled {
            background: #F2F2F3;
            color: #72737A;
            box-shadow:none;
        }
        svg{
            margin-right:10px;
        }
    }
`;
