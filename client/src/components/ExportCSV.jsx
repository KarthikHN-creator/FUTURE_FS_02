import { CSVLink } from "react-csv";

function ExportCSV({ leads }) {
  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Source", key: "source" },
    { label: "Status", key: "status" },
  ];

  return (
    <div style={{ margin: "20px 0" }}>
      <CSVLink
        data={leads}
        headers={headers}
        filename="client_leads.csv"
        className="export-btn"
      >
        Export Leads to CSV
      </CSVLink>
    </div>
  );
}

export default ExportCSV;