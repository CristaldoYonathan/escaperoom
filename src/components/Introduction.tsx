'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Introduction({ playerName, onComplete }: { playerName: string, onComplete: () => void }) {
    const [videoWatched, setVideoWatched] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setVideoWatched(true), 5000) // Simula que el video se ha visto después de 5 segundos
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white/70 backdrop-blur-lg border border-white/40 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-green-800 text-center">Es hora de escapar de la Selva, {playerName}</h2>
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none rounded-md" />
                <iframe
                    width="full"
                    height="380"
                    src="https://www.youtube.com/embed/B_ciVjGehzQ?si=eiPvLaB6NOKx6OGa"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full rounded-md shadow-md"
                ></iframe>
            </div>
            <p className="text-gray-600 mb-6 text-center">
                Te adentras en la densa selva amazónica, donde cada decisión puede ser crucial para tu supervivencia.
                Prepárate para enfrentar los desafíos que la naturaleza y este entorno único te presentarán.
            </p>
            <div className="flex justify-center">
                <Button
                    onClick={onComplete}
                    disabled={!videoWatched}
                    className={`px-6 py-3 text-lg font-semibold transition-all duration-300 ${
                        videoWatched
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    }`}
                >
                    {videoWatched ? 'Adéntrate en la Selva' : 'Observando el Entorno...'}
                </Button>
            </div>
        </div>
    )
}

