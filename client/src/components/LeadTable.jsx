import { useState } from "react";
import API from "../services/api";
import EditLeadModal from "./EditLeadModal";
import "../styles/LeadTable.css";

function LeadTable({ leads, fetchLeads }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // Delete Lead
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/leads/${id}`);
      alert("Lead deleted successfully!");
      fetchLeads();
    } catch (error) {
      console.error(error);
      alert("Failed to delete lead");
    }
  };

  // Update Status
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/leads/${id}`, {
        status,
      });

      fetchLeads();
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  // Open Edit Modal
  const handleEdit = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="lead-table">
        <h2>Client Leads</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Source</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  No Leads Found
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead._id}>
                  <td>{lead.name}</td>

                  <td>{lead.email}</td>

                  <td>{lead.phone}</td>

                  <td>{lead.source}</td>

                  <td>
                    <div className="status-container">
                      <span
                        className={`status-badge ${lead.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {lead.status}
                      </span>

                      <select
                        value={lead.status}
                        onChange={(e) =>
                          updateStatus(lead._id, e.target.value)
                        }
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted">Converted</option>
                      </select>
                    </div>
                  </td>

                  <td>
                    {lead.createdAt
                      ? new Date(lead.createdAt).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(lead)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(lead._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <EditLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lead={selectedLead}
        fetchLeads={fetchLeads}
      />
    </>
  );
}

export default LeadTable;