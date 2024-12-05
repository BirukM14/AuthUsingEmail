// emailTemplate.js
export const generateEmailTemplate = (verificationToken) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f9;
              }
              .container {
                  max-width: 600px;
                  margin: 50px auto;
                  background: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .header {
                  text-align: center;
                  color: #333;
              }
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  margin-top: 20px;
                  font-size: 16px;
                  font-weight: bold;
                  text-decoration: none;
                  color: #ffffff;
                  background-color: #007bff;
                  border-radius: 5px;
              }
              .button:hover {
                  background-color: #0056b3;
              }
              .footer {
                  margin-top: 30px;
                  text-align: center;
                  font-size: 12px;
                  color: #888;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <button class="header">Verify Your Email</button>
              <p>Hello,</p>
              <p>Thank you for signing up! Your verification code is:</p>
              <h2 style="text-align: center; color: #007bff;">${verificationToken}</h2>
              <p>Please enter this code on the verification page to complete your registration. This code will expire in 15 minutes for security reasons.</p>
              <p>If you did not create an account with us, please ignore this email.</p>
              <div class="footer">
                  <p>&copy; ${new Date().getFullYear()} BIG JA PLC. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `;
};

// emailTemplate.js
export const PASSWORD_RESET_REQUEST_TEMPLATE =
    `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f9;
              }
              .container {
                  max-width: 600px;
                  margin: 50px auto;
                  background: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .header {
                  text-align: center;
                  color: #333;
              }
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  margin-top: 20px;
                  font-size: 16px;
                  font-weight: bold;
                  text-decoration: none;
                  color: #ffffff;
                  background-color: #007bff;
                  border-radius: 5px;
              }
              .button:hover {
                  background-color: #0056b3;
              }
              .footer {
                  margin-top: 30px;
                  text-align: center;
                  font-size: 12px;
                  color: #888;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <button class="header">reset Your password</button>
              <p>Hello,</p>
              <p>we BIG JA received a request to reset the password</p>
               <div style = "text-align:conter; margin : 30px 0;">
               <a href = "{resetURL}" style ="background-color:#4caf50;
              
              <div class="footer">
                  <p>&copy; ${new Date().getFullYear()} BIG JA PLC. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `;




