import signupImg from "../assets/Images/signupImg.jpg";
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Create your CuraConnect account"
      description1="Get access to trusted healthcare information, expert guidance, and personalized care."
      description2="Your journey to better health starts here."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup
