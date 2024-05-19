import { useEffect, useState } from "react";
import { Chatroom } from "../../components/chatroom";

export const Chat = () => {

    const [param, setParam] = useState("");

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);

        queryParams.forEach((_, key) => {
            console.log(`${key}`);
            setParam(key);
        });
    }, []);

    return (

        <Chatroom roomname={param} />
    )
}