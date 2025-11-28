import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/api'
import type { Tutor, Animal } from '../types'

const TutorDetail: React.FC = () => {
  const { id } = useParams()
  const [tutor, setTutor] = useState<Tutor | null>(null)
  const [animals, setAnimals] = useState<Animal[]>([])

  useEffect(() => {
    const load = async () => {
      if (!id) return
      const resTutor = await api.get(`/tutores/${id}`)
      setTutor(resTutor.data)
      const resAnimals = await api.get(`/animais?tutorId=${id}`)
      setAnimals(resAnimals.data)
    }
    load()
  }, [id])

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Tutor: {tutor?.name}</h2>
      <p>Email: {tutor?.email}</p>
      <p>Telefone: {tutor?.phone}</p>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Animais</h3>
          <Link to={`/animal/novo?tutorId=${id}`} className="px-2 py-1 border rounded">Adicionar Animal</Link>
        </div>
        <ul className="space-y-2">
          {animals.map(a => (
            <li key={a.id} className="p-2 border rounded flex justify-between items-center">
              <div>
                <div className="font-semibold">{a.name}</div>
                <div className="text-sm">{a.species} — {a.breed} — {a.age} anos</div>
              </div>
              <div>
                <Link to={`/animal/${a.id}`} className="mr-2 text-blue-600">Ver</Link>
                <Link to={`/animal/${a.id}/editar`} className="text-green-600">Editar</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TutorDetail