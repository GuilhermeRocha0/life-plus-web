import React, { useState } from "react";
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
} from "../styles/Styles";

export interface Medicine {
  id: string;
  name: string;
  quantity: string;
  taken: boolean;
}


export default function MedicinesPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([
    { id: "1", name: "Paracetamol", quantity: "30 comprimidos", taken: true },
    { id: "2", name: "Tibolona", quantity: "6 comprimidos", taken: true },
    { id: "3", name: "Lozartana", quantity: "8 cápsulas", taken: true },
  ]);

  const addMedicine = () => {
    const newMed: Medicine = {
      id: Date.now().toString(),
      name: "Novo Remédio",
      quantity: "0 comprimidos",
      taken: false,
    };
    setMedicines((prev) => [...prev, newMed]);
  };

  const toggleTaken = (id: string) => {
    setMedicines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, taken: !m.taken } : m))
    );
  };

  return (
    <MedicinesContainer>
      <MedicinesCard>
        <MedicinesHeader>
          <h1>Remédios</h1>
          <hr />
        </MedicinesHeader>

        <MedicinesListHeader>
          <h2>Lista de Remédios</h2>
          <BtnAdd onClick={addMedicine}>Adicionar Remédio</BtnAdd>
        </MedicinesListHeader>

        <MedicinesList>
          {medicines.map((med) => (
            <MedicineItem key={med.id}>
              <MedicineInfo>
                <h3>{med.name}</h3>
                <p>{med.quantity}</p>
              </MedicineInfo>
              <BtnStatus
                taken={med.taken}
                onClick={() => toggleTaken(med.id)}
              >
                {med.taken ? "Tomado" : "Marcar como Tomado"}
              </BtnStatus>
            </MedicineItem>
          ))}
        </MedicinesList>
      </MedicinesCard>
    </MedicinesContainer>
  );
}