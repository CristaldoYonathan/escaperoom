import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from "@/hooks/use-toast"
import { playSound } from '@/utils/sound'

export default function FinalChallenge({ codes }: { codes: string[] }) {
  const [answer, setAnswer] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (answer.toUpperCase() === 'ESIM') {
      playSound('correct')
      setIsComplete(true)
      toast({
        title: "¡Felicidades!",
        description: "Has completado el Escape Room y has sido rescatado.",
      })
    } else {
      playSound('incorrect')
      toast({
        title: "Código incorrecto",
        description: "Intenta de nuevo.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-green-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-green-800">Desafío Final</h2>
      <div className="flex items-center mb-6">
        <div className="w-1/2 pr-4">
          <video
            src="/loros.mp4?height=360&width=640"
            controls
            className="w-full rounded-lg shadow-md"
          >
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
        <div className="w-1/2 pl-4">
          <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
            <rect width="200" height="200" fill="#FFD700" />
            <circle cx="70" cy="70" r="20" fill="black" />
            <circle cx="130" cy="70" r="20" fill="black" />
            <path d="M 60 120 Q 100 150 140 120" stroke="black" strokeWidth="5" fill="none" />
          </svg>
        </div>
      </div>
      <p className="mb-4 text-black">
        Al final de la montaña te encuentras con los rescatistas y una cacatúa parlante.
      </p>
      <p className="mb-4 italic text-green-700">
        &#34;¡Hola, viajero! Has llegado muy lejos. Para validar tu identidad, debes darnos el código que solo un verdadero conocedor de las dimensiones educativas sabe. Ordena las letras con los 4 dígitos que has descubierto y logra ser rescaled.&#34;
      </p>
      <p className="mb-4 font-bold text-green-800">
        Códigos recolectados: {codes.join(', ')}
      </p>
      {!isComplete ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Ingresa el código final"
            className="bg-white text-black"
          />
          <Button type="submit" className="w-full">Enviar Código Final</Button>
        </form>
      ) : (
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600 mb-4">
            ¡Felicidades! Has completado el Escape Room y has sido rescatado.
          </p>
          <Button onClick={() => window.location.reload()} className="bg-green-500 hover:bg-green-600">
            Jugar de Nuevo
          </Button>
        </div>
      )}
    </div>
  )
}

