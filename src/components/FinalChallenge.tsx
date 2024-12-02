import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from "@/hooks/use-toast"
import { playSound } from '@/utils/sound'
import Image from "next/image"

export default function FinalChallenge() {
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
        <div className="flex  justify-center p-2 md:p-4">
            <div className="w-full max-w-3xl bg-white/70 backdrop-blur-lg border border-white/40 rounded-2xl shadow-2xl p-4">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-green-800">
                    Desafío Final
                </h2>

                {!isComplete ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <div className="order-2 md:order-1 space-y-3">
                            <p className="text-base md:text-xl text-center text-black">
                                Al final de la montaña te encuentras con los rescatistas y una cacatúa parlante.
                            </p>

                            <p className="text-sm md:text-base text-center italic text-gray-600">
                                &#34;¡Hola, viajero! Has llegado muy lejos. Para validar tu identidad, debes darnos el código que solo un verdadero conocedor de las dimensiones educativas sabe. Ordena las letras con los 4 dígitos que has descubierto y logra ser rescatado.&#34;
                            </p>

                            <Input
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Código final"
                                className="text-black text-sm py-1 px-2"
                            />

                            <div className="flex justify-center">
                                <Button
                                    size="sm"
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    Enviar Código
                                </Button>
                            </div>
                        </div>

                        <div className="order-1 md:order-2 flex justify-center items-center">
                            <Image
                                src="/loro.webp"
                                alt="Loro parlante"
                                width={150}
                                height={150}
                                className="object-cover transform hover:scale-105 transition-transform duration-300 hover:rotate-3"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4 text-center">
                        <p className="text-base md:text-xl font-bold text-black">
                            ¡Felicidades! Has completado el Escape Room.
                        </p>
                        <Button
                            size="sm"
                            onClick={() => window.location.reload()}
                        >
                            Jugar de Nuevo
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}