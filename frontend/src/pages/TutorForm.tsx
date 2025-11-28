import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import api from '../api/api'
import { useNavigate, useParams } from 'react-router-dom'
import type { Tutor } from '../types'

const TutorForm: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm<Tutor>()

  useEffect(() => {
    const load = async () => {
      if (id && id !== 'novo') {
        const res = await api.get(`/tutores/${id}`)
        reset(res.data)
      }
    }
    load()
  }, [id])

  const onSubmit = async (data: Tutor) => {
    if (id && id !== 'novo') {
      await api.put(`/tutores/${id}`, data)
    } else {
      await api.post('/tutores', data)
    }
    navigate('/tutores')
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">{id && id !== 'novo' ? 'Editar Tutor' : 'Novo Tutor'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <input {...register('name', { required: true })} placeholder="Nome" className="border p-2 rounded" />
        <input {...register('email', { required: true })} placeholder="Email" className="border p-2 rounded" />
        <input {...register('phone')} placeholder="Telefone" className="border p-2 rounded" />
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Salvar</button>
          <button type="button" onClick={() => navigate('/tutores')} className="px-4 py-2 border rounded">Cancelar</button>
        </div>
      </form>
    </div>
  )
}

export default TutorForm