import React from 'react';
import { Container } from './styles';

const Button = ({children, icon, ...props})=> (
    <Container>
        <button type={'button'} {...props}> 
            {icon && icon }{children} 
        </button>
    </Container>
) ;

export default Button;