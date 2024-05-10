import { FormEvent, useState } from "react";
import styles from "./login.module.scss"
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const [id, setId] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navi = useNavigate();
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e;
        if (name === "id") {
            setId(value);
        };
    }

    const getRandomAvatar = () => {
        const avatarImages = [
            "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Astonished%20Face.png",
            "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Black%20Heart.png",
            "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20Savoring%20Food.png",
            "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Grinning%20Cat%20with%20Smiling%20Eyes.png",
            "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Partying%20Face.png",
        ];
        const randomIndex = Math.floor(Math.random() * avatarImages.length);
        return avatarImages[randomIndex];
    };

    function getRandomString(length: number) {
        const characters = '0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    const num = getRandomString(6);

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const idd = id + "@" + num + ".mong";
            const password = num;

            const credentials = await createUserWithEmailAndPassword(auth, idd, password);
            await updateProfile(credentials.user, {
                displayName: id,
                photoURL: getRandomAvatar(),
            });
            await signInWithEmailAndPassword(auth, idd, password);
            setIsLoading(false);
            navi("/");


        } catch (e) {
            setIsLoading(false);
            if (e instanceof FirebaseError) {
                switch (e.code) {
                    case "auth/email-already-in-use":
                        setError("사용중인 닉네임입니다");
                        navi("/");
                        break;
                    default:
                        setError("오류가 발생했습니다.");
                }
            }
        }
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.imgdiv}>
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20Blowing%20a%20Kiss.png" />
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Heart%20with%20Arrow.png" />
            </div>
            <div className="main">
                <h2 className={styles.text1}>RANDOM MONG</h2>
                <h2 className={styles.text2}>예상할 수 없는 대화</h2>
            </div>
            <form className={styles.setlog} onSubmit={handleLogin}>
                <input type="text" placeholder="닉넴" value={id} name="id" onChange={onChange} required />
                {/* <input type="password" placeholder="비ㅁㄹ번호" value={password} name="password" onChange={onChange} required /> */}
                <button>GO &rarr;</button>
            </form>
            {isLoading && <p>로그인 중 입니당 ㄱㄷㄱㄷ</p>}
            {error && <p className={styles.error}>{error}</p>}
        </div>
    )

}
