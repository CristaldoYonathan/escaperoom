import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from "@/hooks/use-toast"
import { playSound } from '@/utils/sound'
import Image from "next/image";

const tasks = [
  {
    question: "¿Qué sistema de comunicación usa la ESIM para garantizar un flujo bidireccional efectivo?",
    hint: "Es una herramienta digital de comunicación.",
    answer: "WhatsApp"
  },
  {
    question: "¿Qué tipo de estructura organizativa utiliza la ESIM para evitar jerarquías tradicionales?",
    hint: "No es una estructura vertical tradicional",
    answer: "Circular"
  },
  {
    question: "¿Cómo se adapta el uso del tiempo en la ESIM para permitir que los docentes se reúnan y planifiquen juntos de manera eficiente?",
    hint: "Se adapta con facilidad a las opiniones o cambios.",
    answer: "Flexible"
  },
  {
    question: "¿Qué herramienta educativa organiza los contenidos de la ESIM para que todos los estudiantes sigan el mismo camino de aprendizaje?",
    hint: "Es el plan general que guía las materias.",
    answer: "Currículum"
  },
  {
    question: "¿Qué aspecto en la ESIM establece reglas para una convivencia organizada?",
    hint: "Sin ellas, los estudiantes no regulan su conducta ni mantienen un orden.",
    answer: "Normas"
  }
]

export default function OrganizationalDimension({ onComplete }: { onComplete: (code: string) => void }) {
  const [currentTask, setCurrentTask] = useState(0)
  const [answer, setAnswer] = useState('')
  const [showHint, setShowHint] = useState(false)
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
        onComplete('M - 4')
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
    <div className="max-w-2xl mx-auto bg-green-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-green-800">Dimensión Organizacional</h2>
      <form onSubmit={handleSubmit}>
        <p className="mb-4 text-black">{tasks[currentTask].question}</p>
        {showHint && <p className="mb-4 text-yellow-600">Pista: {tasks[currentTask].hint}</p>}
        <Image
            src="/images/esim.png"
            alt="esim"
            width={200}
            height={200}
            className={"w-full rounded-lg shadow-md my-5"}
        />
        <Input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Tu respuesta"
          className="mb-4 text-black"
        />
        <div className="flex gap-4">
          <Button type="submit">Enviar</Button>
          <Button type="button" onClick={() => setShowHint(true)} variant="secondary">
            Mostrar Pista
          </Button>
        </div>
      </form>
      {currentTask === tasks.length - 1 && (
        <div className="mt-4 p-4 bg-yellow-100 rounded-lg">
          <p className="text-yellow-800 font-bold">Felicidades por: M - 4</p>
        </div>
      )}
    </div>
  )
}

