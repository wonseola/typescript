import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./chatroom.module.scss"
import { onValue, ref, set } from "firebase/database";
import EmojiPicker from "emoji-picker-react";
import { auth, rtdb } from "../firebase";



interface ChatMessage {
    message: string;
    username: string;
}
export const Chatroom = ({ roomname }: { roomname: string }) => {


    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [open, setOpen] = useState<boolean>(false);


    useEffect(() => {
        const chatRef = ref(rtdb, `/chat/${roomname}`);

        const unsubscribe = onValue(chatRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const messageList = Object.values(data) as ChatMessage[];
                setMessages(messageList);
            } else {
                setMessages([]);
            }
        });

        return () => unsubscribe();
    }, [roomname]);



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
        const uid = auth.currentUser?.uid;
        if (newMessage.trim() !== "") {
            set(ref(rtdb, `status/chatting/${uid}`), true)
            set(ref(rtdb, `chat/${roomname}/${time}`), {
                message: newMessage,
                username: name,
            })
            setNewMessage("");
        }
    };

    const handleEmoji = (event: any) => {
        setNewMessage((prev) => prev + event.emoji);
        setOpen(false);
    };

    return (
        <div className={styles.chat}>
            <div className={styles.chatview} ref={endRef}>
                <div className={styles.messages} >
                    {messages.map((message, index) => (
                        <div key={index}>
                            <div className={styles.name}>
                                {/* {message.username == auth.currentUser?.displayName ?
                                    null : <h1>{message.username}</h1>} */}
                            </div>
                            <div className={styles.message}>
                                {message.username == auth.currentUser?.displayName ?
                                    <h1 className={styles.messageme}>{message.message}</h1>
                                    :
                                    <h1>{message.message}</h1>}

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
                <div className={styles.emoji}>
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Grinning%20Face.png"
                        alt=""
                        onClick={() => setOpen((prev) => !prev)}
                        className={styles.emojiimg}
                    />
                    <div className={styles.picker}>
                        <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                    </div>
                </div>
                <button className={styles.send}>&rarr;</button>
            </form>
        </div>
    )
}