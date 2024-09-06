'use client'
import React from 'react'
import Nav from './Nav/Nav'
import { usePathname } from 'next/navigation'
import classes from './body.module.scss'

function Body({ children }: { children: React.ReactNode }) {
    const path = usePathname()

    function switchBackground(path: string): string {
        if (path.startsWith('/apt')) { return 'linear-gradient(90deg, rgb(58, 148, 157) 0%, rgb(127, 129, 70) 100%)' }
        if (path.startsWith('/todolist')) { return 'radial-gradient(circle, blue 0%, black 100%)' }
        if (path.startsWith('/picman')) { return 'linear-gradient(180deg, rgba(93,128,255,1) 0%, rgba(0,9,255,1) 100%)' }
        return 'radial-gradient(circle, blue 0%, black 100%)'
    }

    return (
        <body style={{ background: switchBackground(path) }}>
            {path !== '/' && <Nav />}
            {children}
            <footer className={classes.footer}>Данное Web-приложение разработано Александром П</footer>
            <div id='popUpPlace'></div>
        </body>
    )
}

export default Body