import React, { useState, useEffect } from 'react'
import ResponsiveNavbar from '../components/ResponsiveNavbar'
import { useExam } from '../hooks/useExam'
import MessageModal from '../components/MessageModal'
import ExamCard from '../components/ExamCard'
import ExamDetails from '../components/ExamDetails'

import {
  PageWrapper,
  PageTitle,
  RegularAddButton,
  InputGroup,
  Label,
  Input,
  Textarea,
  SubmitButton,
  CancelButton,
  ExamsGrid,
  PageHeader,
  ExamCardSkeleton
} from '../styles/Styles'

import * as examService from '../services/examService'

type ActiveSection = 'list' | 'create' | 'view' | null

const Exams: React.FC = () => {
  const { exams, fetchExams, createExam, loading: contextLoading } = useExam()
  const [activeSection, setActiveSection] = useState<ActiveSection>('list')
  const [loading, setLoading] = useState(false)
  const [modalMessage, setModalMessage] = useState<{
    title?: string
    message: string
    disableClose?: boolean
  } | null>(null)

  const [selectedExam, setSelectedExam] = useState<examService.Exam | null>(
    null
  )

  const [examData, setExamData] = useState({
    name: '',
    description: '',
    date: '',
    result: '',
    files: [] as File[]
  })

  useEffect(() => {
    fetchAllExams()
  }, [])

  const fetchAllExams = async () => {
    setLoading(true)
    try {
      await fetchExams()
    } catch (err: any) {
      setModalMessage({
        title: 'Erro',
        message: err.message || 'Erro ao buscar exames.'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateExamSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createExam(examData)

      setModalMessage({
        title: 'Sucesso',
        message: 'Exame criado com sucesso!'
      })

      setExamData({
        name: '',
        description: '',
        date: '',
        result: '',
        files: []
      })

      setActiveSection('list')
    } catch (err: any) {
      setModalMessage({
        title: 'Erro',
        message: err.message || 'Erro ao criar exame.'
      })
    } finally {
      setLoading(false)
    }
  }

  const renderSection = () => {
    if ((loading || contextLoading) && activeSection === 'list') {
      return (
        <>
          <PageHeader>
            <PageTitle>Meus Exames</PageTitle>
          </PageHeader>

          <ExamsGrid>
            {Array.from({ length: 6 }).map((_, i) => (
              <ExamCardSkeleton key={i} />
            ))}
          </ExamsGrid>
        </>
      )
    }

    if (activeSection === 'create') {
      return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <PageTitle>Adicionar Novo Exame</PageTitle>
          <form onSubmit={handleCreateExamSubmit}>
            <InputGroup>
              <Label>Nome do Exame:</Label>
              <Input
                type="text"
                value={examData.name}
                onChange={e =>
                  setExamData({ ...examData, name: e.target.value })
                }
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Descrição:</Label>
              <Textarea
                value={examData.description}
                onChange={e =>
                  setExamData({ ...examData, description: e.target.value })
                }
              />
            </InputGroup>

            <InputGroup>
              <Label>Data do Exame:</Label>
              <Input
                type="date"
                value={examData.date}
                onChange={e =>
                  setExamData({ ...examData, date: e.target.value })
                }
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Resultado:</Label>
              <Textarea
                value={examData.result}
                onChange={e =>
                  setExamData({ ...examData, result: e.target.value })
                }
              />
            </InputGroup>

            <InputGroup>
              <Label>Fotos do Exame:</Label>
              <Input
                type="file"
                multiple
                onChange={e =>
                  setExamData({
                    ...examData,
                    files: e.target.files ? Array.from(e.target.files) : []
                  })
                }
              />
            </InputGroup>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <SubmitButton type="submit">Salvar</SubmitButton>
              <CancelButton
                type="button"
                onClick={() => setActiveSection('list')}
              >
                Voltar
              </CancelButton>
            </div>
          </form>
        </div>
      )
    }

    if (activeSection === 'view' && selectedExam) {
      return (
        <ExamDetails
          exam={selectedExam}
          onClose={() => {
            setActiveSection('list')
            setSelectedExam(null)
          }}
        />
      )
    }

    return (
      <>
        <PageHeader>
          <PageTitle>Meus Exames</PageTitle>
          <RegularAddButton onClick={() => setActiveSection('create')}>
            Adicionar Exame
          </RegularAddButton>
        </PageHeader>

        {exams.length === 0 ? (
          <p>Nenhum exame cadastrado.</p>
        ) : (
          <ExamsGrid>
            {exams.map(exam => (
              <ExamCard
                key={exam.id}
                exam={exam}
                onView={exam => {
                  setSelectedExam(exam)
                  setActiveSection('view')
                }}
              />
            ))}
          </ExamsGrid>
        )}
      </>
    )
  }

  return (
    <>
      <ResponsiveNavbar />
      <PageWrapper>{renderSection()}</PageWrapper>

      {modalMessage && (
        <MessageModal
          isOpen={!!modalMessage}
          title={modalMessage.title}
          message={modalMessage.message}
          onClose={() => setModalMessage(null)}
        />
      )}
    </>
  )
}

export default Exams
