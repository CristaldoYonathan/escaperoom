import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function NameInput({ onSubmit }: { onSubmit: (name: string) => void }) {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onSubmit(name.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white/70 backdrop-blur-lg border border-white/40 rounded-2xl shadow-2xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">Ingresa tu nombre para comenzar</h2>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tu nombre"
        className="mb-4 text-black"
      />
        <div className="flex justify-center">
      <Button type="submit">Comenzar Aventura</Button>
        </div>
    </form>
  )
}

