
import { Roomkind } from "./chat/roomkind";
import { Menu } from "./menu/menu";
import styles from "./home.module.scss";
import { Outlet } from "react-router-dom";

export const Home = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.menu}>
                    <Menu />
                </div>
                <div className={styles.content}>
                    <Roomkind />
                    {/* <Chat /> */}
                    <Outlet />
                </div>
            </div>
        </div>
    )
}