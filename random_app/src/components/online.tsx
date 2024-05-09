import { useEffect, useState } from 'react';
import { auth, rtdb } from "../firebase";
import { onDisconnect, onValue, ref, set } from "firebase/database";
import { deleteUser } from 'firebase/auth';

export const Online = () => {
    const user = auth.currentUser;
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);



    useEffect(() => {
        const isUserOnline = async (displayName: string | null) => {
            if (displayName) {
                const userStatusRef = ref(rtdb, `/status/${displayName}`);
                await set(userStatusRef, true);
                onDisconnect(userStatusRef).remove()
                    .then(() => { if (user) deleteUser(user) });
            }

        };


        if (user) isUserOnline(user.displayName);

    }, [user]);

    useEffect(() => {
        const onlineUsersRef = ref(rtdb, '/status');

        const fetchOnlineUsers = (snapshot: any) => {
            const data = snapshot.val();
            if (data) {
                const users = Object.keys(data).filter(key => data[key] === true);
                setOnlineUsers(users);
            }
        };
        onValue(onlineUsersRef, fetchOnlineUsers);
    }, []);

    return (
        <>
            <ul>
                <h2>접속중인 유저</h2>
                {onlineUsers.map((user, index) => (
                    <li key={index}>{user}</li>
                ))}
            </ul>
        </>
    );
}