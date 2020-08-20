/*
 * This Controller includes the Account Router Handlers and Business Logic
 * Here is the Account signup Controller
 * Here is the Account Login Controller
 * Here is the Account changePassword Controller
 * Here is the Account EditProfile Controller
 * Here is the Account Logout Controller
 * Here is the Account RemoveUser Controller
*/

// Import Packages
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Import Models
const { User } = require('../models/Account');
const Review = require('../models/Review');
const Course = require('../models/Course');
const Book = require('../models/Book');

// Import Variables
const locations = ['Ismailia', 'Giza', 'Port Said'];
const genders = ['Male', 'Female'];

// Import Functions
const sendResponse = require('../Utils/sendResponse');

/*
 * All Account Router Handlers
*/

// Account signup Controller
const Signup = async (req, res, next) => {
    try {

        const { fullname, email, password, confirmPassword, phone, location, gender } = req.body;

        if (!fullname || fullname.length < 6 || !email || !email.match(/^\w+([-+.]\w+)*@((yahoo|gmail)\.com)$/) || !password || password.length < 6 || password.length != confirmPassword.length || !phone || !(phone.length == 11) || !location || !locations.includes(location) || !genders.includes(gender)) {
            return sendResponse(res, 400, 'One of conditions In IF Statement is satisfied', 'Make sure that the sent data is correct');
        }

        // The User is found in the User Collection
        let founded = await User.findOne({ email: email });
        if (founded) {
            return sendResponse(res, 409, 'There is an account with this email in the User Collection', 'The Email is already exist');
        }

        // The User is not found in the User Collection
        let user = await new User({
            fullname: req.body.fullname,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            phone: req.body.phone,
            location: req.body.location,
            gender: req.body.gender,
            role: 'User'
        }).save();


        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'AbdulrahmanFawzy999@gmail.com',
                pass: 'sxgqljelmksfsuuo'
            }
        });

        let mailOptions = {
            from: 'Centry',
            to: `${user.email}`,
            subject: 'Email Verification',
            html: `
        <h3> How are you ${ user.fullname}? We hope that you are good </h3>
        <p>
        <span> To verify your email follow this link:  </span>
        <a href="http://localhost:3000/profile/verifyEmail/${ user._id}" target="_blank"> Verify now </a>
       </p>

        `
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return sendResponse(res, 201, 'The Account has been added to User Collection', 'Account has been created Successfully', user);
    } catch (err) {
        console.log(`Error Messageg : ${err.message}`);
        return sendResponse(res, 500, err.message, 'Something went wrong');
    }

}

// Account Login Controller
const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return sendResponse(res, 400, 'One of conditions In IF Statement is satisfied', 'Make sure that the sent data is correct');
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return sendResponse(res, 401, 'Authentication is failed', 'The Email is not exist');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return sendResponse(res, 401, 'Authentication is failed', 'Password is wrong');
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: "24h" });
        const result = { token: token };
        return sendResponse(res, 200, 'Authentication is success', 'Login is success', result);
    } catch (err) {
        return sendResponse(res, 500, err.message, 'Something went wrong');
    }
}


// Account editProfile Controller
const editProfile = async (req, res, next) => {
    try {
        // Get Data from Body
        const { fullname, email, bio, location, gender, phone } = req.body;

        // Make Validations to the sent data with body
        if (!fullname || fullname.length < 6 || !email || !email.match(/^\w+([-+.]\w+)*@((yahoo|gmail)\.com)$/) || bio.length < 25 || !phone || !(phone.length == 11) || !locations.includes(location) || !genders.includes(gender)) {
            return sendResponse(res, 400, 'One of conditions In IF Statement is satisfied', 'Make sure that the sent data is correct')
        }

        // Want to Edit Email. The Question here Does someone have the edittd email?
        let anotherUser = await User.findOne({ _id: { $ne: req.user._id }, email: email })
        if (anotherUser) {
            return sendResponse(res, 409, 'The Email is already exist', 'The Email is already exist')
        }

        // Get Current Email to compare with the editted email
        let currentEmail = ' ';
        let user = await User.findById({ _id: req.user._id })
        currentEmail = user.email;

        // Update the profile data
        let updated = await User.findByIdAndUpdate({ _id: req.user._id }, { fullname: fullname, email: email, bio: bio, location: location, gender: gender, phone: phone }, { new: true });

        // Comparision between the current email and new email if they are not the same, the user must verify the new email to prove that he's the owner
        if (currentEmail !== updated.email) {
            await User.findByIdAndUpdate({ _id: req.user._id }, { accountVerified: false })
        }

        // Finally, the profile data is updated successfully
        return sendResponse(res, 200, 'Profile Data is Updated Successfully', 'Profile Data is Updated Successfully')

    } catch (err) {
        return sendResponse(res, 500, err.message, 'Something went wrong');

    }
}

// Account changePassword Controller
const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        if (!oldPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword) {
            return sendResponse(res, 400, 'Validation Error', 'Make Sure that the sent data is valid');
        }

        const user = await User.findOne({ _id: req.user._id });

        let flag = await bcrypt.compare(req.body.oldPassword, user.password);

        if (!flag) {
            return sendResponse(res, 400, 'Validation Error', 'Password is wrong');
        } else {
            await User.findByIdAndUpdate({ _id: user._id }, { password: await bcrypt.hash(newPassword, 10) })
            return sendResponse(res, 200, 'Password has been changed successfully', 'Password has been changed successfully');
        }

    } catch (err) {
        return sendResponse(res, 500, err.message, 'Something went wrong');
    }
}

// Account Logout Controller
const Logout = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user._id });

        await User.findByIdAndUpdate({ _id: user._id }, { accountActive: false })

        return sendResponse(res, 200, 'Logout now', 'Account has been logged out now');

    } catch (err) {
        return sendResponse(res, 500, err.message, 'Something went wrong');

    }
}

// Account RemoveUser Controller
const RemoveUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user._id });

        var course, bookedCourse;

        if (user.role === "Instructor") {
            course = await Course.findOne({ instructorID: user._id });
        }

        if (user.role === "User") {
            bookedCourse = await Book.findOne({ userID: user._id });
        }

        if (course || bookedCourse) {
            return sendResponse(res, 400, 'course or bookedCourse is true', 'You cannot remove your account because you have course/courses');
        }
        await Review.deleteMany({ userID: user._id });

        await User.findByIdAndRemove({ _id: user._id });

        return sendResponse(res, 200, 'Account has been removed successfully from User Collection', 'Account has been removed successfully');
    } catch (err) {
        return sendResponse(res, 500, err.message, 'Something went wrong');

    }
}

// Export all Account Router Handlers
module.exports = {
    Signup,
    Login,
    editProfile,
    changePassword,
    Logout,
    RemoveUser
}
