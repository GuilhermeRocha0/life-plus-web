import React, { useEffect, useRef, useState } from 'react'
import {
  CancelButton,
  PageTitle,
  MedicineHistoryList,
  TopActions,
  ExamDetailsInfo,
  ExamInfoGroup,
  ExamInfoGroupLabel,
  MedicineHistoryContainer,
  OptionsDropdownContainer,
  OptionsButton,
  OptionsDropdown,
  OptionsDropdownItem,
  InputGroup,
  Label,
  Input,
  SubmitButton,
  BottomActions,
  RegularAddButton
} from '../styles/Styles'
import { useMedicine } from '../hooks/useMedicine'
import * as medicineService from '../services/medicineService'
import { FiSettings } from 'react-icons/fi'
import ConfirmModal from './ConfirmModal'
import LoadingModal from './LoadingModal'
import MessageModal from './MessageModal'
import { toInputDateTime, fromInputDateTime } from '../utils/timezone'
import { formatDateBR } from '../utils/date'

interface Props {
  medicine: medicineService.Medicine
  onClose: () => void
}

const MedicineDetails: React.FC<Props> = ({ medicine, onClose }) => {
  const {
    fetchMedicineHistory,
    history,
    loading,
    createHistory,
    updateMedicine,
    deleteMedicine
  } = useMedicine()

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [editing, setEditing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [messageModal, setMessageModal] = useState<{
    title: string
    message: string
    disableClose: boolean
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [registerDoseOpen, setRegisterDoseOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: medicine.name,
    type: medicine.type,
    intervalHours: medicine.intervalHours,
    lastTakenAt: toInputDateTime(medicine.lastTakenAt),
    continuousUse: medicine.continuousUse,
    totalPills: medicine.totalPills,
    pillsPerDose: medicine.pillsPerDose,
    totalMl: medicine.totalMl,
    mlPerDose: medicine.mlPerDose
  })

  const [doseForm, setDoseForm] = useState({
    onTime: true,
    takenAt: toInputDateTime(medicine.lastTakenAt)
  })

  useEffect(() => {
    fetchMedicineHistory(medicine.id)
  }, [medicine.id])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleRegisterDose = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let newTakenAt = doseForm.takenAt

      if (doseForm.onTime) {
        const last = new Date(medicine.lastTakenAt)
        last.setHours(last.getHours() + medicine.intervalHours)
        newTakenAt = toInputDateTime(last.toISOString())
      } else {
        if (new Date(doseForm.takenAt) < new Date(medicine.lastTakenAt)) {
          setMessageModal({
            title: 'Erro',
            message:
              'A nova data não pode ser menor que a última dose registrada.',
            disableClose: false
          })
          setIsLoading(false)
          return
        }
      }

      const now = new Date().toISOString()
      await createHistory(medicine.id, now, true)

      await updateMedicine(medicine.id, {
        lastTakenAt: fromInputDateTime(newTakenAt)
      })

      setMessageModal({
        title: 'Sucesso',
        message: 'Dose registrada com sucesso!',
        disableClose: true
      })

      setTimeout(() => {
        window.location.reload()
      }, 1200)
    } catch (err: any) {
      setMessageModal({
        title: 'Erro',
        message: err?.message || 'Erro ao registrar dose.',
        disableClose: false
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirmDelete = async () => {
    setConfirmDelete(false)
    setIsLoading(true)
    try {
      await deleteMedicine(medicine.id)

      setIsLoading(false)

      setMessageModal({
        title: 'Sucesso',
        message: 'Remédio excluído com sucesso!',
        disableClose: true
      })
      setTimeout(onClose, 1200)
    } catch (err: any) {
      setIsLoading(false)

      setMessageModal({
        title: 'Erro',
        message: err?.message || 'Erro ao excluir remédio.',
        disableClose: false
      })
    }
  }

  const handleSubmitUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    if (new Date(formData.lastTakenAt) < new Date(medicine.lastTakenAt)) {
      setMessageModal({
        title: 'Erro',
        message: 'A nova data não pode ser menor que a última dose registrada.',
        disableClose: true
      })
      return
    }

    try {
      await updateMedicine(medicine.id, {
        ...formData,
        lastTakenAt: fromInputDateTime(formData.lastTakenAt)
      })

      setIsLoading(false)

      setMessageModal({
        title: 'Sucesso',
        message: 'Remédio atualizado!',
        disableClose: true
      })

      setTimeout(() => {
        window.location.reload()
      }, 1200)
    } catch (err: any) {
      setIsLoading(false)
      setMessageModal({
        title: 'Erro',
        message: err.message || 'Erro ao atualizar remédio.',
        disableClose: false
      })
    }
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <TopActions>
        <CancelButton onClick={onClose}>Voltar</CancelButton>

        <OptionsDropdownContainer ref={dropdownRef}>
          <OptionsButton type="button" onClick={() => setDropdownOpen(p => !p)}>
            <FiSettings size={18} /> Opções
          </OptionsButton>

          {dropdownOpen && (
            <OptionsDropdown>
              <OptionsDropdownItem
                onClick={() => {
                  setEditing(true)
                  setDropdownOpen(false)
                }}
              >
                Alterar Remédio
              </OptionsDropdownItem>

              <OptionsDropdownItem
                className="danger"
                onClick={() => {
                  setDropdownOpen(false)
                  setConfirmDelete(true)
                }}
              >
                Excluir Remédio
              </OptionsDropdownItem>
            </OptionsDropdown>
          )}
        </OptionsDropdownContainer>
      </TopActions>

      {!editing ? (
        <>
          <PageTitle>{medicine.name}</PageTitle>

          <ExamDetailsInfo>
            <ExamInfoGroup>
              <ExamInfoGroupLabel>Tipo:</ExamInfoGroupLabel>
              <p>{medicine.type === 'PILL' ? 'Comprimido' : 'Líquido'}</p>
            </ExamInfoGroup>

            <ExamInfoGroup>
              <ExamInfoGroupLabel>Intervalo:</ExamInfoGroupLabel>
              <p>{medicine.intervalHours}h</p>
            </ExamInfoGroup>

            <ExamInfoGroup>
              <ExamInfoGroupLabel>Última dose:</ExamInfoGroupLabel>
              <p>{formatDateBR(medicine.lastTakenAt)}</p>
            </ExamInfoGroup>
          </ExamDetailsInfo>

          <MedicineHistoryContainer>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <h2>Histórico de doses</h2>
              <RegularAddButton
                type="button"
                onClick={() => setRegisterDoseOpen(p => !p)}
              >
                Registrar Nova Dose
              </RegularAddButton>
            </div>

            {registerDoseOpen && (
              <form onSubmit={handleRegisterDose} style={{ marginTop: '20px' }}>
                <InputGroup>
                  <Label>Tomou no horário?</Label>
                  <select
                    value={doseForm.onTime ? 'yes' : 'no'}
                    onChange={e =>
                      setDoseForm({
                        ...doseForm,
                        onTime: e.target.value === 'yes'
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

                {!doseForm.onTime && (
                  <InputGroup>
                    <Label>Data e hora da dose:</Label>
                    <Input
                      type="datetime-local"
                      value={doseForm.takenAt}
                      min={toInputDateTime(medicine.lastTakenAt)}
                      onChange={e =>
                        setDoseForm({
                          ...doseForm,
                          takenAt: e.target.value
                        })
                      }
                    />
                  </InputGroup>
                )}

                <SubmitButton style={{ marginTop: '20px' }}>
                  Registrar
                </SubmitButton>
              </form>
            )}

            {loading ? (
              <p>Carregando...</p>
            ) : history.length === 0 ? (
              <p>Nenhuma dose registrada.</p>
            ) : (
              <MedicineHistoryList>
                {history.map((h, index) => (
                  <li key={h.id}>
                    {history.length - index}° Dose:{' '}
                    <strong>
                      {new Date(h.takenAt).toLocaleString('pt-BR')}
                    </strong>
                  </li>
                ))}
              </MedicineHistoryList>
            )}
            <BottomActions>
              <CancelButton onClick={onClose}>Voltar</CancelButton>
              <RegularAddButton
                type="button"
                onClick={() => setRegisterDoseOpen(p => !p)}
              >
                Registrar Nova Dose
              </RegularAddButton>
            </BottomActions>
          </MedicineHistoryContainer>
        </>
      ) : (
        <form onSubmit={handleSubmitUpdate}>
          <PageTitle>Editar Remédio</PageTitle>

          <InputGroup>
            <Label>Nome</Label>
            <Input
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tipo</Label>
            <select
              value={formData.type}
              onChange={e =>
                setFormData({
                  ...formData,
                  type: e.target.value as 'PILL' | 'LIQUID'
                })
              }
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px'
              }}
            >
              <option value="PILL">Comprimido</option>
              <option value="LIQUID">Líquido</option>
            </select>
          </InputGroup>

          <InputGroup>
            <Label>Intervalo (h)</Label>
            <Input
              type="number"
              min={1}
              value={formData.intervalHours}
              onChange={e =>
                setFormData({
                  ...formData,
                  intervalHours: Number(e.target.value)
                })
              }
            />
          </InputGroup>

          <InputGroup>
            <Label>Última dose</Label>
            <Input
              type="datetime-local"
              value={formData.lastTakenAt}
              onChange={e =>
                setFormData({
                  ...formData,
                  lastTakenAt: e.target.value
                })
              }
            />
          </InputGroup>

          <InputGroup>
            <Label>Uso contínuo?</Label>
            <select
              value={formData.continuousUse ? 'yes' : 'no'}
              onChange={e =>
                setFormData({
                  ...formData,
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

          {formData.type === 'PILL' && (
            <>
              <InputGroup>
                <Label>Total de comprimidos</Label>
                <Input
                  type="number"
                  min={1}
                  value={formData.totalPills}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      totalPills: Number(e.target.value)
                    })
                  }
                />
              </InputGroup>

              <InputGroup>
                <Label>Comprimidos por dose</Label>
                <Input
                  type="number"
                  min={1}
                  value={formData.pillsPerDose}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      pillsPerDose: Number(e.target.value)
                    })
                  }
                />
              </InputGroup>
            </>
          )}

          {formData.type === 'LIQUID' && (
            <>
              <InputGroup>
                <Label>Total em ml</Label>
                <Input
                  type="number"
                  min={1}
                  value={formData.totalMl}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      totalMl: Number(e.target.value)
                    })
                  }
                />
              </InputGroup>

              <InputGroup>
                <Label>ml por dose</Label>
                <Input
                  type="number"
                  min={1}
                  value={formData.mlPerDose}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      mlPerDose: Number(e.target.value)
                    })
                  }
                />
              </InputGroup>
            </>
          )}

          <BottomActions>
            <SubmitButton type="submit">Salvar</SubmitButton>
            <CancelButton type="button" onClick={() => setEditing(false)}>
              Cancelar
            </CancelButton>
          </BottomActions>
        </form>
      )}

      {confirmDelete && (
        <ConfirmModal
          isOpen={confirmDelete}
          title="Excluir Remédio"
          message="Tem certeza que deseja excluir?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmDelete(false)}
        />
      )}

      <LoadingModal isOpen={isLoading} />

      {messageModal && (
        <MessageModal
          isOpen={true}
          title={messageModal.title}
          message={messageModal.message}
          disableClose={messageModal.disableClose}
          onClose={() => setMessageModal(null)}
        />
      )}
    </div>
  )
}

export default MedicineDetails
