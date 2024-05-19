import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginValidation } from "../../constants/YupValidation"
import axios from "axios"
import { useSession } from "@/contexts/AuthContext"
import { router } from "expo-router"

// Define the schema for the form

type LoginInputs = {
  username: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }, setError
  } = useForm<LoginInputs>({
    resolver: yupResolver(loginValidation),
  })

  const { signIn, isLoading } = useSession();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try{
      await signIn(data.username, data.password);
      router.replace('/');
    } catch (error) {
      setError('username', {
        type: 'manual',
        message: 'Invalid credentials'
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Username</label>
      <input {...register("username")} />
      {errors.username && <span>{errors.username.message}</span>}

      <input {...register("password")} />
      {errors.password && <span>{errors.password.message}</span>}

      <input type="submit" value={isLoading ? 'Signing in...' : 'Sign In'} disabled={isLoading} />
    </form>
  )
}