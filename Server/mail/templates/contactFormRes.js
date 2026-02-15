const contactUsEmail = (email, firstname, lastname, message, phoneNo, countrycode) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Contact Request Received</title>
    <style>
      body { font-family: Arial, sans-serif; color: #333; line-height: 1.5; }
      .container { max-width: 640px; margin: 0 auto; padding: 20px; }
      .card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; }
      .label { font-weight: 700; }
      .muted { color: #6b7280; font-size: 14px; }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Thanks for contacting CuraConnect</h2>
      <p>Hi ${firstname || "User"}, we received your message and will get back to you soon.</p>

      <div class="card">
        <p><span class="label">Name:</span> ${firstname || ""} ${lastname || ""}</p>
        <p><span class="label">Email:</span> ${email || ""}</p>
        <p><span class="label">Phone:</span> ${(countrycode || "") + " " + (phoneNo || "")}</p>
        <p><span class="label">Message:</span></p>
        <p>${message || ""}</p>
      </div>

      <p class="muted">This is an automated acknowledgement email.</p>
    </div>
  </body>
</html>`;
};

module.exports = { contactUsEmail };
