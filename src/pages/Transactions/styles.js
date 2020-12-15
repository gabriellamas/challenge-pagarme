import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    margin: 0px auto;
    width:100%;
    max-width: 360px;
    height: auto;
    overflow: hidden;
    header{
        padding:24px 16px;
        background:#f2f2f3;
        label{
            font-weight: 700;
            font-size: 14px;
            line-height: 24px;
            color:#070817;
            display:block;
        }
        p{
            color:#65A300;
            font-size: 20px;
            line-height: 32px;
            margin-top:4px;
            font-weight: 700;
            letter-spacing: -0.04em;
        }
        label + p + label{
            margin-top:24px;
        }
    }

    ul{
        display:flex;
        flex-direction:column;
        li{
            list-style-type:none;
            padding:16px;
            border-bottom: 1px solid #F2F2F3;
            display:flex;
            .container-name-data-time{
                text-align:left;
                flex:1;
                .name{
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 24px;
                    color: #454550; 
                    margin-bottom:8px;
                }
                .data-time{
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 24px;
                    color: #454550;
                }
            }
            .container-status-value{
                text-align:right;
                flex:1;
                .status{
                    margin-bottom:8px;
                    color:#72737A;
                }
                .value{
                    color:#2B2B2B;
                    font-weight: 700;
                }
            }
        }
    }

`;
