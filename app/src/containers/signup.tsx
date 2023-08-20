import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, registerWithEmailAndPassword } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "../components/wrapper";
type Props = {};

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const Signup = (props: Props) => {
  const navigate = useNavigate();

  const [user, loading, error] = useAuthState(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  //   const auth = getAuth();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await registerWithEmailAndPassword(
      data.firstName + " " + data.lastName,
      data.email,
      data.password
    );
    reset();
  };

  useEffect(() => {
    if (loading) return;
    // if (user) history.replace("/dashboard");
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [user, loading]);

  return (
    <Wrapper>
      <h2 className="text-xl font-bold w-full text-center pb-4">Sign Up</h2>
      <hr />
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2">
          <div className="form-control">
            <label className="label">Firstname</label>
            <input
              className="input input-bordered w-full max-w-sm"
              placeholder="John"
              {...register("firstName", { required: true })}
            />
          </div>
          <div className="form-control">
            <label className="label">Lastname</label>
            <input
              className="input input-bordered w-full max-w-sm"
              placeholder="Doe"
              {...register("lastName", { required: true })}
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">Email</label>
          <input
            className="input input-bordered w-full max-w-sm"
            placeholder="jondoe@gmail.com"
            {...register("email", { required: true })}
          />
        </div>

        <div className="form-control">
          <label className="label">Password</label>
          <input
            className="input input-bordered w-full max-w-sm"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
        </div>

        <div className="form-control py-4">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      <p className="text-sm text-right w-full">
        Already a user?{" "}
        <Link to="/" className="text-blue-950 cursor-pointer underline">
          Sign Up
        </Link>
      </p>
    </Wrapper>
  );
};

export default Signup;
