import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import PageWrapper from "../../components/layout/PageWrapper";
import "./AddProject.css";

const AddProject = () => {
  const [teamMembers, setTeamMembers] = useState<string[]>([""]);
  const [files, setFiles] = useState<File[]>([]);

  const handleMemberChange = (index: number, value: string) => {
    const updated = [...teamMembers];
    updated[index] = value;
    setTeamMembers(updated);
  };

  const addMember = () => setTeamMembers([...teamMembers, ""]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <PageWrapper>
      <Navbar />

      <div className="add-project-container">
        <div className="add-project-content">
          <h1 className="add-project-title">Add New Project</h1>

          <form className="add-project-form">
            <input type="text" placeholder="Project Name" />
            <input type="text" placeholder="Client Name" />

            <select>
              <option value="">Select Status</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Upcoming">Upcoming</option>
            </select>

            <textarea placeholder="Project Summary" rows={4} />

            {/* TEAM MEMBERS */}
            <div className="team-section">
              <label className="section-label">Team Members</label>
              {teamMembers.map((member, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Member ${index + 1}`}
                  value={member}
                  onChange={(e) =>
                    handleMemberChange(index, e.target.value)
                  }
                />
              ))}

              <button
                type="button"
                className="secondary-btn"
                onClick={addMember}
              >
                + Add Team Member
              </button>
            </div>

            {/* ✅ FIXED UPLOAD SECTION */}
            <div className="upload-section">
              <label className="section-label">
                Project Documentation
              </label>

              <label className="upload-box">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.ppt,.pptx,.doc,.docx,.txt"
                  onChange={handleFileChange}
                />

                <div className="upload-content">
                  <span className="upload-icon">📄</span>
                  <span className="upload-text">
                    Click to upload files
                  </span>
                  <span className="upload-subtext">
                    PDF, PPT, DOC, TXT
                  </span>
                </div>
              </label>

              {files.length > 0 && (
                <ul className="file-list">
                  {files.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>

            <button type="submit" className="primary-btn">
              Save Project
            </button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AddProject;
