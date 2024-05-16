import Link from "next/link"


function Nav() {
    return (
        <nav>
            <ol>
                <li><Link href=''>1</Link></li>
                <li><Link href=''>2</Link></li>
                <li><Link href=''>3</Link></li>
                <li><Link href=''>4</Link></li>
            </ol>
        </nav>
    )
}

export default Nav