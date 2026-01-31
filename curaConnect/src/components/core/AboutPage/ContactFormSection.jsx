import React from "react"
import ContactUsForm from "../../ContactPage/ContactUsForm"

const ContactFormSection = () => {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 text-center">
      
      {/* ================= HEADING ================= */}
      <h1
        className="
          text-3xl md:text-5xl font-bold
          bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500
          bg-clip-text text-transparent
        "
      >
        Get in Touch
      </h1>

      {/* ================= SUBTEXT ================= */}
      <p
        className="
          mt-4 max-w-2xl mx-auto
          text-base md:text-lg
          text-richblack-300
          leading-relaxed
        "
      >
        We’d love to hear from you.  
        <span className="text-richblack-200">
          {" "}Please fill out the form below and our team will reach out shortly.
        </span>
      </p>

      {/* ================= FORM ================= */}
      <div className="mt-14">
        <ContactUsForm />
      </div>
    </section>
  )
}

export default ContactFormSection
