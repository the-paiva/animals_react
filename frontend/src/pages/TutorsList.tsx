import React, { useEffect, useState } from 'react'
import api from '../api/api'
import type { Tutor } from '../types'
import { Link } from 'react-router-dom'

const TutorsList: React.FC = () => {
  const [tutors, setTutors] = useState<Tutor[]>([])

  const fetchTutors = async () => {
    const res = await api.get('/tutores')
    setTutors(res.data)
  }

  useEffect(() => {
    fetchTutors()
  }, [])

  const deleteTutor = async (id?: number) => {
    if (!id) return
    if (!confirm('Deseja excluir este tutor?')) return
    await api.delete(`/tutores/${id}`)
    fetchTutors()
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Tutores</h2>
        <Link to="/tutor/novo" className="px-3 py-1 border rounded">Novo Tutor</Link>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="p-2 text-left">Nome</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Telefone</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {tutors.map(t => (
            <tr key={t.id} className="border-t">
              <td className="p-2">{t.name}</td>
              <td className="p-2">{t.email}</td>
              <td className="p-2">{t.phone}</td>
              <td className="p-2">
                <Link to={`/tutor/${t.id}`} className="mr-2 text-blue-600">Ver</Link>
                <Link to={`/tutor/${t.id}/editar`} className="mr-2 text-green-600">Editar</Link>
                <button onClick={() => deleteTutor(t.id)} className="text-red-600">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TutorsList