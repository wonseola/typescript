import { Link } from "react-router-dom"
import styles from "./roomkind.module.scss"

export const Roomkind = () => {
    return (
        <div className={styles.room}>
            <div className={styles.random}>
                <Link to="/random">
                    <h1>채팅 시작</h1>
                </Link>
            </div>
            <div className={styles.roomfind}>
                <Link to="/room">
                    <h1>방 찾기</h1>
                </Link>
            </div>
        </div>

    )
}