'use client'

import { useState, useEffect, useRef } from 'react'
import NameInput from '../components/NameInput'
import Introduction from '../components/Introduction'
import OrganizationalDimension from '../components/OrganizationalDimension'
import PedagogicalDimension from '../components/PedagogicalDimension'
import AdministrativeDimension from '../components/AdministrativeDimension'
import Cierre from "@/components/Cierre"
import SocialDimension from '../components/SocialDimension'
import FinalChallenge from '../components/FinalChallenge'
import { Volume, VolumeX } from 'lucide-react'

export default function EscapeRoom() {
    const [playerName, setPlayerName] = useState('')
    const [gameStage, setGameStage] = useState('nameInput')
    const [collectedCodes, setCollectedCodes] = useState<string[]>([])
    const [isPlaying, setIsPlaying] = useState(false) // Comienza pausado
    const [volume, setVolume] = useState(0.5) // Estado para el volumen
    const audioRef = useRef<HTMLAudioElement | null>(null) // Referencia al audio

    // Configuración del sonido de fondo
    useEffect(() => {
        const audio = new Audio('/sonidos/sonidoFondo.mp3');
        audio.loop = true; // Repetir en bucle
        audio.volume = volume; // Volumen inicial
        audioRef.current = audio;

        return () => {
            // Limpiar el audio al desmontar el componente
            audio.pause();
            audio.currentTime = 0;
        };
    }, [volume]);

    // Actualizar volumen cuando cambie el estado
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // Pausar o reanudar el sonido
    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch((error) => {
                    console.error('Error al intentar reproducir:', error);
                });
            }
            setIsPlaying(!isPlaying); // Alternar el estado de reproducción
        }
    };

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
                {/* Control de sonido */}
                <div className="absolute bottom-4 right-4 p-4 bg-gray-800/70 rounded-lg shadow-lg flex items-center gap-2">
                    {/* Botón de reproducción/pausa */}
                    <button
                        onClick={togglePlayPause}
                        className="p-2 text-yellow-500 hover:text-yellow-300 transition"
                        aria-label="Reproducir o Pausar"
                    >
                        {isPlaying ? <Volume /> : <VolumeX />}
                    </button>
                    {/* Control de volumen */}
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-24 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                        aria-label="Control de volumen"
                    />
                </div>
            </div>
        </div>
    )
}
