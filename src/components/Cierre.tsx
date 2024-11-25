import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Cierre({ onComplete }: { playerName: string, onComplete: () => void }) {
    const [videoWatched, setVideoWatched] = useState(true) // Update 1: Set videoWatched to true initially

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Introducción</h2>
            <video
                src="/placeholder.svg?height=360&width=640"
                controls
                onEnded={() => setVideoWatched(true)}
                className="w-full mb-4"
            >
                Tu navegador no soporta el elemento de video.
            </video>
            <Button onClick={() => setVideoWatched(true)} className="mb-4"> {/* Update 2: Add Skip Video button */}
                Saltar Video
            </Button>
            <Button onClick={onComplete} disabled={!videoWatched}>
                Continuar
            </Button>
        </div>
    )
}

