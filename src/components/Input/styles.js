import styled from 'styled-components';

export const Container = styled.div`
    position:relative;
    width:100%;
    display:flex;
    flex-direction:column;
    input{
        border: 1px solid #8B8B92;
        border-radius: 6px;
        padding:12px;
        font-size:16px;
        height:48px;
        width:100%;
        color:#595A63;
    }
    input:focus + label{
        top:-13px;
    }
    label{
        position:absolute;
        display:block;
        top:${({value})=>(value ? '-13px' : '11px')};
        left:12px;
        color: #8B8B92;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        transition:300ms;
        background:#fff;
        padding:0px 4px;
    }
    .error{
        position: absolute;
        z-index:90;
        color: red;
        bottom: 0px;
        left: 0px;
        font-size: 12px;
        transform:translate(0%,100%);
        background:#fff;
    }
`;
