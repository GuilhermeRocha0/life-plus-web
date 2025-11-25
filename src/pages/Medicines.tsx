import React, { useState, useEffect } from 'react'
import ResponsiveNavbar from '../components/ResponsiveNavbar'
import { useMedicine } from '../hooks/useMedicine'
import MessageModal from '../components/MessageModal'
import LoadingModal from '../components/LoadingModal'
import MedicineItem from '../components/MedicineItem'
import MedicineItemSkeleton from '../components/MedicineItemSkeleton'
import MedicineDetails from '../components/MedicineDetails'
import * as medicineService from '../services/medicineService'
import { fromInputDateTime } from '../utils/timezone'

import {
  PageWrapper,
  PageTitle,
  PageHeader,
  RegularAddButton,
  InputGroup,
  Label,
  Input,
  SubmitButton,
  CancelButton,
  MedicineList,
  ExamInfoText
} from '../styles/Styles'

type ActiveSection = 'list' | 'create' | 'view' | null

const Medicines: React.FC = () => {
  const {
    medicines,
    fetchMedicines,
    createMedicine,
    loading: contextLoading
  } = useMedicine()

  const [activeSection, setActiveSection] = useState<ActiveSection>('list')
  const [loadingCreate, setLoadingCreate] = useState(false)
  const [selectedMedicine, setSelectedMedicine] =
    useState<medicineService.Medicine | null>(null)


  const [modalMessage, setModalMessage] = useState<{
    title?: string
    message: string
  } | null>(null)

  const [medicineData, setMedicineData] = useState({
    name: '',
    type: 'PILL' as 'PILL' | 'LIQUID',
    intervalHours: 0,
    lastTakenAt: '',
    continuousUse: false,
    totalPills: undefined as number | undefined,
    pillsPerDose: undefined as number | undefined,
    totalMl: undefined as number | undefined,
    mlPerDose: undefined as number | undefined
  })

  useEffect(() => {
    fetchMedicines()
  }, [])

  const handleViewMedicine = (id: string) => {
    const med = medicines.find(m => m.id === id)
    if (!med) return
    setSelectedMedicine(med)
    setActiveSection('view')
  }

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingCreate(true)

    try {
      await createMedicine({
        ...medicineData,
        lastTakenAt: fromInputDateTime(medicineData.lastTakenAt)
      })

      setModalMessage({
        title: 'Sucesso',
        message: 'Medicamento criado com sucesso!'
      })

      setMedicineData({
        name: '',
        type: 'PILL',
        intervalHours: 0,
        lastTakenAt: '',
        continuousUse: false,
        totalPills: undefined,
        pillsPerDose: undefined,
        totalMl: undefined,
        mlPerDose: undefined
      })

      setActiveSection('list')
    } catch (err: any) {
      setModalMessage({
        title: 'Erro',
        message: err?.response?.data?.erro || 'Erro ao criar medicamento.'
      })
    } finally {
      setLoadingCreate(false)
    }
  }

  const renderSection = () => {
    const isLoadingList = contextLoading && activeSection === 'list'

    if (isLoadingList) {
      return (
        <>
          <PageHeader>
            <PageTitle>Meus Remédios</PageTitle>
          </PageHeader>

          <MedicineList>
            {Array.from({ length: 5 }).map((_, i) => (
              <MedicineItemSkeleton key={i} />
            ))}
          </MedicineList>
        </>
      )
    }

    if (activeSection === 'create') {
      return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <PageTitle>Adicionar Remédio</PageTitle>

          <form onSubmit={handleCreateSubmit}>
            <InputGroup>
              <Label>Nome:</Label>
              <Input
                value={medicineData.name}
                onChange={e =>
                  setMedicineData({ ...medicineData, name: e.target.value })
                }
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Tipo:</Label>
              <select
                style={{ width: '100%', padding: '10px', borderRadius: '8px' }}
                value={medicineData.type}
                onChange={e =>
                  setMedicineData({
                    ...medicineData,
                    type: e.target.value as 'PILL' | 'LIQUID'
                  })
                }
                required
              >
                <option value="PILL">Comprimido / Cápsula</option>
                <option value="LIQUID">Líquido (ml)</option>
              </select>
            </InputGroup>

            <InputGroup>
              <Label>Intervalo (horas):</Label>
              <Input
                type="number"
                value={medicineData.intervalHours}
                onChange={e =>
                  setMedicineData({
                    ...medicineData,
                    intervalHours: Number(e.target.value)
                  })
                }
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Última Dose:</Label>
              <Input
                type="datetime-local"
                value={medicineData.lastTakenAt}
                onChange={e =>
                  setMedicineData({
                    ...medicineData,
                    lastTakenAt: e.target.value
                  })
                }
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Uso contínuo?</Label>
              <select
                value={medicineData.continuousUse ? 'yes' : 'no'}
                onChange={e =>
                  setMedicineData({
                    ...medicineData,
                    continuousUse: e.target.value === 'yes'
                  })
                }
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px'
                }}
              >
                <option value="yes">Sim</option>
                <option value="no">Não</option>
              </select>
            </InputGroup>

            {medicineData.type === 'PILL' && (
              <>
                <InputGroup>
                  <Label>Total de Comprimidos:</Label>
                  <Input
                    type="number"
                    value={medicineData.totalPills || ''}
                    onChange={e =>
                      setMedicineData({
                        ...medicineData,
                        totalPills: Number(e.target.value)
                      })
                    }
                  />
                </InputGroup>

                <InputGroup>
                  <Label>Comprimidos por dose:</Label>
                  <Input
                    type="number"
                    value={medicineData.pillsPerDose || ''}
                    onChange={e =>
                      setMedicineData({
                        ...medicineData,
                        pillsPerDose: Number(e.target.value)
                      })
                    }
                  />
                </InputGroup>
              </>
            )}

            {medicineData.type === 'LIQUID' && (
              <>
                <InputGroup>
                  <Label>Total (ml):</Label>
                  <Input
                    type="number"
                    value={medicineData.totalMl || ''}
                    onChange={e =>
                      setMedicineData({
                        ...medicineData,
                        totalMl: Number(e.target.value)
                      })
                    }
                  />
                </InputGroup>

                <InputGroup>
                  <Label>ml por dose:</Label>
                  <Input
                    type="number"
                    value={medicineData.mlPerDose || ''}
                    onChange={e =>
                      setMedicineData({
                        ...medicineData,
                        mlPerDose: Number(e.target.value)
                      })
                    }
                  />
                </InputGroup>
              </>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <SubmitButton type="submit">Salvar</SubmitButton>
              <CancelButton onClick={() => setActiveSection('list')}>
                Voltar
              </CancelButton>
            </div>
          </form>
        </div>
      )
    }

    if (activeSection === 'view' && selectedMedicine) {
      return (
        <MedicineDetails
          medicine={selectedMedicine}
          onClose={() => {
            setSelectedMedicine(null)
            setActiveSection('list')
          }}
        />
      )
    }

    return (
      <>
        <PageHeader>
          <PageTitle>Meus Remédios</PageTitle>

          <RegularAddButton onClick={() => setActiveSection('create')}>
            Adicionar Remédio
          </RegularAddButton>
        </PageHeader>

        {medicines.length === 0 ? (
          <ExamInfoText>Nenhum remédio cadastrado.</ExamInfoText>
        ) : (
          <MedicineList>
            {medicines.map(med => (
              <MedicineItem
                key={med.id}
                medicine={med}
                onView={() => handleViewMedicine(med.id)}
              />
            ))}
          </MedicineList>
        )}
      </>
    )
  }

  return (
    <>
      <ResponsiveNavbar />

      <PageWrapper>{renderSection()}</PageWrapper>

      {modalMessage && (
        <MessageModal
          isOpen={!!modalMessage}
          title={modalMessage.title}
          message={modalMessage.message}
          onClose={() => setModalMessage(null)}
        />
      )}

      <LoadingModal isOpen={loadingCreate} />
    </>
  )
}

export default Medicines
