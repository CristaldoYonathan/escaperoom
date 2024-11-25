import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from "@/hooks/use-toast"
import { playSound } from '@/utils/sound'; // Updated import statement

const tasks = [
  {
    question: "¿Qué tipo de enseñanza utiliza la ESIM para combinar diferentes materias en un solo proyecto educativo?",
    hint: "Se enseña más de una materia al mismo tiempo.",
    answer: "interdisciplinaria"
  },
  {
    question: "¿Cómo adaptan los docentes el conocimiento para hacerlo comprensible para los estudiantes?",
    hint: "Transforman conceptos complejos (conocimiento científico) para que sean fáciles de entender.",
    answer: "transposición"
  },
  {
    question: "¿Qué estrategia sigue la ESIM al planificar los contenidos y temas para el año escolar?",
    hint: "Es una guía detallada que los docentes crean.",
    answer: "Planificación"
  },
  {
    question: "En la ESIM, cada docente planifica sus clases de forma aislada, sin colaborar con otros docentes de distintas áreas. ¿Esto es verdadero o falso?",
    answer: "Falso"
  },
  {
    question: "En la ESIM, los estudiantes participan activamente en proyectos que integran varias materias, aplicando sus conocimientos al resolver problemas reales. ¿Esto es verdadero o falso?",
    answer: "Verdadero"
  }
]

export default function PedagogicalDimension({ onComplete }: { onComplete: (code: string) => void }) {
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
        onComplete('E - 1')
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
      <h2 className="text-3xl font-bold mb-6 text-green-800">Dimensión Pedagógica - Didáctica</h2>
      <form onSubmit={handleSubmit}>
        <p className="mb-4 text-black">{tasks[currentTask].question}</p>
        {showHint && tasks[currentTask].hint && <p className="mb-4 text-yellow-600">Pista: {tasks[currentTask].hint}</p>}
        <Input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Tu respuesta"
          className="mb-4 text-black"
        />
        <div className="flex gap-4">
          <Button type="submit">Enviar</Button>
          {tasks[currentTask].hint && (
            <Button type="button" onClick={() => setShowHint(true)} variant="secondary">
              Mostrar Pista
            </Button>
          )}
        </div>
      </form>
      {currentTask === tasks.length - 1 && (
        <div className="mt-4 p-4 bg-yellow-100 rounded-lg">
          <p className="text-yellow-800 font-bold">Código obtenido: E - 1</p>
        </div>
      )}
    </div>
  )
}

