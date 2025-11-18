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
  onView: (exam: examService.Exam) => void
}

const ExamCard: React.FC<ExamCardProps> = ({ exam, onView }) => {
  return (
    <StyledExamCard>
      <ExamIcon>?</ExamIcon>
      <ExamInfo>
        <ExamInfoTitle>{exam.name}</ExamInfoTitle>
        <ExamInfoText>
          {exam.date ? new Date(exam.date).toLocaleDateString() : 'Sem data'}
        </ExamInfoText>
      </ExamInfo>
      <ViewButton onClick={() => onView(exam)}>Visualizar</ViewButton>
    </StyledExamCard>
  )
}

export default ExamCard
