import React from 'react'
import styled from 'styled-components'
import {
  Overlay,
  ModalContainer as BaseModalContainer,
  Spinner,
  LoadingText
} from '../styles/Styles'

interface LoadingModalProps {
  isOpen: boolean
}

const ModalContainer = styled(BaseModalContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen }) => {
  if (!isOpen) return null

  return (
    <Overlay>
      <ModalContainer>
        <Spinner />
        <LoadingText>Carregando...</LoadingText>
      </ModalContainer>
    </Overlay>
  )
}

export default LoadingModal
