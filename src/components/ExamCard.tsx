// Componente ExamCard
import React from 'react';
import { StyledExamCard, ExamIcon, ExamInfo, ExamInfoTitle, ExamInfoText, ViewButton } from '../styles/Styles';

interface ExamCardProps {
  exam: {
    title: string;
    date: string;
  };
}

const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  return (
    <StyledExamCard>
        <ExamIcon>?</ExamIcon>
        <ExamInfo>
            <ExamInfoTitle>{exam.title}</ExamInfoTitle>
            <ExamInfoText>Resultado</ExamInfoText>
            <ExamInfoText>{exam.date}</ExamInfoText>
        </ExamInfo>
        <ViewButton>Visualizar</ViewButton>
    </StyledExamCard>
  );
};

export default ExamCard;
