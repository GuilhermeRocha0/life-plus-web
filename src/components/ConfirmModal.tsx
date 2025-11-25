import React from 'react'
import {
  Overlay,
  ModalContainer,
  SectionTitle,
  SectionText,
  ActionButton,
  CancelButton
} from '../styles/Styles'

interface ConfirmModalProps {
  isOpen: boolean
  title?: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null

  return (
    <Overlay>
      <ModalContainer>
        {title && <SectionTitle>{title}</SectionTitle>}
        <SectionText>{message}</SectionText>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '2rem'
          }}
        >
          <ActionButton
            style={{ backgroundColor: '#f44336' }}
            onClick={onConfirm}
          >
            Confirmar
          </ActionButton>
          <CancelButton onClick={onCancel}>Cancelar</CancelButton>
        </div>
      </ModalContainer>
    </Overlay>
  )
}

export default ConfirmModal
