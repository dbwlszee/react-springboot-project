import React from "react";
import styles from './UserNav.module.css';

const UserNav = () => {

    return(
        <>
            <nav className={styles.navbar}>
                <div className={styles.home}>
                    <a href="/">CRUD</a>
                </div>

                <ul className={styles.menu}>
                    <li><a href="/add-users">AddUser</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            </nav>
        </>
    )
}

export default UserNav;