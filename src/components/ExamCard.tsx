import React from 'react'
import {
  StyledExamCard,
  ExamIcon,
  ExamInfo,
  ExamInfoTitle,
  ExamInfoText,
  ViewButton
} from '../styles/Styles'

import * as examService from '../services/examService'

interface ExamCardProps {
  exam: examService.Exam
}

const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  return (
    <StyledExamCard>
      <ExamIcon>?</ExamIcon>
      <ExamInfo>
        <ExamInfoTitle>{exam.name}</ExamInfoTitle>
        <ExamInfoText>
          {exam.date ? new Date(exam.date).toLocaleDateString() : 'Sem data'}
        </ExamInfoText>
      </ExamInfo>
      <ViewButton>Visualizar</ViewButton>
    </StyledExamCard>
  )
}

export default ExamCard
