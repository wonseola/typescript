
import { Online } from "../../components/online";
import { auth } from "../../firebase"
import styles from "./menu.module.scss"

export const Menu = () => {
    const user = auth.currentUser;
    return (
        <div className={styles.menu}>
            <div className={styles.iam}>
                <div className={styles.profile}>
                    <img src={user?.photoURL ?? ""} alt="프로필 사진" />
                </div>
                <h1>{user?.displayName}</h1>
                <button>닉넴 바꾸기</button>
            </div>
            <div className={styles.set}>
                <ul>asdf</ul>
                <ul>asdfadf</ul>
                <ul>메뉴같은거 ㅇㅇㅇ 뭐뭐뭐</ul>
                <Online />
            </div>
        </div>
    )
}