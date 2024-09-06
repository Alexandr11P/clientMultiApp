import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useState } from 'react'
import classes from './filters.module.scss'
import Input from '@/components/UI/Input/Input';
import Button from '@/components/UI/Button/Button';
import { areaFilter, areaSort, etagFilter, etagSort, getApt, priceFilter, priceSort, roomsFilter, roomsSort } from '@/store/aptSlice';


function Filters() {

    const dispatch = useAppDispatch();
    const original = useAppSelector((s) => s.aptSlice.original)

    const [isDownToUp, setIsDownToUp] = useState(true);
    const [select, setSelect] = useState<number>(0);
    const [isFilters, setIsFilters] = useState(false);

    const [priceFrom, setPriceFrom] = useState(0);
    const [priceTo, setPriceTo] = useState(0);
    const [roomsFrom, setRoomsFrom] = useState(0);
    const [roomsTo, setRoomsTo] = useState(0);
    const [areaFrom, setAreaFrom] = useState(0);
    const [areaTo, setAreaTo] = useState(0);
    const [etagFrom, setEtagFrom] = useState(0);
    const [etagTo, setEtagTo] = useState(0);

    function CI(state: number, setState: React.Dispatch<React.SetStateAction<number>>) {
        return {
            value: state !== 0 ? state : '', onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                if (Number(e.target.value) || e.target.value === '') { setState(+e.target.value) }
            }
        }
    }

    function toFilter() {
        if (priceFrom || priceTo) { dispatch(priceFilter({ from: priceFrom, to: priceTo })) }
        if (etagFrom || etagTo) { dispatch(etagFilter({ from: etagFrom, to: etagTo })) }
        if (areaFrom || areaTo) { dispatch(areaFilter({ from: areaFrom, to: areaTo })) }
        if (roomsFrom || roomsTo) { dispatch(roomsFilter({ from: roomsFrom, to: roomsTo })) }
    }

    function toggle(id: number, sortFunction: (payload: boolean) => { payload: boolean, type: string }) {
        if (id === select) {
            setIsDownToUp((e) => {
                dispatch(sortFunction(!e))
                return !e
            })
        }
        else {
            setSelect(id);
            setIsDownToUp(true)
            dispatch(sortFunction(true))
        }
    }

    function colorSelect(id: number) {
        if (select === id) {
            return { style: { color: 'white' } }
        }
    }

    return (
        <>
            <div className={classes.sorts}>
                <div>Сортировать по:</div>
                <ul>
                    <li onClick={() => { toggle(1, priceSort) }} {...colorSelect(1)}>
                        Цена {select === 1 ? isDownToUp ? '↑' : '↓' : ''}</li>
                    <li onClick={() => { toggle(2, etagSort) }} {...colorSelect(2)}>
                        Этаж {select === 2 ? isDownToUp ? '↑' : '↓' : ''}</li>
                    <li onClick={() => { toggle(3, roomsSort) }} {...colorSelect(3)}>
                        Количество комнат {select === 3 ? isDownToUp ? '↑' : '↓' : ''}</li>
                    <li onClick={() => { toggle(4, areaSort) }} {...colorSelect(4)}>
                        Площадь {select === 4 ? isDownToUp ? '↑' : '↓' : ''}</li>
                </ul>
            </div>
            {isFilters
                ? <div className={classes.filters}>
                    <ul>
                        <li>
                            Цена от{' '}
                            <Input type='text' placeholder='руб.' {...CI(priceFrom, setPriceFrom)}
                            /> до <Input type='text' placeholder='руб.' {...CI(priceTo, setPriceTo)} />
                        </li>
                        <li>
                            Комнат от <Input type='text' {...CI(roomsFrom, setRoomsFrom)}
                            /> до <Input type='text' {...CI(roomsTo, setRoomsTo)} />
                        </li>
                        <li>
                            Площадь от <Input type='text' placeholder='м²' {...CI(areaFrom, setAreaFrom)}
                            /> до <Input type='text' placeholder='м²' {...CI(areaTo, setAreaTo)} />
                        </li>
                        <li>
                            Этаж от <Input type='text' {...CI(etagFrom, setEtagFrom)}
                            /> до <Input type='text'  {...CI(etagTo, setEtagTo)} /></li>
                    </ul>
                    <Button onClick={() => { toFilter(); setIsFilters(false) }}>Отфильтровать</Button>
                </div>
                : <Button onClick={() => { setIsFilters(true); dispatch(getApt(original)); setSelect(0) }}>Показать фильтры</Button>}
        </>
    )
}

export default Filters