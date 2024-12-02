import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from "@/hooks/use-toast"
import { playSound } from '@/utils/sound'
// import Image from "next/image"
import Colaboracion from "../../public/images/circular.webp"

const tasks = [
  {
    question: "¿Qué palabra define la relación donde muchos se unen por un bien común, comparten alimentos y risas, se ayudan unos a otros para no caer?",
    hint: "Acción conjunta, coordinada y cooperativa para lograr una meta en común.",
    answer: "Colaboración",
    image: Colaboracion
  },
  {
    question: "¿Quiénes son estos importantes enlaces que coordinan y guían, conectando familias y estudiantes en la escuela?",
    hint: "Son personas que conectan familias y estudiantes, también son llamados preceptores.",
    answer: "Coordinadores",
    image: Colaboracion
  },
  {
    question: "¿Qué actividad permite a la comunidad compartir y contribuir con los más necesitados en tu escuela?",
    hint: "Evento solidario donde se corre una…",
    answer: "Maratón",
    image: Colaboracion
  },
  {
    question: "¿Qué proceso es este donde se escuchan muchas voces para decidir, tanto estudiantes como familias participan?",
    hint: "Una manera de involucrarse y dar tu opinión.",
    answer: "Participación",
    image: Colaboracion
  },
  {
    question: "¿Cómo se llaman estos tipos de proyectos que fluyen como un vínculo entre la institución y el entorno, haciendo proyectos juntos para crecer?",
    hint: "Estos proyectos son de …",
    answer: "Extensión",
    image: Colaboracion
  }
]

const BreakableScreen = ({ code, onComplete }: { code: string, onComplete: () => void }) => {
  const [isBroken, setIsBroken] = useState(false)
  const [isBreaking, setIsBreaking] = useState(false)
  const breakingTimer = React.useRef<NodeJS.Timeout | null>(null)
  const audioRef = React.useRef<HTMLAudioElement | null>(null)

  React.useEffect(() => {
    audioRef.current = new Audio('/sonidos/romper.mp3')
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
    }
  }, [])

  const startBreaking = () => {
    if (isBroken) return
    setIsBreaking(true)
    if (audioRef.current) {
      audioRef.current.play()
    }
    breakingTimer.current = setTimeout(() => {
      setIsBroken(true)
      setIsBreaking(false)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }, 3000)
  }

  const stopBreaking = () => {
    if (isBroken) return
    setIsBreaking(false)
    if (breakingTimer.current) {
      clearTimeout(breakingTimer.current)
    }
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  const handleInteractionStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    startBreaking()
  }

  const handleInteractionEnd = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    stopBreaking()
  }

  return (
      <div className="space-y-4">
        <div
            className="relative w-full h-[200px] border border-white rounded-lg overflow-hidden cursor-pointer select-none"
            onMouseDown={handleInteractionStart}
            onMouseUp={handleInteractionEnd}
            onMouseLeave={handleInteractionEnd}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
            onTouchCancel={handleInteractionEnd}
            role="button"
            tabIndex={0}
            aria-label="Mantén presionado para revelar el código"
        >
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-gray-800">
            {isBroken ? code : ''}
          </div>
          {!isBroken && (
              <div
                  className={`absolute inset-0 bg-white transition-all duration-300 ${
                      isBreaking ? 'animate-pulse bg-opacity-50' : ''
                  }`}
              />
          )}
          {isBreaking && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
          )}
        </div>
        {isBroken && (
            <Button
                onClick={onComplete}
                className="w-full"
            >
              Continuar
            </Button>
        )}
      </div>
  )
}

