const generateEmailTemplate = (type, data) => {
    switch (type) {
        case 'signup':
            return `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="background-color: #f2f2f2; padding: 10px;">Welcome to RUNO </h2>
                    <p>Hi ${data.name},</p>
                    <p>Thank you for signing up. Please use the following verification code to verify your email address:</p>
                    <h3 style="color: #4CAF50;">${data.token}</h3>
                    <p>If you did not sign up for this account, please ignore this email.</p>
                    <p>Best regards,</p>
                    <p>RUNO</p>
                    <hr />
                    <footer style="text-align: center; font-size: 12px; color: #aaa;">
                        <p>&copy; ${new Date().getFullYear()} RUNO. All rights reserved.</p>
                        <p>Runo developers, Lahore, Punjab, Pakistan</p>
                    </footer>
                </div>
            `;
        case 'Welcome':
            return `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="background-color: #f2f2f2; padding: 10px;">Welcome to RUNO </h2>
                    <p>Hi ${data.name},</p>
                    <p>Thank you for signing up. Your account has been successfully verified against email ${data.email}</p>
                    <p>We are excited to have you on board.</p>
                    <p>Best regards,</p>
                    <p>RUNO</p>
                    <hr />
                    <footer style="text-align: center; font-size: 12px; color: #aaa;">
                        <p>&copy; ${new Date().getFullYear()} RUNO. All rights reserved.</p>
                        <p>Runo developers, Lahore, Punjab, Pakistan</p>
                    </footer>
                </div>
            `;
            case 'Reset':
                return `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                        <h2 style="background-color: #f2f2f2; padding: 10px;">Password reset request (RUNO)</h2>
                        <p>Hi ${data.name},</p>
                        <p>Please click the following link to reset your password.</p>
                        <a href="${data.url}" style="display: inline-block; text-align: center; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
                        <p>If you did not make a reset password request for this account, please ignore this email.</p>
                        <p>Best regards,</p>
                        <p>RUNO</p>
                        <hr />
                        <footer style="text-align: center; font-size: 12px; color: #aaa;">
                            <p>&copy; ${new Date().getFullYear()} RUNO. All rights reserved.</p>
                            <p>Runo developers, Lahore, Punjab, Pakistan</p>
                        </footer>
                    </div>
                `;
        case "Reset Success":
            return `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="background-color: #f2f2f2; padding: 10px;">Password reset Success(RUNO)</h2>
                <p>Hi ${data.name},</p>
                <p>Your password has been updated successfully</p>
               
                <p>If you did not make this request for this account, please ignore this email.</p>
                <p>Best regards,</p>
                <p>RUNO</p>
                <hr />
                <footer style="text-align: center; font-size: 12px; color: #aaa;">
                    <p>&copy; ${new Date().getFullYear()} RUNO. All rights reserved.</p>
                    <p>Runo developers, Lahore, Punjab, Pakistan</p>
                </footer>
            </div>
        `;

            
        default:
            return '<div>Hello</div>';
    }
};

export default generateEmailTemplate;

