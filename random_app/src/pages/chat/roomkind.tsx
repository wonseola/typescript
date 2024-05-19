import { Link } from "react-router-dom"
import styles from "./roomkind.module.scss"

export const Roomkind = () => {
    return (
        <div className={styles.room}>
            <Link to="/random" className={styles.link}>
                <div className={styles.random}>
                    <h1>채팅 시작</h1>
                </div>
            </Link>
            <Link to="/room" className={styles.link}>
                <div className={styles.roomfind}>
                    <h1>방 찾기</h1>
                </div>
            </Link>
            <Link to="/globalchat" className={styles.link}>
                <div className={styles.roomfind}>
                    <h1>ddddddddddd</h1>
                </div>
            </Link>
        </div>

    )
}