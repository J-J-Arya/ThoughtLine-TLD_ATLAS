import { useState } from "react";
import "./AddProject.css";

type AddProjectProps = {
  closeForm: () => void;
};

const AddProject = ({ closeForm }: AddProjectProps) => {
  const [form, setForm] = useState({
    name: "",
    client: "",
    status: "Ongoing",
    summary: "",
    teamMembers: [""],
    document: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleTeamMemberChange = (index: number, value: string) => {
    const updated = [...form.teamMembers];
    updated[index] = value;
    setForm({ ...form, teamMembers: updated });
  };

  const addTeamMember = () => {
    setForm({ ...form, teamMembers: [...form.teamMembers, ""] });
  };

  const removeTeamMember = (index: number) => {
    const updated = form.teamMembers.filter((_, i) => i !== index);
    setForm({ ...form, teamMembers: updated });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, document: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("New Project:", form);

    // Backend API integration later
    closeForm(); // ✅ close modal instead of navigating
  };

  return (
    <div className="add-project-modal">
      {/* CLOSE BUTTON */}
      <button className="close-btn" onClick={closeForm}>
        ✕
      </button>

      <h2>Add New Project</h2>

      <form className="add-project-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Project Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="client"
          placeholder="Client Name"
          value={form.client}
          onChange={handleChange}
          required
        />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
          <option value="Upcoming">Upcoming</option>
        </select>

        <textarea
          name="summary"
          placeholder="Project Description"
          value={form.summary}
          onChange={handleChange}
          rows={4}
          required
        />

        {/* ===== TEAM MEMBERS ===== */}
        <div className="team-section">
          <label>Team Members</label>

          {form.teamMembers.map((member, index) => (
            <div key={index} className="team-row">
              <input
                type="text"
                placeholder={`Member ${index + 1}`}
                value={member}
                onChange={(e) =>
                  handleTeamMemberChange(index, e.target.value)
                }
              />

              {form.teamMembers.length > 1 && (
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeTeamMember(index)}
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="add-member-btn"
            onClick={addTeamMember}
          >
            + Add Member
          </button>
        </div>

        {/* ===== PDF UPLOAD ===== */}
        <div className="file-upload">
          <label>Project Document (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit">Save Project</button>
      </form>
    </div>
  );
};

export default AddProject;
