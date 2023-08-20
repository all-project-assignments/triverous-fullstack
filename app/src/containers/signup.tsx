import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, registerWithEmailAndPassword } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>firstname</label>
      <input
        placeholder="John"
        {...register("firstName", { required: true })}
      />
      <label>lastname</label>
      <input placeholder="Doe" {...register("lastName", { required: true })} />
      <label>Email</label>
      <input
        placeholder="jondoe@gmail.com"
        {...register("email", { required: true })}
      />

      <label>Password</label>
      <input type="password" {...register("password", { required: true })} />

      {errors.password && <span>This field is required</span>}
      <input type="submit" />
    </form>
  );
};

export default Signup;
