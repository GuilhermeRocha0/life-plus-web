import React, { useState } from 'react';
import { PageWrapper, PageTitle, ExamsGrid, RegularAddButton, PageHeader, DropzoneText } from '../styles/Styles';
import ExamCard from '../components/ExamCard';
import ResponsiveNavbar from '../components/ResponsiveNavbar';
import Dropzone from 'react-dropzone';

const examsArr = [
  { title: "Hemograma", date: "12/05/2025" },
  { title: "Glicemia", date: "01/04/2025" },
  { title: "Ultrassom", date: "20/05/2025" },
  { title: "Ressonância Magnética", date: "01/07/2025" },
  { title: "Radiografia", date: "15/08/2025" },
];

const Exams: React.FC = () => {
  const [showDropzone, setShowDropzone] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleDrop = (acceptedFiles: File[]) => {
    setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
  };

  return (
    <>
      <ResponsiveNavbar />
      <PageWrapper>
        <PageHeader>
          <PageTitle>Exames</PageTitle>
          <RegularAddButton onClick={() => setShowDropzone(!showDropzone)}>
            {showDropzone ? "Fechar Upload" : "Adicionar Exame"}
          </RegularAddButton>
        </PageHeader>

        {/* Dropzone aparece ao clicar no botão */}
        {showDropzone && (
          <div style={{
            border: "2px dashed #0b63d6",
            borderRadius: "12px",
            padding: "30px",
            marginBottom: "30px",
            background: "#f9fbff",
            textAlign: "center"
          }}>
            <Dropzone onDrop={handleDrop} multiple>
              {({ getRootProps, getInputProps }) => (
                <DropzoneText {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Arraste seus arquivos aqui ou clique para selecionar</p>
                  <small>(Simulação local — ainda sem envio ao servidor)</small>
                </DropzoneText>
              )}
            </Dropzone>


            {selectedFiles.length > 0 && (
              <div style={{ marginTop: "15px", textAlign: "left" , color: "#0b63d6"}}>
                <strong>Arquivos selecionados:</strong>
                <ul>
                  {selectedFiles.map((file, idx) => (
                    <li key={idx}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <ExamsGrid>
          {examsArr.map((exam, index) => (
            <ExamCard key={index} exam={exam} />
          ))}
        </ExamsGrid>
      </PageWrapper>
    </>
  );
};

export default Exams;
