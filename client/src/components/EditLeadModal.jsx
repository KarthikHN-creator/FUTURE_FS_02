import { useState, useEffect } from "react";
import API from "../services/api";
import "../styles/EditLeadModal.css";

function EditLeadModal({ isOpen, onClose, lead, fetchLeads }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
  });

  useEffect(() => {
    if (lead) {
      setFormData({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        source: lead.source,
      });
    }
  }, [lead]);

  if (!isOpen || !lead) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/leads/${lead._id}`, {
        ...formData,
        status: lead.status,
      });

      alert("Lead Updated Successfully!");

      fetchLeads();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to update lead");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Edit Lead</h2>

        <form onSubmit={handleUpdate}>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
          >
            <option>Website</option>
            <option>LinkedIn</option>
            <option>Referral</option>
            <option>Instagram</option>
          </select>

          <div className="modal-buttons">
            <button type="submit">Update</button>

            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default EditLeadModal;