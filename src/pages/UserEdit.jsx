import profileImg from "../assets/images/StudyBook.svg";
import { useState } from "react";
import { apiScaffold } from "../api";
import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useRef } from "react";
import { useDispatch } from "react-redux";


const UserEdit = ({ history }) => {

    const imgRef = useRef();
    const dispatch = useDispatch();
    
    const [user, setUser] = useState({
        profile: "",
        profileFile: null,
        nickname: "",
        info: "λ°κ°μμ π",
        initImg: false
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( async () => {
        const act = jwtDecode(window.localStorage.getItem("act"));
        console.log(act);

        const res = await apiScaffold({
            "METHOD": "GET",
            "URL": `https://api.studybook.me/api/users/${act.id}`
        });
        console.log(res);
        setUser({
            ...user,
            id: res.user.id,
            nickname: res.user.nickname,
            profile: res.user.profilePreview ? "/images/"+res.user.profilePreview : "",
            info: res.user.info? res.user.info : "λ°κ°μμ π",
        });

        console.log(user);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const withdrawalButtonClick = () => {
        const result = prompt("νν΄ νλ €λ©΄ 'DELETE' λ₯Ό μλ ₯ν΄μ£ΌμΈμ.");
        if(result === "DELETE"){
            alert("νμμ΄ μ±κ³΅μ μΌλ‘ νν΄λμμ΅λλ€.");
        }
    }

    const imgDeleteButtonClick = () => {
        imgRef.current.value = "";
        setUser({...user, profile:"", profileFile:null, initImg: true});
    }

    const inputHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        if(name === "nickname"){
            setUser({...user, nickname : value});
        }
        else if(name === "info"){
            setUser({...user, info : value});
        }
    }
    
    const imageChangeButtonClick = e => {
        if(e.target.files.length === 0){
            e.target.value = "";
            return false;
        }
        const file = e.target.files[0];
        const fileName = file.name;

        if(/(\.gif|\.jpg|\.jpeg|\.png)$/i.test(fileName) === false){
            e.target.value = "";
            return alert("μ΄λ―Έμ§ νμΌμ μ νν΄μ£ΌμΈμ");
        }
        
        // FileReader μΈμ€ν΄μ€ μμ±
        const reader = new FileReader()
        // μ΄λ―Έμ§κ° λ‘λκ° λ κ²½μ°
        reader.onload = e => {
            setUser({...user, profile:e.target.result, profileFile: file, initImg: false});
        }
        // readerκ° μ΄λ―Έμ§ μ½λλ‘ νκΈ°
        reader.readAsDataURL(e.target.files[0])
    }
    const stopHandler = () => {
        history.push("/");
    }

    const submmitHandler = async () => {
        console.log(user);

        const formData =new FormData();
        formData.append("id", user.id);
        formData.append("nickname", user.nickname);
        formData.append("info", user.info);
        if(user.profileFile){
            formData.append("profile", user.profileFile);
        }
        formData.append("initImg", user.initImg);


        dispatch({type: "SET_TOAST", payload:{
            type: "INFO",
            content: "νμμ λ³΄λ₯Ό μμ μ€μλλ€."
        }});

        const res = await apiScaffold({
            METHOD: "PUT",
            URL: `/api/users/${user.id}`,
            DATA: formData
        });

        dispatch({type: "SET_TOAST", payload:{
            type: "SUCCESS",
            content: "νμμ λ³΄κ° μμ λμμ΅λλ€."
        }});

        if(user.initImg){
            dispatch({type:"REFRESH_PROFILE", payload: "" });
        }

        if(res.token){
            window.localStorage.setItem("act", res.token);
            const act = jwtDecode(res.token);
            dispatch({type:"REFRESH_PROFILE", payload: "/images/"+act.profile });
        }
        history.push("/");
    } 

    return(
    <div className="w-full flex flex-col items-center">
        <div className="font-noto-black text-3xl text-black">νμμ λ³΄ μμ </div>
        <div className="w-8/12 flex mt-10 border-b pb-5">
            <div className="w-1/2  flex flex-col items-center">
                <div className="w-24 h-24 flex justify-center items-center border rounded-full">
                    <img 
                        src={user.profile ? user.profile : profileImg} 
                        alt="img" 
                        className="w-20 h-20 rounded-full" 
                    />
                </div>
                <button className="w-8/12 px-5 py-2 bg-gradient-to-r rounded-sm text-white font-noto-bold mt-3">
                    <input 
                        type="file" 
                        onChange={imageChangeButtonClick}
                        ref={imgRef}
                    />
                </button>
                <button className="text-blue-600 font-noto-bold mt-3"
                    onClick={imgDeleteButtonClick}    
                >μ΄λ―Έμ§ μ κ±°
                </button>
            </div>
            <div className="mr-5 border-l"></div>
            <div className="w-1/2 flex flex-col justify-start">
                <label className="font-noto-medium text-lg">λλ€μ</label>
                <input className="w-full border rounded-sm p-1" 
                    name="nickname" 
                    value={user.nickname} 
                    onChange={inputHandler}
                />
                <br/>
                <label className="font-noto-medium text-lg">μκ°</label>
                <textarea 
                    className="p-2 border rounded-sm" 
                    name="info" 
                    value={user.info} 
                    onChange={inputHandler}>
                </textarea>
            </div>
        </div>
        <div className="w-8/12 flex justify-end">
            <button className="p-2 font-noto-bold text-xl text-red-400" onClick={withdrawalButtonClick}>νμνν΄</button>
        </div>
        <div className="w-8/12 flex justify-center mt-5 mb-16">
            <button 
                className="p-3 px-10 bg-gray-300  text-white font-noto-bold text-2xl rounded-sm mt-10 mr-10"
                onClick={stopHandler}
            >
                μ·¨μ
            </button>
            <button 
                onClick={submmitHandler}
                className="p-3 px-10 bg-indigo-300 text-white font-noto-bold text-2xl rounded-sm mt-10"
            >
                μμ 
            </button>
        </div>
    </div>
    );
}
export default withRouter(UserEdit);