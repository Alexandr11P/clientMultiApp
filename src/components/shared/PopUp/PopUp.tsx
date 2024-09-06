import React, { use, useEffect, useRef, useState } from 'react'
import Button from '../../UI/Button/Button'
import { createPortal } from 'react-dom'
import classes from './popup.module.scss'

type PopUpProps = {
    children: React.ReactNode,
    minWidth?: number,
    buttons: Array<{ text: string, onclick: React.MouseEventHandler<HTMLButtonElement> }>,
    isVisible: boolean
}

function PopUp({ children, minWidth, buttons, isVisible }: PopUpProps) {
    const [place, setPlace] = useState<HTMLElement | null>(null)
    useEffect(() => { setPlace(document.getElementById('popUpPlace')) }, [])
    if (!place) { return '' }

    return (
        <>
            {createPortal(
                <div className={classes.main} style={{ display: isVisible ? 'flex' : 'none' }}>
                    <div className={classes.popup} style={{ minWidth: minWidth }}>
                        <div>{children}</div>
                        <div className={classes.buttons}>{buttons.map((e) => <Button key={e.text} onClick={e.onclick}>{e.text}</Button>)}</div>
                    </div></div>, place
            )}
        </>

    )
}

export default PopUp