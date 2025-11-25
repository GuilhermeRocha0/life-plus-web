import React, { useState, useEffect } from 'react'
import ResponsiveNavbar from '../components/ResponsiveNavbar'
import { useExam } from '../hooks/useExam'
import MessageModal from '../components/MessageModal'
import ExamCard from '../components/ExamCard'
import ExamDetails from '../components/ExamDetails'
import LoadingModal from '../components/LoadingModal'

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
  ExamCardSkeleton,
  ExamInfoText
} from '../styles/Styles'

import * as examService from '../services/examService'

type ActiveSection = 'list' | 'create' | 'view' | null

const Exams: React.FC = () => {
  const { exams, fetchExams, createExam, loading: contextLoading } = useExam()

  const [activeSection, setActiveSection] = useState<ActiveSection>('list')
  const [loadingCreate, setLoadingCreate] = useState(false)
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
    fetchExams()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []

    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/pdf'
    ]

    const invalidFiles = files.filter(file => !allowedTypes.includes(file.type))

    if (invalidFiles.length > 0) {
      setModalMessage({
        title: 'Arquivo inválido',
        message:
          'Formato não permitido. Envie apenas arquivos JPG, JPEG, PNG ou PDF.'
      })
      return
    }

    setExamData(prev => ({
      ...prev,
      files
    }))
  }

  const handleCreateExamSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingCreate(true)

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
      setLoadingCreate(false)
    }
  }

  const renderSection = () => {
    const isLoadingList = contextLoading && activeSection === 'list'

    if (isLoadingList) {
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
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
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
            setSelectedExam(null)
            setActiveSection('list')
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
          <ExamInfoText>Nenhum exame cadastrado.</ExamInfoText>
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

      <LoadingModal isOpen={loadingCreate} />
    </>
  )
}

export default Exams