export default function SocialDimension({ onComplete }: { onComplete: (code: string) => void }) {
  const [stage, setStage] = useState<'intro' | 'quiz' | 'code'>('intro')
  const [currentTask, setCurrentTask] = useState(0)
  const [answer, setAnswer] = useState('')
  const [showHint, setShowHint] = useState(false)
  const { toast } = useToast()
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = '/sonidos/cacatua.mp3';
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (answer.toLowerCase() === tasks[currentTask].answer.toLowerCase()) {
      playSound('correct')
      if (currentTask < tasks.length - 1) {
        setCurrentTask(currentTask + 1)
        setAnswer('')
        setShowHint(false)
      } else {
        setStage('code')
      }
      toast({
        title: "¡Respuesta correcta!",
        description: "Avanzando a la siguiente pregunta.",
      })
    } else {
      playSound('incorrect')
      toast({
        title: "Respuesta incorrecta",
        description: "Intenta de nuevo.",
        variant: "destructive",
      })
    }
  }

  if (stage === 'intro') {
    return (
        <div className="flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-4xl bg-white/70 backdrop-blur-lg border border-white/40 rounded-2xl shadow-2xl md:p-10 p-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-green-800">
              Dimensión Socio - Comunitaria
            </h2>
            <div className="space-y-4 text-center">
              <p className="text-xl md:text-2xl text-black">
                Luego de pasar por algunos obstáculos y desafíos en la densa selva amazónica, finalmente llegas a un claro donde el sol ilumina una antigua escalera de piedra que parece llevar a la cima de la montaña.
              </p>
              <p className="text-xl md:text-2xl text-black italic">
                Antes de poder subir, un guacamayo de plumas coloridas aterriza frente a ti. Sus ojos brillan con inteligencia, y se dirige a ti en un tono amistoso:
              </p>
              <div className="flex flex-col items-center space-y-4">
                <audio
                    ref={audioRef}
                    controls
                    className="w-full max-w-md"
                    aria-label="Reproductor de audio"
                >
                  Tu navegador no soporta el elemento de audio.
                </audio>
                <Button
                    onClick={() => setStage('quiz')}
                    size="lg"
                    className="mx-auto block"
                >
                  Comenzar Desafío
                </Button>
              </div>
            </div>
          </div>
        </div>
    )
  }

  if (stage === 'code') {
    return (
        <div className="flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-4xl bg-white/70 backdrop-blur-lg border border-white/40 rounded-2xl shadow-2xl md:p-10 p-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-green-800">
              Dimensión Socio - Comunitaria
            </h2>
            <div className="space-y-6">
              <p className="text-2xl text-center text-green-800 font-bold">
                ¡Felicidades! Has completado el desafío de la dimensión Socio - Comunitaria.
              </p>
              <p className="text-xl text-center text-gray-700">
                Te daré un código para que al final puedas ser rescatado.
                Mantén presionado el cuadro durante 3 segundos para revelar tu código.
              </p>
              <BreakableScreen
                  code="S - 2"
                  onComplete={() => onComplete('S - 2')}
              />
            </div>
          </div>
        </div>
    )
  }

  return (
      <div className="flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-4xl bg-white/70 backdrop-blur-lg border border-white/40 rounded-2xl shadow-2xl md:p-10 p-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-green-800">
            Dimensión Socio - Comunitaria
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div className="order-2 md:order-1 space-y-4 md:space-y-6">
              <p className="text-xl md:text-2xl text-black text-center">
                {tasks[currentTask].question}
              </p>

              {showHint && (
                  <p className="text-lg md:text-xl text-center text-yellow-600">
                    Pista: {tasks[currentTask].hint}
                  </p>
              )}

              <Input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Tu respuesta"
                  className="text-black text-base md:text-xl py-2 px-4"
              />

              <div className="flex justify-center gap-4 md:gap-6">
                <Button size="lg" type="submit" onClick={handleSubmit}>Enviar</Button>
                <Button
                    size="lg"
                    type="button"
                    onClick={() => setShowHint(true)}
                    variant="secondary"
                >
                  Mostrar Pista
                </Button>
              </div>
            </div>

            <div className="order-1 md:order-2 flex justify-center items-center">
              <div className="w-full max-h-[500px] bg-gray-200 rounded-2xl shadow-xl"></div>
            </div>
          </div>
        </div>
      </div>
  )
}