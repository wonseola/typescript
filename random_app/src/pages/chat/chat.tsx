import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./chat.module.scss"
import { onValue, ref, set } from "firebase/database";
import { auth, rtdb } from "../../firebase";


interface ChatMessage {
    message: string;
    username: string;
}
export const Chat = () => {


    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState("");



    useEffect(() => {
        const chatRef = ref(rtdb, "chat/");
        onValue(chatRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const messageList = Object.values(data) as ChatMessage[];
                setMessages(messageList);
            }
        });

    }, []);

    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollTop = endRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const name = auth.currentUser?.displayName;
        const time = Date.now();
        if (newMessage.trim() !== "") {
            set(ref(rtdb, `status/chatting/`), true)
            set(ref(rtdb, `chat/${time}`), {
                message: newMessage,
                username: name,
            })
            setNewMessage("");
        }
    };


    return (
        <div className={styles.chat}>
            <div className={styles.chatview} ref={endRef}>
                <div className={styles.messages} >
                    {messages.map((message, index) => (
                        <div key={index}>
                            <div className={styles.name}>
                                <h1>{message.username}</h1>
                            </div>
                            <div className={styles.message}>
                                <h1>{message.message}</h1>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <form className={styles.chatinput} onSubmit={sendMessage}>
                <input type="text"
                    placeholder="할말 쓰삼"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button>😁</button>
                <button>&rarr;</button>
            </form>
        </div>
    )
}