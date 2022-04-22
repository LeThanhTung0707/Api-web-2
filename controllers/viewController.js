const { response } = require('express');
const Tour = require('./../models/tourModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const appError = require('./../utils/appError');
exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All tours',
    tours
  });
});
exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review raing user'
  });
  if (!tour) return next(new appError('No tour with that name !', 404));
  res.status(200).render('tour', {
    title: '1 tour',
    tour
  });
});

exports.getSignUp = (req, res, next) => {
  res.status(200).render('signup', {
    title: 'Sign Up'
  });
};

exports.getLogin = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Login'
  });
});
exports.getAccount = catchAsync(async (req, res, next) => {
  res.status(200).render('account', {
    title: 'Account',
    user: req.user
  });
});

exports.submitUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );
  res.status(200).render('account', {
    title: 'Account',
    user: updatedUser
  });
});
