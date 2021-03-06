import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import mainImg from "../assets/images/main.svg";

const BgChanger = () => {

    const bgState = useSelector(s=>s.bgColor);
    const dispatch = useDispatch();
    useEffect(() => {
        const bgColor = window.localStorage.getItem("bgColor");
        dispatch({type:"BG_CHANGE", payload: Number(bgColor)});
    }, []);
    const bgChangeButtonClick = (e) => {
        const target = e.target;

        const value = Number(target.value);
        if(value === 1){
            dispatch({type: "BG_CHANGE", payload: 1});
            window.localStorage.setItem("bgColor", 1);
        }
        else if(value === 2){
            dispatch({type: "BG_CHANGE", payload: 2});
            window.localStorage.setItem("bgColor", 2);
        }
        else if(value === 3){
            dispatch({type: "BG_CHANGE", payload: 3});
            window.localStorage.setItem("bgColor", 3);
        }
        else if(value === 4){
            dispatch({type: "BG_CHANGE", payload: 4});
            window.localStorage.setItem("bgColor", 4);
        }
        else if(value === 5){
            dispatch({type: "BG_CHANGE", payload: 5});
            window.localStorage.setItem("bgColor", 5);
        }
            
    }

    return(
    <div id="bgChangeButtonWrap" className="hidden fixed left-5 top-5 md:flex flex-col items-center z-30">
        <button className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-green-400 border-2 border-white mb-2 shadow-lg" 
                value="1" 
                onClick={bgChangeButtonClick}
        >
            { bgState.id === 1 && <div id="pin" className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 shadow"></div>}
        </button>
        <button className="relative w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 via-red-400 to-pink-400 border-2 border-white mb-2 shadow-lg" 
                value="2" 
                onClick={bgChangeButtonClick}
        >
            { bgState.id === 2 && <div id="pin" className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-pink-500 shadow"></div>}
        </button>
        <button className="relative w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 border-2 border-white shadow-lg mb-2"
                value="3"
                onClick={bgChangeButtonClick}
        >
            { bgState.id === 3 && <div id="pin" className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-red-400 shadow"></div>}
        </button>
        <button className="relative w-12 h-12 rounded-full bg-gray-200 border-2 border-white shadow-lg mb-2"
                value="4"
                onClick={bgChangeButtonClick}
        >
            { bgState.id === 4 && <div id="pin" className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-gray-300 shadow"></div>}
        </button>
        <button className="relative w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-500 border-2 border-white shadow-lg"
                value="5"
                onClick={bgChangeButtonClick}
        >
            { bgState.id === 5 && <div id="pin" className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-gray-500 shadow"></div>}
        </button>
    </div>
    )
}
export default BgChanger;