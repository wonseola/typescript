import { FormEvent, useState } from "react";
import styles from "./login.module.scss"
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const [id, setId] = useState("");
    // const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navi = useNavigate();
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e;
        if (name === "id") {
            setId(value);

            // } else if (name === "password") {
            //     setPassword(value);
            // }
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

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const idd = id + "@random.mong";
            const password = "aaaaaa";
            const credentials = createUserWithEmailAndPassword(auth, idd, password);
            await updateProfile((await credentials).user, {
                displayName: id,
                photoURL: getRandomAvatar(),
            });
            await signInWithEmailAndPassword(auth, idd, password);
            navi("/");

        } catch (e) {
            if (e instanceof FirebaseError) {
                switch (e.code) {
                    case "auth/weak-password":
                        setError("비밀번호를 6자 이상으로 설정해주세여");
                        break;
                    case "auth/email-already-in-use":
                        setError("사용중인 닉네임입니다");
                        break;
                    default:
                        setError("오류가 발생했습니다.");
                }
            }
        };
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
            {error && <p className={styles.error}>{error}</p>}
        </div>
    )

}
