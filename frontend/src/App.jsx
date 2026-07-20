import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [leads, setLeads] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    source: 'Website Form'
  });

  // 1. Fetch leads from the backend (READ)
  const fetchLeads = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/leads');
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error("Failed to fetch leads", error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // 2. Handle typing in the form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Submit the new lead (CREATE)
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      // Clear the form back to default
      setFormData({ name: '', email: '', source: 'Website Form' });
      fetchLeads();
    } catch (error) {
      console.error("Failed to add lead", error);
    }
  };

  // 4. Delete a lead (DELETE)
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await fetch(`http://localhost:5000/api/leads/${id}`, {
          method: 'DELETE',
        });
        fetchLeads(); 
      } catch (error) {
        console.error("Failed to delete lead", error);
      }
    }
  };

  // 5. Update lead status (UPDATE)
  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/leads/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      fetchLeads(); // Instantly refresh the table to show new colors
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <div className="crm-container">
      <header className="header">
        <h1>Client Lead Management</h1>
      </header>
      
      <main className="main-content">
        {/* ADD LEAD FORM */}
        <div className="dashboard-card form-card">
          <h2>Add New Lead</h2>
          <form onSubmit={handleSubmit} className="lead-form">
            <input 
              type="text" name="name" placeholder="Full Name" required
              value={formData.name} onChange={handleChange} 
            />
            <input 
              type="email" name="email" placeholder="Email Address" required
              value={formData.email} onChange={handleChange} 
            />
            <select name="source" value={formData.source} onChange={handleChange}>
              <option value="Website Form">Website Form</option>
              <option value="Referral">Referral</option>
              <option value="Twitch Stream">Twitch Stream</option>
              <option value="Other">Other</option>
            </select>
            <button type="submit" className="add-btn">Add Lead</button>
          </form>
        </div>

        {/* LEADS TABLE */}
        <div className="dashboard-card">
          <h2>Current Leads</h2>
          <div className="table-container">
            <table className="leads-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr><td colSpan="5" className="empty-state">No leads found. Add one above!</td></tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id}>
                      <td>{lead.name}</td>
                      <td>{lead.email}</td>
                      <td>{lead.source}</td>
                      <td>
                        {/* 
                          The interactive dropdown for Status Update 
                          Notice the values match the MySQL enum perfectly now!
                        */}
                        <select 
                          className={`status-badge ${lead.status ? lead.status.toLowerCase() : 'new'}`}
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Converted">Converted</option>
                        </select>
                      </td>
                      <td>
                        <button 
                          className="delete-btn" 
                          onClick={() => handleDelete(lead.id)}
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
        </div>
      </main>
    </div>
  );
}

export default App;