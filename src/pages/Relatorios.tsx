import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { useMedicine } from "../hooks/useMedicine";

ChartJS.register(ArcElement, Tooltip, Legend);

const apiBase = import.meta.env.VITE_API_URL.replace(/\/$/, "");

const Relatorios: React.FC = () => {
  const { medicines, fetchMedicines } = useMedicine();
  const [histories, setHistories] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMedicines();
  }, []);

  // Buscar histórico de cada remédio
  useEffect(() => {
    if (medicines.length === 0) return;

    let mounted = true;

    (async () => {
      setLoading(true);
      const histMap: Record<string, any[]> = {};

      for (const med of medicines) {
        try {
          const res = await fetch(`${apiBase}/medicine/${med.id}/history`);
          if (!res.ok) {
            histMap[med.id] = [];
            continue;
          }
          const json = await res.json();
          histMap[med.id] = Array.isArray(json) ? json : [];
        } catch {
          histMap[med.id] = [];
        }
      }

      if (mounted) setHistories(histMap);
      setLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, [medicines]);

  // Cálculo real
  const calcularDoses = (med: any) => {
    let dosesPossiveis = 0;

    if (med.type === "PILL" && med.totalPills && med.pillsPerDose) {
      dosesPossiveis = Math.floor(med.totalPills / med.pillsPerDose);
    } else if (med.type === "LIQUID" && med.totalMl && med.mlPerDose) {
      dosesPossiveis = Math.floor(med.totalMl / med.mlPerDose);
    }

    const hist = histories[med.id] || [];
    const tomadas = hist.length; // CADA registro = 1 dose tomada
    const restantes = Math.max(0, dosesPossiveis - tomadas);

    return { dosesPossiveis, tomadas, restantes };
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Relatórios de Medicamentos</h2>

      {loading && <p>Carregando...</p>}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          marginTop: "20px"
        }}
      >
        {medicines.map((med) => {
          const { dosesPossiveis, tomadas, restantes } = calcularDoses(med);

          const data = {
            labels: ["Tomadas", "Restantes"],
            datasets: [
              {
                data: [tomadas, restantes],
                backgroundColor: ["#36A2EB", "#FF6384"],
                borderWidth: 1
              }
            ]
          };

          return (
            <div
              key={med.id}
              style={{
                width: 280,
                padding: 20,
                borderRadius: 12,
                background: "#fff",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
              }}
            >
              <h3 style={{ textAlign: "center" }}>{med.name}</h3>
              <Pie data={data} />
              <p style={{ textAlign: "center" }}>
                {tomadas} tomadas • {restantes} restantes (de {dosesPossiveis})
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Relatorios;
