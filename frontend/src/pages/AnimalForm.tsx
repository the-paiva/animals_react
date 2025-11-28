import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import api from '../api/api'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import type { Animal, Tutor } from '../types'

const AnimalForm: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const defaultTutorId = searchParams.get('tutorId')
  const { register, handleSubmit, reset } = useForm<Animal>()
  const [tutors, setTutors] = React.useState<Tutor[]>([])

  useEffect(() => {
    const load = async () => {
      const res = await api.get('/tutores')
      setTutors(res.data)
      if (id && id !== 'novo') {
        const r = await api.get(`/animais/${id}`)
        reset(r.data)
      } else if (defaultTutorId) {
        reset({ tutorId: Number(defaultTutorId), name: '', species: '', breed: '', age: undefined })
      }
    }
    load()
  }, [id])

  const onSubmit = async (data: Animal) => {
    if (id && id !== 'novo') {
      await api.put(`/animais/${id}`, data)
    } else {
      await api.post('/animais', data)
    }
    navigate('/animais')
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">{id && id !== 'novo' ? 'Editar Animal' : 'Novo Animal'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <input {...register('name', { required: true })} placeholder="Nome" className="border p-2 rounded" />
        <input {...register('species', { required: true })} placeholder="Espécie" className="border p-2 rounded" />
        <input {...register('breed')} placeholder="Raça" className="border p-2 rounded" />
        <input {...register('age')} placeholder="Idade" type="number" className="border p-2 rounded" />
        <select {...register('tutorId', { valueAsNumber: true, required: true })} className="border p-2 rounded">
          <option value="">Selecione tutor</option>
          {tutors.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>

        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Salvar</button>
          <button type="button" onClick={() => navigate('/animais')} className="px-4 py-2 border rounded">Cancelar</button>
        </div>
      </form>
    </div>
  )
}

export default AnimalForm