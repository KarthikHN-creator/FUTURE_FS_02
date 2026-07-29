import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";
import "../styles/LeadChart.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function LeadChart({ leads }) {
  const newLeads = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const contacted = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  const converted = leads.filter(
    (lead) => lead.status === "Converted"
  ).length;

  const data = {
    labels: [
      "New",
      "Contacted",
      "Converted",
    ],
    datasets: [
      {
        label: "Leads",
        data: [
          newLeads,
          contacted,
          converted,
        ],
        backgroundColor: [
          "#3b82f6",
          "#f59e0b",
          "#16a34a",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2>Lead Analytics</h2>

      <Pie data={data} />
    </div>
  );
}

export default LeadChart;