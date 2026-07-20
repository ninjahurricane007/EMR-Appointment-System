import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { login } from "../services/auth.service";

function Login() {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await login(data);

      localStorage.setItem("token", response.data.accessToken);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      const role = response.data.user.role;

      if (role === "SUPER_ADMIN") {
        navigate("/admin");
      } else if (role === "RECEPTIONIST") {
        navigate("/receptionist");
      } else if (role === "DOCTOR") {
        navigate("/doctor");
      }
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Email</label>
            <input
              {...register("email", {
                required: "Email is required",
              })}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
            />
          </div>

          <button>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
