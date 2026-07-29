import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import LeadChart from "../components/LeadChart";
import ExportCSV from "../components/ExportCSV";
import SearchBar from "../components/SearchBar";
import LeadForm from "../components/LeadForm";
import LeadTable from "../components/LeadTable";
import API from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch all leads from MongoDB
  const fetchLeads = async () => {
    try {
      const response = await API.get("/leads");
      setLeads(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Filter leads based on search
  const filteredLeads = leads.filter((lead) => {
    const searchText = search.toLowerCase();

    return (
      lead.name.toLowerCase().includes(searchText) ||
      lead.email.toLowerCase().includes(searchText) ||
      lead.phone.includes(searchText) ||
      lead.source.toLowerCase().includes(searchText) ||
      lead.status.toLowerCase().includes(searchText)
    );
  });

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <h1>Client Lead Management System</h1>

        {/* Dashboard Cards */}
        <DashboardCards leads={leads} />

        {/* Lead Analytics Chart */}
        <LeadChart leads={leads} />

        {/* Export CSV */}
        <ExportCSV leads={leads} />

        {/* Search Bar */}
        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        {/* Add Lead Form */}
        <LeadForm fetchLeads={fetchLeads} />

        {/* Lead Table */}
        <LeadTable
          leads={filteredLeads}
          fetchLeads={fetchLeads}
        />
      </div>
    </>
  );
}

export default Dashboard;