import React, { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database"
import { app } from "../../Settings";
export const Read: React.FC = (): JSX.Element => {
    type fruitType = {
        fruitName: string,
        fruitDefination: string
    }
    const [fruitArray, setFruitArray] = useState<fruitType[] | null>(null)

    const handleGetData = async (): Promise<void> => {
        const db = await getDatabase(app)
        const dbRef = await ref(db, "/nature/fruits")
        if ((await get(dbRef)).exists()) {
            setFruitArray(Object.values((await get(dbRef)).val()))
        } else {
            console.log("error")
        }
    }
    useEffect(() => {
        console.log(fruitArray)
    }, [fruitArray])
    return (
        <>
            <button onClick={handleGetData}>Click</button>
        </>
    )
}