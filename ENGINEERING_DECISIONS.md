# Engineering Decisions

## 1. Why did you choose your project architecture?

I followed a layered architecture with **Routes → Controllers → Services → Models**. This keeps the code organized by separating routing, request handling, business logic, and database operations. It also makes the project easier to maintain and extend.

---

## 2. How did you design your MongoDB schema?

The application uses separate collections for **Users, Doctor Profiles, Patients, and Appointments**.

- Users store authentication and roles.
- Doctor-specific details are stored in a separate Doctor collection.
- Patients are stored independently and referenced in appointments.
- Appointments reference both the doctor and patient using ObjectIds to avoid data duplication.

---

## 3. How did you prevent double booking?

Before creating an appointment, available slots are generated based on the doctor's schedule and existing bookings. In addition, a **unique compound index** on `(doctor, appointmentDate, slot)` ensures that the same slot cannot be booked twice, even if two requests arrive at the same time.

---

## 4. Which database indexes did you create and why?

- `email` (unique) - Prevent duplicate user accounts and speed up login.
- `patientId` (unique) - Quickly find patients using their patient ID.
- `(doctor, appointmentDate, slot)` (unique compound index) - Prevent duplicate appointments for the same doctor and time slot.

---

## 5. What security measures did you implement?

- Passwords are hashed using **bcrypt**.
- Authentication is handled using **JWT**.
- Role-based authorization is used to restrict access to APIs.
- Request validation is implemented using **express-validator**.

---

## 6. What performance optimizations did you apply?

- Database indexes were added for frequently searched fields.
- `populate()` is used only where necessary.
- Only required fields are selected in queries where possible.
- Appointment slots are generated dynamically instead of storing them in the database.

---

## 7. If this application needed to support millions of appointments, what architectural changes would you make?

- Add Redis caching for frequently accessed data like doctor schedules.
- Move appointment reminders and notifications to background jobs.
- Use database sharding or partitioning for appointments.
- Deploy the application as multiple scalable backend instances behind a load balancer.
- Add monitoring and centralized logging for better observability.
