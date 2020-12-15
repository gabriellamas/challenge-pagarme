import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    z-index:100;
    top:50%;
    left:${({newTransaction})=> newTransaction ? '50%':'100%'};
    transform:translate(-50%, -50%);
    width:100%;
    max-width: 360px;
    height:100vh;
    background:#fff;
    transition:300ms;
    opacity:${({newTransaction})=> newTransaction ? '1':'0'};

    header{
        position:relative;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:16px;
        background:#F2F2F3;
        button{
            position:absolute;
            left:20px;
            top:50%;
            transform:translate(0,-50%);
            display:flex;
            align-items:center;
            justify-content:center;
            border:none;
        }
        h3{
            font-weight: 400;
            font-size: 16px;
            color:#1D1647;
        }
    }

    form{
        .custom-input + .custom-input, .flex-area + .custom-input{
            margin-top:16px;
        }
        .container-inputs{
            padding:0px 16px;
            margin:88px 0px 72px 0px;
        }
        .flex-area{
            display:flex;
            align-items:center;
            .custom-input{
                margin-top:16px;
            }
            .cvv-input{
                margin-left: 8px;
                width: 128px;
            }
            .expiration-date{
                width:192px;
            }
        }
    }
`;
