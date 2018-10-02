/* eslint-disable */
const express = require('express');
const { RouterFactory } = require('express-router-factory');
const { getSeekers } = require('../middleware/getters');
const Seekers = require('../models/Seeker/Seeker.model');
const passport = require("passport");
const async = require("async");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const router = express.Router();

router.post('/', function(req, res, next) {
  console.log(req.body)
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      Seekers.findOne({ email: req.body.email }, function(err, Seekers) {
        console.log(req.body)
        if (!Seekers) {
          console.log("boo")
          res
            .status(204)
            .json({ 'error': 'No account with that email address exists.' });
          return;
        }

        Seekers.resetPasswordToken = token;
        Seekers.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        Seekers.save(function(err) {
          done(err, token, Seekers);
        });
      });
    },
    function(token, Seekers, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: process.env.EMAIL,
          pass: process.env.GP
        }
      });
      var mailOptions = {
        to: Seekers.email,
        from: 'noreply@meetdev.com',
        subject: 'Meet Dev Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent');
        res
          .status(200)
          .json({ 'success': 'An e-mail has been sent to ' + Seekers.email + ' with further instructions.'});
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res
      .status(200)
      .json({ 'error': 'something went horribly wrong! we are working get things back up!'});
  });
});

router.get('/reset/:token', function(req, res) {
  Seekers.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, Seekers) {
    if (!Seekers) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('reset', {token: req.params.token});
  });
});


  module.exports = router;