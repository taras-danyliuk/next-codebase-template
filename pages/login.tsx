import { useForm } from "react-hook-form";

import { useAuth, withPublicRoute } from "../helpers/authContext";
import styles from "../assets/styles/pages/login.module.scss";


type FormValues = {
  email: string;
  password: string;
}


function Login() {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: "eve.holt@reqres.in", password: "cityslicka" }
  });
  const { login } = useAuth();
  
  const onSubmit = (values: FormValues) => {
    console.log(values, "values");
    login(values.email, values.password);
  }
  
  return (
    <div className="page-container">
      <h1 className="page-title">Login</h1>
      
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input name="email" ref={register}/>
        <input name="password" type="password" ref={register}/>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default withPublicRoute(Login);
