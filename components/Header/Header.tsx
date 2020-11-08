import Link from "next/link"

import styles from "./header.module.scss";
import ActiveLink from "../ActiveLink";


export default function Header() {
  return (
    <header className={styles.header}>
      <div className="page-container">
        <div className={styles.content}>
          <Link href="/">
            <a className={styles.logo}>LOGO</a>
          </Link>
  
          <nav>
            <ActiveLink href="/" activeClassName={styles.activeLink}>
              <a className={styles.link}>Home</a>
            </ActiveLink>
    
            <ActiveLink href="/profile" activeClassName={styles.activeLink}>
              <a className={styles.link}>Profile</a>
            </ActiveLink>
  
            <ActiveLink href="/login" activeClassName={styles.activeLink}>
              <a className={styles.link}>Login</a>
            </ActiveLink>
          </nav>
        </div>
      </div>
    </header>
  )
}
