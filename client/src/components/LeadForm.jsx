import { useState } from "react";
import API from "../services/api";
import "../styles/LeadForm.css";

function LeadForm({ fetchLeads }) {
  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    source: "Website",
  });

  const handleChange = (e) => {
    setLead({
      ...lead,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/leads", {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        source: lead.source,
        status: "New",
      });

      alert("Lead Added Successfully!");

      setLead({
        name: "",
        email: "",
        phone: "",
        source: "Website",
      });

      fetchLeads();
    } catch (error) {
      console.error("Error adding lead:", error);
      alert("Failed to add lead");
    }
  };

  return (
    <div className="lead-form">
      <h2>Add New Lead</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Client Name"
          value={lead.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={lead.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={lead.phone}
          onChange={handleChange}
          required
        />

        <select
          name="source"
          value={lead.source}
          onChange={handleChange}
        >
          <option value="Website">Website</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Referral">Referral</option>
          <option value="Instagram">Instagram</option>
        </select>

        <button type="submit">Add Lead</button>
      </form>
    </div>
  );
}

export default LeadForm;