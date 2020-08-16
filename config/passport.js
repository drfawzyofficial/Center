// const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs');
// const User = require('../models/Acco');
// const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
// const randomstring = require("randomstring");
const nodemailer = require('nodemailer');



// Login with facebook
// passport.use(new FacebookStrategy({
//     clientID: '291027032240919',
//     clientSecret: 'cb70a3d87b5c6d7975b8cc32067c52ff',
//     callbackURL: "/user/auth/facebook",
//     profileFields: ['displayName', 'email'],
//     passReqToCallback: true
// },
//     function (req, accessToken, refreshToken, profile, done) {
//         process.nextTick(function () {
//             User.findOne({ email: profile._json.email }, async (err, user) => {
//                 if (err) {
//                     console.log(err.message); 
//                     return done(null, false, req.flash('error', 'Login Something wrong happened')) 
//                 }
//                 if (user) {
//                     if ((user.fromStatus) === 'reservation') {
//                         return done(null, false, req.flash('error', 'Login This account can login with website'));
//                     } else {
//                         user.accountActive = true; user.save();
//                         return done(null, user);
//                     }
//                 }

//                 else {
//                     let newUser = new User();
//                     let token = randomstring.generate({ length: 64 });
//                     newUser.fullname = profile.displayName;
//                     newUser.phone = 'xxx-Change your phone'
//                     newUser.email = profile._json.email;
//                     newUser.location = "Cairo";
//                     newUser.gender = "Unknown";
//                     newUser.password = await bcrypt.hash(profile._json.email, 10),
//                     newUser.fromStatus = 'facebook';
//                     newUser.accountToken = token;
//                     newUser.role = "User";
//                     newUser.accountActive = true;
//                     newUser.save((err, user) => {
//                         if (err) throw err;
//                         else {
//                             let transporter = nodemailer.createTransport({
//                                 service: 'gmail',
//                                 auth: {
//                                     user: 'AbdulrahmanFawzy999@gmail.com',
//                                     pass: 'sxgqljelmksfsuuo'
//                                 }
//                             });
//                             let mailOptions = {
//                                 from: 'Teacherou',
//                                 to: `${newUser.email}`,
//                                 subject: 'Email Verification',
//                                 html: `
//                                  <h3> How are you ${newUser.fullname}? We hope that you are good </h3>
//                                     <p>
//                                     <span> To verify your email follow this link:  </span>
//                                     <a href="http://localhost:3000/profile/verifyEmail/${newUser.id}" target="_blank"> Verify now </a>
//                                    </p>
//                                 `
//                             };

//                             transporter.sendMail(mailOptions, function (error, info) {
//                                 if (error) {
//                                     console.log(error);
//                                 } else {
//                                     console.log('Email sent: ' + info.response);
//                                 }
//                             });
//                             return done(null, user);
//                         }
//                     })
//                 }
//             });
//         });
//     }
// ));

// passport.serializeUser(function (user, done) {
//     done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//         if (err) done(err);
//         done(null, user);
//     })
// });