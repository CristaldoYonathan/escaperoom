'use client'

import Social from "@/components/SocialDimension";
import {useState} from "react";

export default function Prueba() {
    const [collectedCodes, setCollectedCodes] = useState<string[]>([])
    return (
        <div className="bg-green-700">
            <Social onComplete={(code) => setCollectedCodes([...collectedCodes, code])}/>
        </div>
    )
}