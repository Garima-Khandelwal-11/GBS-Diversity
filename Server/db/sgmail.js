import sgMail from '@sendgrid/mail';

const configureSendGrid = () => {
    if (!process.env.SENDGRID_API_KEY) {
        console.error("SENDGRID_API_KEY is not defined. Please set it in your .env file.");
        process.exit(1); // Exit the process if the key is missing
    }

    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        console.log("SendGrid API key configured successfully.");
    } catch (error) {
        console.error("Error configuring SendGrid:", error);
        process.exit(1); // Exit the process if there is an issue with setting the API key
    }
};

export default configureSendGrid;
