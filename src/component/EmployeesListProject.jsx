import { useEffect, useState } from "react";

function EmployeesListProject() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "male",
    phoneNumber: "",
    contactMethods: [],
    maritalStatus: "single",
    immediateJoiner: "Yes",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees"));
    if (storedEmployees) {
      setEmployees(storedEmployees);
    }
  }, []);

  useEffect(() => {
    if (employees.length > 0) {
      localStorage.setItem("employees", JSON.stringify(employees));
    }
  }, [employees]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const updatedContactMethods = checked
        ? [...formData.contactMethods, value]
        : formData.contactMethods.filter((method) => method !== value);
      setFormData({
        ...formData,
        contactMethods: updatedContactMethods,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedEmployees = [...employees];
      updatedEmployees[editIndex] = formData;
      setEmployees(updatedEmployees);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setEmployees([...employees, formData]);
    }
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "male",
      phoneNumber: "",
      contactMethods: [],
      maritalStatus: "single",
      immediateJoiner: "Yes",
    });
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setFormData(employees[index]);
  };

  const handleDelete = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    setEmployees(updatedEmployees);
    // Remove corresponding item from local storage
    const storedEmployees = JSON.parse(localStorage.getItem("employees"));
    if (storedEmployees) {
      storedEmployees.splice(index, 1);
      localStorage.setItem("employees", JSON.stringify(storedEmployees));
    }
  };
  return (
    <div className="main">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="main-user-info">
            <div className="input-box">
              First Name:
              <input
                type="text"
                name="firstName"
                placeholder="FirstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              Middle Name:
              <input
                type="text"
                name="middleName"
                placeholder="MiddleName"
                value={formData.middleName}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              Last Name:
              <input
                type="text"
                name="lastName"
                placeholder="LastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              Phone Number:
              <input
                type="number"
                name="phoneNumber"
                placeholder="+91"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <label>
            Marital Status:
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
            >
              <option value="married">Married</option>
              <option value="single">Single</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </label>
          <div className="gender-details-box">
            <span className="gender-title">Gender:</span>
            <div className="gender-category">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              <label htmlFor="female">Female</label>
              <input
                type="radio"
                name="gender"
                value="others"
                checked={formData.gender === "others"}
                onChange={handleChange}
              />
              <label htmlFor="other">Other</label>
            </div>
            <span className="gender-title"> Mode of contact:</span>
            <div className="gender-category">
              <input
                type="checkbox"
                name="contactMethods"
                value="email"
                checked={formData.contactMethods.includes("email")}
                onChange={handleChange}
              />
              <label htmlFor="other">Email</label>
              <input
                type="checkbox"
                name="contactMethods"
                value="phone"
                checked={formData.contactMethods.includes("phone")}
                onChange={handleChange}
              />
              <label htmlFor="phone">Phone</label>
            </div>
            <span className="gender-title">Immediate joiner:</span>
            <div className="gender-category">
              <input
                type="radio"
                name="immediateJoiner"
                value="Yes"
                checked={formData.immediateJoiner === "Yes"}
                onChange={handleChange}
              />
              <label htmlFor="password">Yes</label>
              <input
                type="radio"
                name="immediateJoiner"
                value="No"
                checked={formData.immediateJoiner === "No"}
                onChange={handleChange}
              />
              <label htmlFor="password">No</label>
            </div>
          </div>
          <button type="submit" className="submit-btn">
            {isEditing ? "Update" : "Submit"}
          </button>
          <button
            type="button"
            className="clear-btn"
            onClick={() =>
              setFormData({
                firstName: "",
                middleName: "",
                lastName: "",
                gender: "male",
                phoneNumber: "",
                contactMethods: [],
                maritalStatus: "single",
                immediateJoiner: "Yes",
              })
            }
          >
            Clear
          </button>
        </form>
      </div>
      <div className="records table-responsive">
        <div>
          <table width="100%">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Phone Number</th>
                <th>Contact Methods</th>
                <th>Marital Status</th>
                <th>Immediate Joiner</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.firstName}</td>
                  <td>{employee.middleName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.phoneNumber}</td>
                  <td>{employee.contactMethods.join(", ")}</td>
                  <td>{employee.maritalStatus}</td>
                  <td>{employee.immediateJoiner}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeesListProject;
