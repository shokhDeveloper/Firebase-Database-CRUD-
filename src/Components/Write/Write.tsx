import React, { ChangeEvent, useEffect, useState } from "react";
import {getDatabase, ref, set, push} from "firebase/database"
import { app } from "../../Settings";
export const Write:React.FC = ():JSX.Element => {
    const [inputValue1, setInputValue1] = useState<string>()
    const [inputValue2, setInputValue2] = useState<string>()
    const handleSaveData = () => {
        const db = getDatabase(app)
        const newDocRef = push(ref(db, "nature/fruits"))   
        set(newDocRef, {
           fruitName: inputValue1,
           fruitDefination: inputValue2 
        } ).then(() => alert("Data saved success") ).catch(() => console.log("ERROR"))
    }
    return(
        <div>
            <input type="text" onChange={(evt:ChangeEvent<HTMLInputElement>) => setInputValue1(evt.target.value)} />
            <input type="text" onChange={(evt:ChangeEvent<HTMLInputElement>) =>  setInputValue2(evt.target.value)} />
            <button onClick={handleSaveData}>SaveData</button>
        </div>
    )
}