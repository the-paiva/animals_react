import React, { useEffect, useState } from 'react'
import api from '../api/api'
import type { Animal } from '../types'
import { Link } from 'react-router-dom'

const AnimalsList: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([])

  const fetchAnimals = async () => {
    const res = await api.get('/animais?_expand=tutor')
    setAnimals(res.data)
  }

  useEffect(() => {
    fetchAnimals()
  }, [])

  const deleteAnimal = async (id?: number) => {
    if (!id) return
    if (!confirm('Excluir animal?')) return
    await api.delete(`/animais/${id}`)
    fetchAnimals()
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Animais</h2>
        <Link to="/animal/novo" className="px-3 py-1 border rounded">Novo Animal</Link>
      </div>

      <ul className="space-y-2">
        {animals.map(a => (
          <li key={a.id} className="p-3 border rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{a.name} <span className="text-sm text-gray-500">({a.species})</span></div>
              <div className="text-sm">{a.breed} — Tutor ID: {a.tutorId}</div>
            </div>
            <div>
              <Link to={`/animal/${a.id}`} className="mr-2 text-blue-600">Ver</Link>
              <button onClick={() => deleteAnimal(a.id)} className="text-red-600">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AnimalsList