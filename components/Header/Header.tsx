import styles from "./header.module.scss";

import ActiveLink from "../ActiveLink";


export default function Header() {
  return (
    <header className={styles.header}>
      <div className="page-container">
        <div className={styles.content}>
          LOGO
  
          <nav>
            <ActiveLink href="/" activeClassName={styles.activeLink}>
              <a className={styles.link}>Home</a>
            </ActiveLink>
    
            <ActiveLink href="/profile" activeClassName={styles.activeLink}>
              <a className={styles.link}>Profile</a>
            </ActiveLink>
          </nav>
        </div>
      </div>
    </header>
  )
}
