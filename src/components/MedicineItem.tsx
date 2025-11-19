import React from 'react'
import {
  MedicineCard,
  MedicineCardHeader,
  MedicineCardInfo,
  MedicineActions,
  BtnStatus,
  ViewButton
} from '../styles/Styles'
import { useMedicine } from '../hooks/useMedicine'
import * as medicineService from '../services/medicineService'
import { formatDateBR } from '../utils/date'

interface Props {
  medicine: medicineService.Medicine
  onView: () => void
}

const MedicineItem: React.FC<Props> = ({ medicine, onView }) => {
  const { createHistory } = useMedicine()

  const handleRegisterDose = async () => {
    const now = new Date().toISOString()
    await createHistory(medicine.id, now, true)
  }

  const getNextDose = () => {
    if (!medicine.lastTakenAt || !medicine.intervalHours) return null
    const last = new Date(medicine.lastTakenAt)
    const next = new Date(
      last.getTime() + medicine.intervalHours * 60 * 60 * 1000
    )
    return next
  }

  const nextDose = getNextDose()
  const isLate = nextDose && nextDose.getTime() < Date.now()

  return (
    <MedicineCard>
      <MedicineCardHeader>
        <h3>{medicine.name}</h3>
        <small>{medicine.type === 'PILL' ? 'Comprimidos' : 'Líquido'}</small>
      </MedicineCardHeader>

      <MedicineCardInfo>
        <p>
          Intervalo: <b>{medicine.intervalHours}h</b>
        </p>
        <p>Última dose: {formatDateBR(medicine.lastTakenAt)}</p>

        {nextDose && (
          <p>
            Próxima dose:{' '}
            <b style={{ color: isLate ? 'red' : 'inherit' }}>
              {nextDose.toLocaleString('pt-BR')}
            </b>
          </p>
        )}

        {medicine.type === 'PILL' && medicine.totalPills && (
          <p>
            Estoque: {medicine.totalPills} comprimidos ({medicine.pillsPerDose}{' '}
            por dose)
          </p>
        )}
        {medicine.type === 'LIQUID' && medicine.totalMl && (
          <p>
            Estoque: {medicine.totalMl} ml ({medicine.mlPerDose} ml por dose)
          </p>
        )}
      </MedicineCardInfo>

      <MedicineActions>
        <ViewButton onClick={onView}>Ver Detalhes</ViewButton>
      </MedicineActions>
    </MedicineCard>
  )
}

export default MedicineItem
