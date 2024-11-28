import React, {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {useToast} from "@/hooks/use-toast"
import {playSound} from '@/utils/sound';

const tasks = [
    {
        question: "¿Cuál es el método más utilizado para recaudar fondos dentro de la comunidad de la ESIM durante 2024?",
        hint: "Método de recaudación dónde el ganador sale sorteado.",
        answer: "Rifas"
    },
    {
        question: "¿Qué recurso tecnológico se gestiona de manera compartida en la ESIM para garantizar que todos los estudiantes puedan usarlo?",
        hint: "Es un dispositivo tecnológico usado para estudiar y hacer proyectos.",
        answer: "Notebook"
    },
    {
        question: "En la ESIM, los recursos tecnológicos son exclusivos y no se permiten préstamos entre los estudiantes. ¿Esto es verdadero o falso?",
        answer: "Falso"
    },
    {
        question: "La cooperadora de la ESIM organiza eventos y recolecta materiales para apoyar las actividades escolares. ¿Esto es verdadero o falso?",
        answer: "Verdadero"
    },
    {
        question: "¿Cuál es la gestión de la ESIM que permite que todos los estudiantes puedan acceder a su educación sin pagar matrícula?",
        hint: "Es un tipo de gestión educativa que garantiza el acceso gratuito.",
        answer: "Pública"
    }
]

export default function AdministrativeDimension({onComplete}: { onComplete: (code: string) => void }) {
    const [currentTask, setCurrentTask] = useState(0)
    const [answer, setAnswer] = useState('')
    const [showHint, setShowHint] = useState(false)
    const {toast} = useToast()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (answer.toLowerCase() === tasks[currentTask].answer.toLowerCase()) {
            playSound('correct')
            if (currentTask < tasks.length - 1) {
                setCurrentTask(currentTask + 1)
                setAnswer('')
                setShowHint(false)
            } else {
                onComplete('I - 3')
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
            <h2 className="text-3xl font-bold mb-6 text-green-800">Dimensión Administrativa - Económica</h2>
            <form onSubmit={handleSubmit}>
                <p className="mb-4 text-black">{tasks[currentTask].question}</p>
                {showHint &&
                    tasks[currentTask].hint && <p className="mb-4 text-yellow-600">Pista: {tasks[currentTask].hint}</p>}
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
                    <p className="text-yellow-800 font-bold">Código obtenido: I - 3</p>
                </div>
            )}
        </div>
    )
}

