import { push, ref, set } from "firebase/database";
import { auth, rtdb } from "../../../firebase";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./createroom.module.scss";

export const CreateRoom = ({ onCloseModal }: { onCloseModal: () => void }) => {
    const [roomname, setRoomname] = useState("");
    const [error, setError] = useState("");
    const user = auth.currentUser;
    const roomsRef = ref(rtdb, `rooms/`);

    const createRoom = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!roomname.trim()) {
            setError("방 이름을 입력하세요.");
            return;
        }
        if (user) {
            push(roomsRef, {
                roomname: roomname,
                uid: user.uid,
                user: user.displayName,
            });
            setRoomname("");
            setError("");
            onCloseModal();
        }
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRoomname(event.target.value);
        setError("");
    };

    const handleCloseModal = () => {
        onCloseModal();
    };


    return (
        <div className={styles.wrapper}>
            <form onSubmit={createRoom} className={styles.form1}>
                <button className={styles.xbtn} onClick={handleCloseModal}>X</button>
                <h2>새로운 방 만들기</h2>
                <input
                    type="text"
                    placeholder="방 이름"
                    value={roomname}
                    className={styles.input1}
                    onChange={onChange}
                />
                <button>방 만들기</button>
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
};
