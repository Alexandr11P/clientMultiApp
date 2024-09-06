'use client'
import React, { useState } from 'react'
import classes from './apt.module.scss'
import { baseUrl } from '@/env'
import Image from 'next/image'
import galleryIcon from '../images/Gallery.png'

function Apt(
    { offAnim, e, setGallery }:
        {
            offAnim: "none" | undefined,
            e: Apartment,
            setGallery: React.Dispatch<React.SetStateAction<string[]>>
        }) {


    const [isOpenPhone, setIsOpenPhone] = useState(false);



    return (
        <div className={classes.apt}
            style={{ backgroundImage: `url(${baseUrl}/img/${e.folder}/${e.gallery[0]}), url(${baseUrl}/img/error.png`, animation: offAnim }}>
            <div className={classes.header}>
                <div>{e.rooms} комнатная квартира площадью {e.area} м²</div><div className={classes.etag}>Этаж {e.floor}/{e.allFloor}</div>
            </div>
            <div className={classes.middle}>
                <Image className={classes.galleryI} width={60} height={60} alt='Open gallery' src={galleryIcon}
                    onClick={() => setGallery(e.gallery.map((el) => baseUrl + '/img/' + e.folder + '/' + el))} />
                <div className={classes.price}>{e.price} руб</div>
            </div>
            <div className={classes.footer}><div>{e.address}</div>
                {!isOpenPhone && <div className={classes.call} onClick={() => setIsOpenPhone(true)}></div>}
                {isOpenPhone && <div>{e.phoneNumber}</div>}
            </div>
        </div>)
}


export default Apt

