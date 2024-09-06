'use client'

import { Handjet } from 'next/font/google'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './styles.scss';

import classes from './main.module.scss'
import React, { useState } from 'react'
import Image from 'next/image'
import srcApt from './images/Apt.png'
import srcPicman from './images/Picman.png'
import srcChat from './images/Chat.png'
import srcTodo from './images/TodoList.png'
import Spinner from '../UI/Loaders/Spinner/Spinner'
import { Autoplay, EffectCoverflow, Keyboard, Navigation } from 'swiper/modules';
import Link from 'next/link';

const handjet = Handjet({ subsets: [], weight: "300" })

function Main() {
    const [allIsLoad, setAllIsLoad] = useState({ apt: false, picman: false, chat: false, todo: false });

    function checkAllIsLoad() {
        if (JSON.stringify(allIsLoad) === '{"apt":true,"picman":true,"chat":true,"todo":true}') { return true }
        else { return false }
    }



    return (
        <>
            <Swiper
                className={handjet.className}
                style={checkAllIsLoad() ? {} : { height: '0px', opacity: '0' }}
                modules={[Navigation, Autoplay, EffectCoverflow, Keyboard]}
                navigation={true}
                effect='coverflow'
                keyboard={{
                    enabled: true,
                }}
                autoplay={{ delay: 3000 }}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                slidesPerView={'auto'}
                centeredSlides
            >
                <SwiperSlide>
                    <Link href='/apt' className={classes.text}>Аренда квартир</Link>
                    <Image className={classes.apt} src={srcApt} alt='apt' onLoad={() => setAllIsLoad(e => { return { ...e, apt: true } })} loading='eager' />
                </SwiperSlide>
                <SwiperSlide>
                    <Link href='/picman' className={classes.text}>Игра Picman</Link>
                    <Image src={srcPicman} alt='picman' onLoad={() => setAllIsLoad(e => { return { ...e, picman: true } })} loading='eager' />
                </SwiperSlide>
                <SwiperSlide>
                    <Link href='/chat' className={classes.text}>Чат онлайн</Link>
                    <Image src={srcChat} alt='chat' onLoad={() => setAllIsLoad(e => { return { ...e, chat: true } })} loading='eager' />
                </SwiperSlide>
                <SwiperSlide>
                    <Link href='/todolist' className={classes.text}>Список дел</Link>
                    <Image src={srcTodo} alt='todo' onLoad={() => setAllIsLoad(e => { return { ...e, todo: true } })} loading='eager' />
                </SwiperSlide>
            </Swiper>
            {!checkAllIsLoad() && <Spinner />}
        </>
    )
}

export default Main