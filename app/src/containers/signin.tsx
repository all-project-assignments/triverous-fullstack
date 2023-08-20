import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, logInWithEmailAndPassword } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Wrapper from "../components/wrapper";

type Props = {};

type Inputs = {
  email: string;
  password: string;
};

const Signin = (props: Props) => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/home");
  }, [user]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    logInWithEmailAndPassword(data.email, data.password)
      .then((userData) => {
        console.log("userData", userData);
        reset();
      })
      .catch((error) => {
        console.log("loginError", error.message);
      });
  };

  // const [email, setEmail] = useState<string>("")
  // const [password, setPassword] = useState<string>("")
  // const [error, setError] = useState<string | null>(null)

  return (
    // <div className="flex h-screen w-screen items-center justify-center bg-slate-800">
      // {/* <div className=" py-8 px-8 bg-slate-300 rounded-md shadow-lg sha shadow-slate-500 "> */}
      <Wrapper>
        <h2 className="text center w-full text-lg font-bold">Sign In</h2>
        <hr className="bg-slate-950" />
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              className="input input-bordered w-full max-w-sm"
              placeholder="Enter your email address"
              {...register("email", { required: true })}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              placeholder="Enter your password"
              className="input input-bordered w-full max-w-sm"
              type="password"
              {...register("password", { required: true })}
            />
          </div>

          {errors.password && <span>This field is required</span>}
          <div className="form-control py-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        <p className="text-sm text-right w-full">
          Not a user?{" "}
          <Link to="/signup" className="text-blue-950 cursor-pointer underline">
            Sign Up
          </Link>
        </p>
      </Wrapper>
    //   </div>
    // </div>
  );
};

export default Signin;
