import { onDisconnect, onValue, ref, remove, set } from "firebase/database";
import { auth, rtdb } from "../firebase";
import { useEffect } from "react";


export const Online = () => {
    const uid = auth.currentUser?.uid;

    const isonline = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                set(ref(rtdb, `status/online/${uid}`), true)
                set(ref(rtdb, `status/chatting/${uid}`), false)

                const onlineRef = ref(rtdb, `status/online/${uid}`);
                const chattingRef = ref(rtdb, `status/chatting/${uid}`);
                onDisconnect(onlineRef).remove();
                onDisconnect(chattingRef).remove();
            } else {
                // remove(ref(rtdb, `status/online/${uid}`));
            }
        });
    }
    useEffect(() => {
        isonline();
    }, []);

    const connectedRef = ref(rtdb, ".info/connected");
    onValue(connectedRef, (snap) => {
        if (snap.val() === true) {
        } else {
            remove(ref(rtdb, `status/online/${uid}`));
        }
    });



    return (<>
    </>
    );
}