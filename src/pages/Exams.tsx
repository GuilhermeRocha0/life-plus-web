import React from 'react'
import {
  PageWrapper,
  PageTitle,
  ExamsGrid,
  RegularAddButton,
  PageHeader
} from '../styles/Styles'
import ExamCard from '../components/ExamCard'
import ResponsiveNavbar from '../components/ResponsiveNavbar'

const examsArr = [
  { title: 'Hemograma', date: '12/05/2025' },
  { title: 'Glicemia', date: '01/04/2025' },
  { title: 'Ultrassom', date: '20/05/2025' },
  { title: 'Ressonância Magnética', date: '01/07/2025' },
  { title: 'Radiografia', date: '15/08/2025' }
]

const Exams: React.FC = () => {
  return (
    <>
      <ResponsiveNavbar />
      <PageWrapper>
        <PageHeader>
          <PageTitle>Exames</PageTitle>
          <RegularAddButton>Adicionar Exame</RegularAddButton>
        </PageHeader>
        <ExamsGrid>
          {examsArr.map((exam, index) => (
            <ExamCard key={index} exam={exam} />
          ))}
        </ExamsGrid>
      </PageWrapper>
    </>
  )
}

export default Exams
