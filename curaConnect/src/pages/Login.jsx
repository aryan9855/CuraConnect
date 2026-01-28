import loginImg from "../assets/Images/loginImg.jpg";
import Template from "../components/core/Auth/Template"

function Login() {
  return (
    <Template
      title="Welcome Back to CuraConnect"
      description1="Access trusted healthcare knowledge and manage your care with confidence."
      description2="Your health journey, simplified."
      image={loginImg}
      formType="login"
    />
  )
}

export default Login
