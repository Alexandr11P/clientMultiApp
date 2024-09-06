import React from 'react'
import classes from './spinner.module.scss'

function Spinner() {
    return (
        <div className={classes.container}>
            <div className={classes.loader}></div>
        </div>
    )
}

export default Spinner