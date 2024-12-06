import { mailtrapclient, sender } from "./mailtrapconfig.js";
import { generateEmailTemplate, PASSWORD_RESET_REQUEST_TEMPLATE } from "./emailtemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email:"biggiemerawi14@gmail.com"  }];
    try {
        const emailContent = generateEmailTemplate(verificationToken);

        const response = await mailtrapclient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: emailContent,
            category: "Email verification",
        });

        console.log("Email sent successfully", response);

    } catch (error) {
        console.log("Error sending verification email", error);
        throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendwalcomeEmail = async (email, user) => {
    const recipients = [{ email:"biggiemerawi14@gmail.com" }];
    try {
        const response = await mailtrapclient.send({
            from: sender,
            to: recipients,
            template_uuid: "fbb78430-c25f-4c28-bc07-c6e8eb3e6f12",
            template_variables: {
                company_info_name: "BIG JA COMPANY",
            },
        });

        console.log("Welcome email sent", response);

    } catch (error) {
        console.error("Error sending welcome email", error);
        throw new Error(`Error sending welcome email: ${error}`);
    }
};

export const sendpasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapclient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category:"password Reset"
        });

        console.log("Password reset email sent successfully:", response);
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw error; // Re-throw the error if necessary
    }
};

export const sendResetSuccessEmail = async (req,res)=>{
    const recipient = [{email}];

    try{
        const response = await mailtrapclient.send({
            from :sender,
            to: recipient,
            subject:"password reset successful",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:"password reset."
        } );
        console.log("passwordd reset email sent successfully",response)
    }catch(error){
        res.status("eror sending the reset email",error)
    }
}

