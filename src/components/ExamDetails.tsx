import React, { useState, useEffect, useRef } from 'react'
import {
  PageTitle,
  CancelButton,
  StyledExamFile,
  FileName,
  DownloadButton,
  ImageFile,
  TopActions,
  BottomActions,
  ExamDetailImageSkeleton,
  ExamFilesContainer,
  ExamDetailsInfo,
  ExamInfoGroup,
  ExamInfoGroupLabel,
  ActionButton,
  OptionsButton,
  InputGroup,
  Label,
  Input,
  Textarea,
  SubmitButton,
  OptionsDropdownContainer,
  OptionsDropdown,
  OptionsDropdownItem
} from '../styles/Styles'

import { FiDownload, FiSettings, FiTrash2 } from 'react-icons/fi'
import * as examService from '../services/examService'
import { useExam } from '../hooks/useExam'
import ConfirmModal from './ConfirmModal'
import LoadingModal from './LoadingModal'
import MessageModal from './MessageModal'

interface ExamViewProps {
  exam: examService.Exam
  onClose: () => void
}

const ExamDetails: React.FC<ExamViewProps> = ({ exam, onClose }) => {
  const [photoBlobs, setPhotoBlobs] = useState<Record<string, string>>({})
  const [loadingPhotos, setLoadingPhotos] = useState<Record<string, boolean>>(
    {}
  )
  const [confirmDelete, setConfirmDelete] = useState(false)

  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const [messageModal, setMessageModal] = useState<{
    title: string
    message: string
    disableClose: boolean
  } | null>(null)

  const { deleteExam, updateExam } = useExam()

  const [editing, setEditing] = useState(false)

  const [formData, setFormData] = useState({
    name: exam.name,
    description: exam.description || '',
    date: exam.date.slice(0, 10),
    result: exam.result || '',
    files: [] as File[],
    removePhotos: [] as string[]
  })

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const fetchPhotoBlob = async (photoId: string) => {
    try {
      const blob = await examService.getExamPhotoById(photoId)
      return URL.createObjectURL(blob)
    } catch (err) {
      console.error('Erro ao carregar foto', err)
      return null
    }
  }

  useEffect(() => {
    let isMounted = true

    const loadPhotos = async () => {
      const newLoad: Record<string, boolean> = {}
      const newBlobs: Record<string, string> = {}

      exam.photos.forEach(p => (newLoad[p.id] = true))
      setLoadingPhotos(newLoad)

      for (const photo of exam.photos) {
        const url = await fetchPhotoBlob(photo.id)

        if (isMounted) {
          if (url) newBlobs[photo.id] = url

          setLoadingPhotos(prev => ({
            ...prev,
            [photo.id]: false
          }))
        }
      }

      if (isMounted) setPhotoBlobs(newBlobs)
    }

    loadPhotos()

    return () => {
      isMounted = false
      Object.values(photoBlobs).forEach(url => URL.revokeObjectURL(url))
    }
  }, [exam.photos])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleConfirmDelete = async () => {
    setConfirmDelete(false)
    setIsLoadingDelete(true)

    try {
      await deleteExam(exam.id)

      setIsLoadingDelete(false)

      setMessageModal({
        title: 'Sucesso',
        message: 'Exame excluído com sucesso!',
        disableClose: true
      })

      setTimeout(() => {
        setMessageModal(null)
        onClose()
      }, 1200)
    } catch (err: any) {
      console.error(err)

      setIsLoadingDelete(false)

      setMessageModal({
        title: 'Erro',
        message: err.message || 'Erro ao excluir exame.',
        disableClose: false
      })
    }
  }

  const handleDownload = async (photoId: string, fileName: string) => {
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
    } catch (err) {
      console.error('Erro ao baixar arquivo', err)
    }
  }

  const removePhoto = (id: string) => {
    setFormData(prev => ({
      ...prev,
      removePhotos: [...prev.removePhotos, id]
    }))
  }

  const handleSubmitUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoadingDelete(true)

    try {
      await updateExam(exam.id, formData)

      setIsLoadingDelete(false)

      setMessageModal({
        title: 'Sucesso',
        message: 'Exame atualizado!',
        disableClose: true
      })

      setTimeout(() => {
        window.location.reload()
      }, 1200)
    } catch (err: any) {
      setIsLoadingDelete(false)

      setMessageModal({
        title: 'Erro',
        message: err.message || 'Erro ao atualizar exame.',
        disableClose: false
      })
    }
  }

  return (
    <div>
      <TopActions>
        <CancelButton type="button" onClick={onClose}>
          Voltar
        </CancelButton>

        <OptionsDropdownContainer>
          <OptionsButton type="button" onClick={() => setDropdownOpen(p => !p)}>
            <FiSettings size={18} /> Opções
          </OptionsButton>

          {dropdownOpen && (
            <OptionsDropdown>
              <OptionsDropdownItem
                onClick={() => {
                  setEditing(true)
                  setDropdownOpen(false)
                }}
              >
                Alterar Exame
              </OptionsDropdownItem>

              <OptionsDropdownItem
                className="danger"
                onClick={() => {
                  setDropdownOpen(false)
                  setConfirmDelete(true)
                }}
              >
                Excluir Exame
              </OptionsDropdownItem>
            </OptionsDropdown>
          )}
        </OptionsDropdownContainer>
      </TopActions>

      {!editing && (
        <>
          <PageTitle>{exam.name}</PageTitle>

          <ExamDetailsInfo>
            {exam.description && (
              <ExamInfoGroup>
                <ExamInfoGroupLabel>Descrição:</ExamInfoGroupLabel>
                <p>{exam.description}</p>
              </ExamInfoGroup>
            )}

            <ExamInfoGroup>
              <ExamInfoGroupLabel>Data:</ExamInfoGroupLabel>
              <p>{new Date(exam.date).toLocaleDateString()}</p>
            </ExamInfoGroup>

            {exam.result && (
              <ExamInfoGroup>
                <ExamInfoGroupLabel>Resultado:</ExamInfoGroupLabel>
                <p>{exam.result}</p>
              </ExamInfoGroup>
            )}
          </ExamDetailsInfo>

          <ExamFilesContainer>
            {exam.photos.map(photo => {
              const photoUrl = photoBlobs[photo.id]
              const isLoading = loadingPhotos[photo.id]
              const isImage = photo.mimeType.startsWith('image/')
              const isPDF = photo.mimeType === 'application/pdf'
              const clickable = (isImage || isPDF) && !!photoUrl

              return (
                <StyledExamFile
                  key={photo.id}
                  clickable={clickable}
                  onClick={() => clickable && window.open(photoUrl!, '_blank')}
                >
                  <div>
                    {isLoading && <ExamDetailImageSkeleton />}

                    {!isLoading && isImage && photoUrl && (
                      <>
                        <ImageFile src={photoUrl} alt={photo.fileName} />
                        <FileName>{photo.fileName}</FileName>
                      </>
                    )}

                    {!isLoading && isPDF && (
                      <>
                        <span
                          style={{
                            fontSize: '1.2rem',
                            color: '#888',
                            marginTop: '0.4rem',
                            textAlign: 'center'
                          }}
                        >
                          Preview não disponível <br />
                          Aperte para visualizar
                        </span>
                        <FileName>{photo.fileName}</FileName>
                      </>
                    )}
                  </div>

                  <DownloadButton
                    type="button"
                    onClick={e => {
                      e.stopPropagation()
                      handleDownload(photo.id, photo.fileName)
                    }}
                  >
                    <FiDownload size={18} />
                    Baixar
                  </DownloadButton>
                </StyledExamFile>
              )
            })}
          </ExamFilesContainer>
        </>
      )}

      {editing && (
        <form
          onSubmit={handleSubmitUpdate}
          style={{ maxWidth: '650px', margin: '0 auto' }}
        >
          <PageTitle>Alterar Exame</PageTitle>

          <InputGroup>
            <Label>Nome:</Label>
            <Input
              type="text"
              value={formData.name}
              onChange={e =>
                setFormData(prev => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Descrição:</Label>
            <Textarea
              value={formData.description}
              onChange={e =>
                setFormData(prev => ({ ...prev, description: e.target.value }))
              }
            />
          </InputGroup>

          <InputGroup>
            <Label>Data:</Label>
            <Input
              type="date"
              value={formData.date}
              onChange={e =>
                setFormData(prev => ({ ...prev, date: e.target.value }))
              }
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Resultado:</Label>
            <Textarea
              value={formData.result}
              onChange={e =>
                setFormData(prev => ({ ...prev, result: e.target.value }))
              }
            />
          </InputGroup>

          <Label>Fotos atuais:</Label>
          <ExamFilesContainer>
            {exam.photos.map(photo => {
              if (formData.removePhotos.includes(photo.id)) return null

              const photoUrl = photoBlobs[photo.id]
              const isLoading = loadingPhotos[photo.id]

              return (
                <StyledExamFile key={photo.id}>
                  {isLoading && <ExamDetailImageSkeleton />}

                  {!isLoading && photoUrl && (
                    <>
                      <ImageFile src={photoUrl} alt={photo.fileName} />
                      <FileName>{photo.fileName}</FileName>
                    </>
                  )}

                  <ActionButton
                    type="button"
                    style={{ backgroundColor: '#e53935', marginTop: '10px' }}
                    onClick={() => removePhoto(photo.id)}
                  >
                    <FiTrash2 size={16} /> Remover
                  </ActionButton>
                </StyledExamFile>
              )
            })}
          </ExamFilesContainer>

          <InputGroup>
            <Label>Adicionar novas fotos:</Label>
            <Input
              type="file"
              multiple
              onChange={e =>
                setFormData(prev => ({
                  ...prev,
                  files: e.target.files ? Array.from(e.target.files) : []
                }))
              }
            />
          </InputGroup>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <SubmitButton type="submit">Salvar Alterações</SubmitButton>

            <CancelButton type="button" onClick={() => setEditing(false)}>
              Cancelar
            </CancelButton>
          </div>
        </form>
      )}

      {!editing && (
        <BottomActions>
          <CancelButton type="button" onClick={onClose}>
            Voltar
          </CancelButton>
        </BottomActions>
      )}

      <ConfirmModal
        isOpen={confirmDelete}
        title="Excluir Exame"
        message="Tem certeza que deseja excluir este exame?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDelete(false)}
      />

      <LoadingModal isOpen={isLoadingDelete} />

      {messageModal && (
        <MessageModal
          isOpen={true}
          title={messageModal.title}
          message={messageModal.message}
          disableClose={messageModal.disableClose}
          onClose={() => setMessageModal(null)}
        />
      )}
    </div>
  )
}

export default ExamDetails
