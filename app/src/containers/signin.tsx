import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, logInWithEmailAndPassword } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

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
    reset
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
        console.log("userData", userData)
        reset();
    })
    .catch((error) => {
        console.log("loginError", error.message)
    })
  };

  // const [email, setEmail] = useState<string>("")
  // const [password, setPassword] = useState<string>("")
  // const [error, setError] = useState<string | null>(null)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input defaultValue="test" {...register("email", { required: true })} />

      <label>Password</label>
      <input type="password" {...register("password", { required: true })} />

      {errors.password && <span>This field is required</span>}
      <input type="submit" />
    </form>
  );
};

export default Signin;
