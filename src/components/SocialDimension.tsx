import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from "@/hooks/use-toast"
import { playSound } from '@/utils/sound'; // Updated import statement

const tasks = [
  {
    question: "¿Qué palabra define la relación donde muchos se unen por un bien común, comparten alimentos y risas, se ayudan unos a otros para no caer?",
    hint: "Acción conjunta, coordinada y cooperativa para lograr una meta en común.",
    answer: "Colaboración"
  },
  {
    question: "¿Quiénes son estos importantes enlaces que coordinan y guían, conectando familias y estudiantes en la escuela?",
    hint: "Son personas que conectan familias y estudiantes, también son llamados preceptores.",
    answer: "Coordinadores"
  },
  {
    question: "¿Qué actividad permite a la comunidad compartir y contribuir con los más necesitados en tu escuela?",
    hint: "Evento solidario donde se corre una…",
    answer: "Maratón"
  },
  {
    question: "¿Qué proceso es este donde se escuchan muchas voces para decidir, tanto estudiantes como familias participan?",
    hint: "Una manera de involucrarse y dar tu opinión.",
    answer: "Participación"
  },
  {
    question: "¿Cómo se llaman estos tipos de proyectos que fluyen como un vínculo entre la institución y el entorno, haciendo proyectos juntos para crecer?",
    hint: "Estos proyectos son de …",
    answer: "Extensión"
  }
]

export default function SocialDimension({ onComplete }: { onComplete: (code: string) => void }) {
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
        onComplete('S - 2')
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
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Dimensión Socio - Comunitaria</h2>
      <p className="mb-4">
        Luego de pasar por algunos obstáculos y desafíos en la densa selva amazónica, finalmente llegas a un claro donde el sol ilumina una antigua escalera de piedra que parece llevar a la cima de la montaña. Antes de poder subir, un guacamayo de plumas coloridas aterriza frente a ti. Sus ojos brillan con inteligencia, y se dirige a ti en un tono amistoso:
      </p>
      <p className="mb-4 italic">
        "¡Hola, viajero perdido! Soy el guardián de esta escalera. Para alcanzar la cima, debes responder a mis cinco acertijos. Cada uno de ellos te hará pensar en las conexiones y relaciones que existen en la comunidad escolar, al igual que en la selva. Solo si logras resolverlos, te permitiré seguir tu camino. ¡Prepárate!"
      </p>
      <form onSubmit={handleSubmit}>
        <p className="mb-4">{tasks[currentTask].question}</p>
        {showHint && <p className="mb-4 text-yellow-300">Pista: {tasks[currentTask].hint}</p>}
        <Input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Tu respuesta"
          className="mb-4"
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
          <p className="text-yellow-800 font-bold">Código obtenido: S - 2</p>
        </div>
      )}
    </div>
  )
}

