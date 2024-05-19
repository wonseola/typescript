
import { useNavigate } from "react-router-dom";
import { Online } from "../../components/online";
import { auth } from "../../firebase"
import styles from "./menu.module.scss"

export const Menu = () => {
    const user = auth.currentUser;
    const navi = useNavigate();
    const logout = () => {
        auth.signOut();
        navi("/login");
    }
    return (
        <div className={styles.menu}>
            <div className={styles.iam}>
                <div className={styles.mainrandom}>
                    <h1>랜덤몽</h1>
                </div>
                <div className={styles.profile}>
                    <img src={user?.photoURL ?? ""} />
                </div>
                <h1>{user?.displayName}</h1>
                <button onClick={logout}>로그아웃</button>
            </div>
            <div className={styles.set}>
                <ul>👍로그아웃하면 다시 돌아올 수 없읍니다~</ul>
                <ul>👍오류 생기면 문자 남기세요..</ul>
                <ul>👍 ㅇㅇㅇㅇㅇ...등등등....</ul>
                <Online />
            </div>
        </div>
    )
}