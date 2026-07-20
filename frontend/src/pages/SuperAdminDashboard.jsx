import { useEffect, useState } from "react";

import { createDoctor, getDoctors } from "../services/doctor.service";

function SuperAdminDashboard() {
  const [doctors, setDoctors] = useState([]);

  const loadDoctors = async () => {
    try {
      const res = await getDoctors();
      setDoctors(res?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await getDoctors();
      setDoctors(res?.data || []);
    };

    fetchDoctors();
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    workingDays: [],
    morningSession: {
      start: "",
      end: "",
    },
    eveningSession: {
      start: "",
      end: "",
    },
    slotDuration: 15,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("morning.")) {
      setForm({
        ...form,
        morningSession: {
          ...form.morningSession,
          [name.split(".")[1]]: value,
        },
      });
      return;
    }

    if (name.startsWith("evening.")) {
      setForm({
        ...form,
        eveningSession: {
          ...form.eveningSession,
          [name.split(".")[1]]: value,
        },
      });
      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleWorkingDays = (e) => {
    const value = e.target.value;

    if (form.workingDays.includes(value)) {
      setForm({
        ...form,
        workingDays: form.workingDays.filter((d) => d !== value),
      });
    } else {
      setForm({
        ...form,
        workingDays: [...form.workingDays, value],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createDoctor(form);

      alert("Doctor Created");

      setForm({
        name: "",
        email: "",
        password: "",
        department: "",
        workingDays: [],
        morningSession: {
          start: "",
          end: "",
        },
        eveningSession: {
          start: "",
          end: "",
        },
        slotDuration: 15,
      });

      loadDoctors();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>Super Admin Dashboard</h2>;
      <div className="container mt-4">
        <h2>Create Doctor</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            placeholder="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <input
            placeholder="Department"
            name="department"
            value={form.department}
            onChange={handleChange}
          />

          <h6>Working Days</h6>

          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day) => (
            <label key={day}>
              <input
                type="checkbox"
                value={day}
                checked={form.workingDays.includes(day)}
                onChange={handleWorkingDays}
              />{" "}
              {day}
            </label>
          ))}

          <hr />

          <h6>Morning Session</h6>

          <input
            type="time"
            name="morning.start"
            value={form.morningSession.start}
            onChange={handleChange}
          />

          <input
            type="time"
            name="morning.end"
            value={form.morningSession.end}
            onChange={handleChange}
          />

          <h6>Evening Session</h6>

          <input
            type="time"
            name="evening.start"
            value={form.eveningSession.start}
            onChange={handleChange}
          />

          <input
            type="time"
            name="evening.end"
            value={form.eveningSession.end}
            onChange={handleChange}
          />

          <input
            type="number"
            name="slotDuration"
            value={form.slotDuration}
            onChange={handleChange}
          />

          <button>Create Doctor</button>
        </form>
      </div>
      <div>
        <h2>Doctors</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id || doctor.doctorId || doctor.name}>
                <td>{doctor.name || doctor.user?.name || "Unknown"}</td>
                <td>{doctor.department || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
