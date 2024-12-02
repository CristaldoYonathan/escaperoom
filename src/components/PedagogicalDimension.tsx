import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from "@/hooks/use-toast"
import { playSound } from '@/utils/sound'
import Image from "next/image"
import Interdisciplinaria from "../../public/images/interdisciplinaria.webp"
import Transposicion from "../../public/images/transposición.webp"
import Planificacion from "../../public/images/Planificación.webp"
import FalsoP from "../../public/images/falsoP.webp"
import VerdaderoP from "../../public/images/VerdaderoP.webp"


const tasks = [
  {
    question: "¿Qué tipo de enseñanza utiliza la ESIM para combinar diferentes materias en un solo proyecto educativo?",
    hint: "Se enseña más de una materia al mismo tiempo.",
    answer: "interdisciplinaria",
    image: Interdisciplinaria
  },
  {
    question: "¿Cómo adaptan los docentes el conocimiento para hacerlo comprensible para los estudiantes?",
    hint: "Transforman conceptos complejos (conocimiento científico) para que sean fáciles de entender.",
    answer: "transposición",
    image: Transposicion
  },
  {
    question: "¿Qué estrategia sigue la ESIM al planificar los contenidos y temas para el año escolar?",
    hint: "Es una guía detallada que los docentes crean.",
    answer: "planificación",
    image: Planificacion
  },
  {
    question: "En la ESIM, cada docente planifica sus clases de forma aislada, sin colaborar con otros docentes de distintas áreas. ¿Esto es verdadero o falso?",
    hint: "Piensa en la colaboración entre docentes",
    answer: "Falso",
    image: FalsoP
  },
  {
    question: "En la ESIM, los estudiantes participan activamente en proyectos que integran varias materias, aplicando sus conocimientos al resolver problemas reales. ¿Esto es verdadero o falso?",
    hint: "Considera el enfoque de aprendizaje práctico",
    answer: "Verdadero",
    image: VerdaderoP
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

export default function PedagogicalDimension({ onComplete }: { onComplete: (code: string) => void }) {
  const [currentTask, setCurrentTask] = useState(0)
  const [answer, setAnswer] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [allTasksCompleted, setAllTasksCompleted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (answer.toLowerCase() === tasks[currentTask].answer.toLowerCase()) {
      playSound('correct')
      if (currentTask < tasks.length - 1) {
        setCurrentTask(currentTask + 1)
        setAnswer('')
        setShowHint(false)
      } else {
        setAllTasksCompleted(true)
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

  return (
      <div className="flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-4xl bg-white/70 backdrop-blur-lg border border-white/40 rounded-2xl shadow-2xl md:p-10 p-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-green-800">
            Dimensión Pedagógica - Didáctica
          </h2>

          {!allTasksCompleted ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
                <div className="order-2 md:order-1 space-y-4 md:space-y-6">
                  <p className="text-xl md:text-2xl text-black text-center ">
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
                  <Image
                      src={tasks[currentTask].image}
                      alt="esim"
                      width={500}
                      height={500}
                      className="rounded-2xl shadow-xl object-cover w-full max-h-[400px] md:max-h-[500px]"
                  />
                </div>
              </div>
          ) : (
              <div className="space-y-6">
                <p className="text-2xl text-center text-green-800 font-bold">
                  ¡Felicidades! Has completado todas las preguntas de esta dimensión.
                </p>
                <p className="text-xl text-center text-gray-700">
                  Mantén presionado el cuadro durante 3 segundos para revelar tu código.
                  No te olvides de guardar el código.
                </p>
                <BreakableScreen
                    code="E - 1"
                    onComplete={() => onComplete('E - 1')}
                />
              </div>
          )}
        </div>
      </div>
  )
}