import React from 'react'
import { CheckCircle, XCircle } from 'lucide-react'

import {
  Overlay,
  ModalContainer,
  IconWrapper,
  TitleStyled,
  Message,
  CloseButton
} from '../styles/Styles'

interface ModalMessageProps {
  isOpen: boolean
  title?: string
  message: string
  onClose: () => void
  disableClose?: boolean
}

const ModalMessage: React.FC<ModalMessageProps> = ({
  isOpen,
  title,
  message,
  onClose,
  disableClose = false
}) => {
  if (!isOpen) return null

  const normalized = title?.toLowerCase()
  const type =
    normalized?.includes('erro') || normalized === 'error' ? 'error' : 'success'

  const displayTitle =
    normalized === 'success'
      ? 'Sucesso'
      : normalized === 'error'
      ? 'Erro'
      : title

  return (
    <Overlay>
      <ModalContainer>
        <IconWrapper type={type}>
          {type === 'success' ? <CheckCircle /> : <XCircle />}
        </IconWrapper>

        {displayTitle && <TitleStyled type={type}>{displayTitle}</TitleStyled>}

        <Message>{message}</Message>

        {!disableClose && <CloseButton onClick={onClose}>Fechar</CloseButton>}
      </ModalContainer>
    </Overlay>
  )
}

export default ModalMessage
