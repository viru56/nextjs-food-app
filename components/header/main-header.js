import Link from 'next/link';
import Image from 'next/image';

import logoImg from '@/assets/logo.png';
import classes from './main-header.module.css';
import MainheaderBacground from './main-header-bacground';
import NavLink from './nav-link';
export default function MainHeader() {
    return (
        <>
            <MainheaderBacground />
            <header className={classes.header}>
                <Link href='/' className={classes.logo}>
                    <Image src={logoImg} alt='A plate of food' priority />
                    NextLevel Food
                </Link>
                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <NavLink href='/meals'>Browse Meal</NavLink>
                        </li>
                        <li>
                            <NavLink href='/community'>Foodies Community</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}