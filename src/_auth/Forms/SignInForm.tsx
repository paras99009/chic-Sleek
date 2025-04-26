import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { Loader } from "lucide-react";
import { useUserContext } from "../../context/AuthContext";
import { SigninValidation } from "../../validation";
import { signInAccount } from "../../lib/appwrite/api";

const SignInForm = () => {
//   const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    }, 
  });

  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    const session = await signInAccount(user);
    if (!session) {
      console.log({ title: "Login failed. Please try again." });
      return;
    }

    const isLoggedIn = await checkAuthUser();
   
    form.reset();
    navigate("/");
    
    if (isLoggedIn) {
      console.log({ title: "Login successful" });

    } else {
        console.log({ title: "Login failed. Please try again. from checkauth" });
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ maxWidth: "420px", marginTop: "50px" }}>
      <h1>Chic & Sleek</h1>

      <h2 className="fw-bold text-center">Log in to your account</h2>
      <p className="text-muted text-center mb-4">
        Welcome back! Please enter your details.
      </p>

      <form onSubmit={form.handleSubmit(handleSignin)} className="w-100">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="text"
            className={`form-control ${form.formState.errors.email ? "is-invalid" : ""}`}
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <div className="invalid-feedback">{form.formState.errors.email.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${form.formState.errors.password ? "is-invalid" : ""}`}
            {...form.register("password")}
          />
          {form.formState.errors.password && (
            <div className="invalid-feedback">{form.formState.errors.password.message}</div>
          )}
        </div>

        <button type="submit" className="btn  w-100 d-flex justify-content-center align-items-center " style={{ backgroundColor: "#9E99FE", color: "white" }} >
          {isUserLoading ? (
            <>
              <Loader className="me-2 animate-spin" size={20} />
              Loading...
            </>
          ) : (
            "Log in"
          )}
        </button>

        <p className="text-center text-muted mt-3">
          Don’t have an account?
          <Link to="/sign-up" className="ms-1 fw-semibold"   style={{  color: "#9E99FE" }}   >Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;
