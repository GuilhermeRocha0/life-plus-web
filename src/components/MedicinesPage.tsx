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
  expiration: string;
  reminderDateTime: string;
  taken: boolean;
}

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: "1",
      name: "Paracetamol",
      quantity: "30 comprimidos",
      expiration: "2025-12-01",
      reminderDateTime: "2025-11-03T08:00",
      taken: true,
    },
    {
      id: "2",
      name: "Tibolona",
      quantity: "6 comprimidos",
      expiration: "2025-08-15",
      reminderDateTime: "2025-11-03T10:00",
      taken: true,
    },
    {
      id: "3",
      name: "Lozartana",
      quantity: "8 cápsulas",
      expiration: "2026-01-20",
      reminderDateTime: "2025-11-03T20:00",
      taken: true,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    expiration: "",
    reminderDateTime: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.quantity) {
      alert("Preencha todos os campos!");
      return;
    }

    const newMed: Medicine = {
      id: Date.now().toString(),
      name: formData.name,
      quantity: formData.quantity,
      expiration: formData.expiration,
      reminderDateTime: formData.reminderDateTime,
      taken: false,
    };

    setMedicines((prev) => [...prev, newMed]);
    setFormData({ name: "", quantity: "", expiration: "", reminderDateTime: "" });
    setShowForm(false);
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
        </MedicinesHeader>

        <MedicinesListHeader>
          <h2>Lista de Remédios</h2>
          <BtnAdd onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancelar" : "Adicionar Remédio"}
          </BtnAdd>
        </MedicinesListHeader>

        {/* 🧾 Formulário só aparece quando showForm = true */}
        {showForm && (
          <form
            onSubmit={addMedicine}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "20px",
              backgroundColor: "#727272ff",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Nome do remédio"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="quantity"
              placeholder="Quantidade (ex: 10 comprimidos)"
              value={formData.quantity}
              onChange={handleChange}
            />
            <label>Data de Validade:</label>
            <input
              type="date"
              name="expiration"
              value={formData.expiration}
              onChange={handleChange}
            />
            <label>Data e Hora da Notificação:</label>
            <input
              type="datetime-local"
              name="reminderDateTime"
              value={formData.reminderDateTime}
              onChange={handleChange}
            />
            <BtnAdd type="submit">Salvar Remédio</BtnAdd>
          </form>
        )}

        <MedicinesList>
          {medicines.map((med) => (
            <MedicineItem key={med.id}>
              <MedicineInfo>
                <h3>{med.name}</h3>
                <p>Quantidade: {med.quantity}</p>
                <p>Validade: {med.expiration}</p>
                <p>
                  Lembrete:{" "}
                  {new Date(med.reminderDateTime).toLocaleString("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </p>
              </MedicineInfo>
              <BtnStatus taken={med.taken} onClick={() => toggleTaken(med.id)}>
                {med.taken ? "Tomado" : "Marcar como Tomado"}
              </BtnStatus>
            </MedicineItem>
          ))}
        </MedicinesList>
      </MedicinesCard>
    </MedicinesContainer>
  );
}
