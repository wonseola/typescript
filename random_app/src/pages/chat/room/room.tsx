import { useEffect, useState } from "react";
import Modal from "react-modal";
import { CreateRoom } from "./createroom";
import styles from "./room.module.scss";
import { auth, rtdb } from "../../../firebase";
import { onValue, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

export const Room = () => {
    const [modalopen, setModalopen] = useState(false);
    const [roomList, setRoomList] = useState<string[]>([]);
    const [selectedRoomInfo, setSelectedRoomInfo] = useState<any>(null);
    const navi = useNavigate();

    useEffect(() => {
        if (selectedRoomInfo) {
            navi(`/chat?${selectedRoomInfo}`);
            set(ref(rtdb, `status/chatting/${auth.currentUser?.uid}`), true);
        }
    }, [selectedRoomInfo]);


    useEffect(() => {
        const roomnameRef = ref(rtdb, `rooms/`);
        onValue(roomnameRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const roomNames = Object.keys(data).map((key) => data[key].roomname);
                setRoomList(roomNames);
            }
        });
    }, []);

    const fetchRoomInfo = (roomName: string) => {
        const roomRef = ref(rtdb, 'rooms');
        onValue(roomRef, (snapshot) => {
            const rooms = snapshot.val();
            if (rooms) {
                const roomId = Object.keys(rooms).find(roomId => rooms[roomId].roomname === roomName);
                if (roomId) {
                    setSelectedRoomInfo(roomId);
                }
            }
        });
    };


    const handleRoomClick = (room: string) => {
        fetchRoomInfo(room);
    };
    const openModal = () => {
        setModalopen(true);
    };

    const closeModal = () => {
        setModalopen(false);
    };
    const handleModalClose = (e: any) => {
        if (e.target.className === "overlay") {
            closeModal();
        }
    };

    return (
        <div>
            <button onClick={openModal}>방 만들기</button>
            <Modal
                isOpen={modalopen}
                ariaHideApp={false}
                onRequestClose={closeModal}
                className={styles.modal}
                overlayClassName={styles.overlay}>
                <CreateRoom onCloseModal={closeModal} />
            </Modal>
            {modalopen && (
                <div className={styles.overlay} onClick={handleModalClose}></div>
            )}
            <ul>
                {roomList.map((room, index) => (
                    <li key={index} onClick={() => handleRoomClick(room)}>{room}</li>
                ))}
            </ul>

        </div>
    );
};
