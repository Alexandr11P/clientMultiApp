'use client'
import React, { useState, useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import classes from './picman.module.scss'
import { compareXY } from './actions/compareXY'
import PopUp from '../shared/PopUp/PopUp'
import { keydown, keyup } from './actions/keyContolPicman'
import { scoreText } from './actions/scoreText'

function Picman() {
    const [scalePicman, setScalePicman] = useState(1)
    const [positionPicman, setPositionPicman] = useState({ x: 0, y: 0, deg: 0 })
    const [isDown, setIsDown] = useState(false)
    const [snackXY, setSnackXY] = useState({ x: 230, y: 230 })
    const [isVisibleRules, setIsVisibleRules] = useState(true)
    const [isVisibleFail, setIsVisibleFail] = useState<boolean | null>(null)
    const [score, setScore] = useState(0)

    const moveInterval = useRef<NodeJS.Timeout | undefined>(undefined)
    const ramka = useRef<HTMLDivElement | null>(null)
    const snackRef = useRef<HTMLDivElement | null>(null)
    const picmanRef = useRef<HTMLDivElement | null>(null)

    const [refPicman, picmanInRamka] = useInView({ root: ramka.current, threshold: 1 })

    useEffect(() => {
        if (picmanInRamka) { setIsVisibleFail(!picmanInRamka) };
        if (typeof isVisibleFail === 'boolean') { setIsVisibleFail(!picmanInRamka) }
        if (!picmanInRamka) { clearInterval(moveInterval.current); moveInterval.current = undefined; }
    }, [picmanInRamka])

    useEffect(() => {
        if (picmanRef.current?.getBoundingClientRect() && snackRef.current?.getBoundingClientRect()) {
            compareXY(
                picmanRef.current.getBoundingClientRect(),
                snackRef.current.getBoundingClientRect(),
                () => {
                    setSnackXY({ x: Math.floor(Math.random() * 460), y: Math.floor(Math.random() * 460) });
                    setScalePicman((s => s + 0.1));
                    setScore(s => s + 1)
                })
        }
    }, [positionPicman])

    return (
        <main className={classes.main}>
            <div className={classes.score}>Score:{score}</div>
            <div className={classes.ramka} ref={ramka} tabIndex={0}
                onKeyUp={keyup(setIsDown)}
                onKeyDown={keydown(isDown, moveInterval, setIsDown, setPositionPicman, picmanInRamka)}>
                <div className={classes.snack} ref={snackRef}
                    style={{ transform: `translate(${snackXY.x}px, ${snackXY.y}px)` }}></div>
                <div className={classes.picman} ref={(e) => { refPicman(e); picmanRef.current = e }}
                    style={{ transform: `translate(${positionPicman.x}px, ${positionPicman.y}px) rotate(${positionPicman.deg}deg) scale(${scalePicman})` }}></div>
            </div>

            <PopUp isVisible={isVisibleRules} buttons={[{ text: "Начать игру", onclick: () => { setIsVisibleRules(false); ramka.current?.focus() } }]}>
                <h2>Правила игры:</h2>
                <ol style={{ listStyle: 'decimal inside' }}>
                    <li>Чтобы управлять нажимайте на клавиши ←, →, ↑, ↓</li>
                    <li>Для начала игры нажмите начать игру, а затем одну из клавиш ←, →, ↑, ↓</li>
                    <li>Управляйте Picman и собирайте снэки</li>
                    <li>При поедании снэка Picman увеличивается в размере</li>
                    <li>Хорошей игры!!!</li>
                </ol>
            </PopUp>
            <PopUp isVisible={!!isVisibleFail}
                buttons={[{
                    text: "Начать заново",
                    onclick: () => {
                        setIsVisibleFail(false);
                        setScalePicman(1);
                        setPositionPicman({ x: 0, y: 0, deg: 0 });
                        setSnackXY(({ x: 230, y: 230 }));
                        setScore(0)
                        ramka.current?.focus()
                    }
                }]}>
                Вы проиграли!<br />
                Ваш счёт {score} {scoreText(score)}
            </PopUp>
        </main>
    )
}

export default Picman