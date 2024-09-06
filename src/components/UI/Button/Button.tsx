import React from 'react'
import classes from './button.module.scss'

type ButtonProps = Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "className">

function Button({ children, ...props }: ButtonProps) {
    return (
        <button className={classes.button} {...props}>{children}</button>
    )
}

export default Button