import React, { createContext, useState, useEffect } from 'react'
import * as examService from '../services/examService'

interface ExamContextType {
  exams: examService.Exam[]
  loading: boolean
  message: string | null
  messageType: 'success' | 'error' | null

  fetchExams: () => Promise<void>
  createExam: (data: examService.CreateExamData) => Promise<void>
  updateExam: (id: string, data: examService.UpdateExamData) => Promise<void>
  deleteExam: (id: string) => Promise<void>
  getExamPhoto: (photoId: string) => Promise<Blob>
  downloadExamPhoto: (photoId: string, fileName: string) => Promise<void>
  closeMessage: () => void
}

export const ExamContext = createContext<ExamContextType>({} as ExamContextType)

export const ExamProvider = ({ children }: { children: React.ReactNode }) => {
  const [exams, setExams] = useState<examService.Exam[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(
    null
  )

  const fetchExams = async () => {
    try {
      setLoading(true)
      const data = await examService.getExams()
      setExams(data)
    } catch (error: any) {
      setMessage(error?.response?.data?.error || 'Erro ao obter exames')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  const createExam = async (data: examService.CreateExamData) => {
    try {
      setLoading(true)
      const res = await examService.createExam(data)
      setMessage(res.message)
      setMessageType('success')
      await fetchExams()
    } catch (error: any) {
      setMessage(error?.response?.data?.erro || 'Erro ao criar exame')
      setMessageType('error')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateExam = async (id: string, data: examService.UpdateExamData) => {
    try {
      setLoading(true)
      const res = await examService.updateExam(id, data)
      setMessage(res.message)
      setMessageType('success')
      await fetchExams()
    } catch (error: any) {
      setMessage(error?.response?.data?.erro || 'Erro ao atualizar exame')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  const deleteExam = async (id: string) => {
    try {
      setLoading(true)
      const res = await examService.deleteExam(id)
      setMessage(res.mensagem || res.message)
      setMessageType('success')
      await fetchExams()
    } catch (error: any) {
      setMessage(error?.response?.data?.erro || 'Erro ao excluir exame')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  const getExamPhoto = async (photoId: string): Promise<Blob> => {
    try {
      const data = await examService.getExamPhotoById(photoId)
      return data
    } catch (err: any) {
      setMessage(err?.response?.data?.erro || 'Erro ao buscar foto')
      setMessageType('error')
      throw err
    }
  }

  const downloadExamPhoto = async (photoId: string, fileName: string) => {
    try {
      const blob = await examService.downloadExamPhoto(photoId)

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (err: any) {
      setMessage(err?.response?.data?.erro || 'Erro ao baixar arquivo')
      setMessageType('error')
      throw err
    }
  }

  const closeMessage = () => {
    setMessage(null)
    setMessageType(null)
  }

  useEffect(() => {
    fetchExams()
  }, [])

  return (
    <ExamContext.Provider
      value={{
        exams,
        loading,
        message,
        messageType,
        fetchExams,
        createExam,
        updateExam,
        deleteExam,
        getExamPhoto,
        downloadExamPhoto,
        closeMessage
      }}
    >
      {children}
    </ExamContext.Provider>
  )
}
