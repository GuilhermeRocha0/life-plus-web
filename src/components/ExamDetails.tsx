import React, { useState, useEffect } from 'react'
import {
  PageTitle,
  InputGroup,
  Label,
  CancelButton,
  StyledExamFile,
  FileName,
  DownloadButton,
  ImageFile,
  TopActions,
  ExamDetailImageSkeleton,
  ExamFilesContainer,
  ExamDetailsInfo,
  ExamInfoGroup,
  ExamInfoGroupLabel
} from '../styles/Styles'

import { FiDownload } from 'react-icons/fi'
import * as examService from '../services/examService'

interface ExamViewProps {
  exam: examService.Exam
  onClose: () => void
}

const ExamDetails: React.FC<ExamViewProps> = ({ exam, onClose }) => {
  const [photoBlobs, setPhotoBlobs] = useState<Record<string, string>>({})
  const [loadingPhotos, setLoadingPhotos] = useState<Record<string, boolean>>(
    {}
  )

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
      const newLoadingState: Record<string, boolean> = {}
      const newBlobs: Record<string, string> = {}

      exam.photos.forEach(p => {
        newLoadingState[p.id] = true
      })
      setLoadingPhotos(newLoadingState)

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

  return (
    <div>
      <TopActions>
        <CancelButton type="button" onClick={onClose}>
          Voltar
        </CancelButton>
      </TopActions>

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

                {!isLoading && !isImage && !isPDF && (
                  <FileName>{photo.fileName}</FileName>
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

      <div style={{ marginTop: '20px' }}>
        <CancelButton type="button" onClick={onClose}>
          Voltar
        </CancelButton>
      </div>
    </div>
  )
}

export default ExamDetails
