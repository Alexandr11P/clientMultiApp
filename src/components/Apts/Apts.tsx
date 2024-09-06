'use client'
import { getApt } from '@/store/aptSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import React, { useEffect, useMemo, useState } from 'react'
import { useGetApt } from './hooks/useGetApt'
import classes from './apts.module.scss'
import Filters from './Filters/Filters'
import Spinner from '../UI/Loaders/Spinner/Spinner'
import Image from 'next/image'
import Apt from './Apt/Apt'
import { useInView } from 'react-intersection-observer'

function Apts(this: any) {
    const { data, isFetching, isError, error } = useGetApt();
    const dispatch = useAppDispatch();
    const apts = useAppSelector((s) => s.aptSlice.filtered);
    const [offAnim, setOffAnim] = useState<'none' | undefined>(undefined);
    const [gallery, setGallery] = useState<string[]>([]);
    const [foto, setFoto] = useState(0);
    const [lazy, setLazy] = useState(0);

    const [refFooter, footerInViewport] = useInView({ rootMargin: '0px 0px 100px 0px', threshold: 0.1 })

    useEffect(() => { if (footerInViewport) { setLazy(s => s + 1) } }, [footerInViewport])

    useEffect(() => { refFooter(document.querySelector('footer')); dispatch(getApt(data)); setTimeout(() => setOffAnim('none'), 3000) }, [data]);

    if (isFetching) { return <Spinner /> }
    if (isError) {
        return <div className={classes.error}>
            Ошибка {error.status}!</div>
    }
    return (
        <>
            <Filters />

            <div className={classes.main}>
                {apts.slice(0, lazy * 6).map(e => <Apt key={e.id} offAnim={offAnim} setGallery={setGallery} e={e} />)}
            </div>

            {gallery[0] && <div className={classes.gallery}>
                <div className={classes.foto}>
                    <div className={classes.back} onClick={() => {
                        if (foto > 0) { setFoto(e => e - 1) }
                        else (setFoto(gallery.length - 1))
                    }}></div>
                    <Image alt='foto' src={gallery[foto]} width={1200} height={800}
                        onError={() => {
                            if (gallery[0]) {
                                if (foto < gallery.length - 1) { setFoto(e => e + 1) }
                                else { setGallery([]); setFoto(0) }
                            }
                        }} />
                    <div className={classes.next} onClick={() => {
                        if (foto < gallery.length - 1) { setFoto(e => e + 1) }
                        else (setFoto(0))
                    }}></div>
                </div>
                <div className={classes.close} onClick={() => { setGallery([]); setFoto(0) }}></div>
            </div >}
        </>
    )
}

export default Apts

