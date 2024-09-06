import React from 'react'
import classes from './input.module.scss'

type InputProps = Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "className">

function Input({ ...props }: InputProps) {
    return (
        <input className={classes.input} {...props} />
    )
}

export default Input