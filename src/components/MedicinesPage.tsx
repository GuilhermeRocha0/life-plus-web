import React, { useState } from 'react'
import {
  MedicinesContainer,
  MedicinesCard,
  MedicinesHeader,
  MedicinesListHeader,
  MedicinesList,
  MedicineItem,
  MedicineInfo,
  BtnAdd,
  BtnStatus,
  RegularAddButton,
  ViewButton,
  MedicineActions
} from '../styles/Styles'

export interface Medicine {
  id: string
  name: string
  quantity: string
  expiration: string
  reminderDateTime: string
  taken: boolean
}

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: '1',
      name: 'Paracetamol',
      quantity: '30 comprimidos',
      expiration: '2025-12-01',
      reminderDateTime: '2025-11-03T08:00',
      taken: true
    },
    {
      id: '2',
      name: 'Tibolona',
      quantity: '6 comprimidos',
      expiration: '2025-08-15',
      reminderDateTime: '2025-11-03T10:00',
      taken: true
    },
    {
      id: '3',
      name: 'Lozartana',
      quantity: '8 cápsulas',
      expiration: '2026-01-20',
      reminderDateTime: '2025-11-03T20:00',
      taken: true
    }
  ])

  return (
    <MedicinesContainer>
      <MedicinesCard>
        <MedicinesListHeader></MedicinesListHeader>

        <MedicinesList>
          {medicines.map(med => (
            <MedicineItem key={med.id}>
              <MedicineInfo>
                <h3>{med.name}</h3>
                <p>Quantidade: {med.quantity}</p>
                <p>Validade: {med.expiration}</p>
                <p>
                  Lembrete:{' '}
                  {new Date(med.reminderDateTime).toLocaleString('pt-BR', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                  })}
                </p>
              </MedicineInfo>
              <MedicineActions>
                <BtnStatus taken={med.taken}>Adicionar Tomou Remédio</BtnStatus>
                <ViewButton>Visualizar</ViewButton>
              </MedicineActions>
            </MedicineItem>
          ))}
        </MedicinesList>
      </MedicinesCard>
    </MedicinesContainer>
  )
}
