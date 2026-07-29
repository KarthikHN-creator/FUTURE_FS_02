import "../styles/DashboardCards.css";

function DashboardCards({ leads }) {
  const total = leads.length;
  const newLeads = leads.filter((lead) => lead.status === "New").length;
  const contacted = leads.filter((lead) => lead.status === "Contacted").length;
  const converted = leads.filter((lead) => lead.status === "Converted").length;

  return (
    <div className="cards">
      <div className="card">
        <h3>Total Leads</h3>
        <p>{total}</p>
      </div>

      <div className="card">
        <h3>New</h3>
        <p>{newLeads}</p>
      </div>

      <div className="card">
        <h3>Contacted</h3>
        <p>{contacted}</p>
      </div>

      <div className="card">
        <h3>Converted</h3>
        <p>{converted}</p>
      </div>
    </div>
  );
}

export default DashboardCards;