import { useParams } from "react-router-dom";


export const RandomChat = () => {


    let { params } = useParams();
    return (
        <div>
            <h1>여기는 {params} 페이지</h1>

        </div>
    );
};
