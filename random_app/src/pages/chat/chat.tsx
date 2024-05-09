import styles from "./chat.module.scss"

export const Chat = () => {
    return (
        <div className={styles.chat}>
            <div className={styles.chatview}>
                <div className={styles.messages}>
                    <div className={styles.name}>
                        <h1>나는 민수</h1>
                    </div>
                    <div className={styles.message}>
                        <h1>민수 짱!! </h1>
                    </div>

                    <div className={styles.messages}>
                        <div className={styles.name}>
                            <h1>최강 수진이</h1>
                        </div>
                        <div className={styles.message}>
                            <h1>ㅋ </h1>
                        </div>
                    </div>
                    <div className={styles.messages}>
                        <div className={styles.name}>
                            <h1>멋쟁이</h1>
                        </div>
                        <div className={styles.message}>
                            <h1>허허,,~~~ </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.chatinput}>
                <input type="text" placeholder="할말 쓰삼" />
                <button>😁</button>
                <button>&rarr;</button>
            </div>
        </div>
    )
}