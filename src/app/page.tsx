'use client'

import { useState } from 'react'
import NameInput from '../components/NameInput'
import Introduction from '../components/Introduction'
import OrganizationalDimension from '../components/OrganizationalDimension'
import PedagogicalDimension from '../components/PedagogicalDimension'
import AdministrativeDimension from '../components/AdministrativeDimension'
import Cierre from "@/components/Cierre"
import SocialDimension from '../components/SocialDimension'
import FinalChallenge from '../components/FinalChallenge'

export default function EscapeRoom() {
    const [playerName, setPlayerName] = useState('')
    const [gameStage, setGameStage] = useState('nameInput')
    const [collectedCodes, setCollectedCodes] = useState<string[]>([])


    const advanceStage = (nextStage: string) => {
        setGameStage(nextStage)
    }

    const addCode = (code: string) => {
        setCollectedCodes(prevCodes => [...prevCodes, code])
    }

    return (
        <div className="relative min-h-screen text-white">
            {/* Video de fondo */}
            <video
                className="absolute top-0 left-0 w-full h-full object-cover -z-10 blur-none"
                src="/loros.mp4"
                autoPlay
                loop
                muted
            />
            {/* Contenido principal */}
            <div className="relative bg-green-900/60 p-4 min-h-screen">
                <div className="container mx-auto">
                    <h1 className="text-5xl font-bold text-center mb-8 text-yellow-300 shadow-text">
                        Escape de la Selva
                    </h1>
                    {gameStage === 'nameInput' && <NameInput onSubmit={(name) => {
                        setPlayerName(name);
                        advanceStage('introduction')
                    }} />}
                    {gameStage === 'introduction' &&
                        <Introduction playerName={playerName} onComplete={() => advanceStage('organizational')} />}
                    {gameStage === 'organizational' && <OrganizationalDimension onComplete={(code) => {
                        addCode(code);
                        advanceStage('pedagogical')
                    }} />}
                    {gameStage === 'pedagogical' && <PedagogicalDimension onComplete={(code) => {
                        addCode(code);
                        advanceStage('administrative')
                    }} />}
                    {gameStage === 'administrative' && <AdministrativeDimension onComplete={(code) => {
                        addCode(code);
                        advanceStage('social')
                    }} />}
                    {gameStage === 'cierre' && <Cierre playerName={playerName} onComplete={() => advanceStage('social')} />}
                    {gameStage === 'social' && <SocialDimension onComplete={(code) => {
                        addCode(code);
                        advanceStage('final')
                    }} />}
                    {gameStage === 'final' && <FinalChallenge codes={collectedCodes} />}
                </div>
            </div>
        </div>
    )
}
