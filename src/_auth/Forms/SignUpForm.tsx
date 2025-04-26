import * as z from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupValidation } from "../../validation";
import { createUserAccount } from "../../lib/appwrite/api";



const SignupForm = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
    try {
      const newUser = await createUserAccount({
        email: user.email,
        password: user.password,
        name: user.name,
        username: user.username,
      });

      if (!newUser) throw new Error("User creation failed");

      console.log("User created:", user);
      navigate("/");

    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: "420px" }}>
        <div className="text-center mb-4">
          {/* <img src="/assets/images/logo.svg" alt="logo" style={{ width: "100px" }} /> */}
          <h1>Chic & Sleek</h1>
          <h2 className="fw-bold mt-3">Create a new account</h2>
          <p className="text-muted"> please enter your details</p>
        </div>

        <form onSubmit={form.handleSubmit(handleSignup)} className="needs-validation" noValidate>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className={`form-control ${form.formState.errors.name ? "is-invalid" : ""}`}
              {...form.register("name")}
            />
            <div className="invalid-feedback">
              {form.formState.errors.name?.message}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className={`form-control ${form.formState.errors.username ? "is-invalid" : ""}`}
              {...form.register("username")}
            />
            <div className="invalid-feedback">
              {form.formState.errors.username?.message}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${form.formState.errors.email ? "is-invalid" : ""}`}
              {...form.register("email")}
            />
            <div className="invalid-feedback">
              {form.formState.errors.email?.message}
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${form.formState.errors.password ? "is-invalid" : ""}`}
              {...form.register("password")}
            />
            <div className="invalid-feedback">
              {form.formState.errors.password?.message}
            </div>
          </div>

          <button type="submit" className="btn  w-100 mb-3"   style={{ backgroundColor: "#9E99FE", color: "white" }}>
            Sign up
          </button>

          <p className="text-center text-muted">
            Already have an account?
            <Link to="/sign-in" className="ms-1 text-primary text-decoration-none"  style={{  color: "#9E99FE" }}  >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
