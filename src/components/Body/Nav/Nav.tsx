import Link from "next/link"
import classes from './nav.module.scss'

function Nav() {
    return (
        <nav className={classes.panel}>
            <ol>
                <li><Link href='/'>Главная</Link></li>
                <li><Link href='/apt'>Аренда квартир</Link></li>
                <li><Link href='/picman'>Игра Picman</Link></li>
                <li><Link href='/todolist'>Список дел</Link></li>
                <li><Link href='/chat'>Чат онлайн</Link></li>
            </ol>
        </nav>
    )
}

export default Nav