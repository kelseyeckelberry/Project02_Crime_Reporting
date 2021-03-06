// Requiring path to so we can use relative routes to our HTML files
const path = require('path');
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../../config/middleware/isAuthenticated');
const db = require('../../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    let user = '';
    if (req.user) {
      user = req.user;
    }
    const searchParams = {
      include: [db.User]
    };
    const crimeData = await db.Crime.findAll(searchParams);
    const crime = crimeData.map((crime) => crime.dataValues);
    res.render('homepage', {
      user,
      crime,
      GOOGLE_PLACES_API1: process.env.GOOGLE_PLACES_API1,
      GOOGLE_PLACES_API2: process.env.GOOGLE_PLACES_API2,
      style: 'homepage.css',
      javascript: 'homepage.js'
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error);
  }

  // // If the user already has an account send them to the members page
  // if (req.user) {
  //   res.redirect('/members');
  // }

  // res.sendFile(path.join(__dirname, '../../public/signup.html'));
});

router.get('/crimes', async (req, res) => {
  try {
    let user = '';
    if (req.user) {
      user = req.user;
    }
    const searchParams = {
      include: [db.User]
    };
    const crimeData = await db.Crime.findAll(searchParams);
    const crime = crimeData.map((crime) => crime.dataValues);
    res.render('crimes', {
      user,
      crime,
      GOOGLE_PLACES_API1: process.env.GOOGLE_PLACES_API1,
      GOOGLE_PLACES_API2: process.env.GOOGLE_PLACES_API2,
      style: 'crimes.css',
      javascript: 'crimes.js'
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error);
  }
});
// Routes the user to report a crime
router.get('/report', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/report.html'));
});

// Routes user to login page
router.get('/login', (req, res) => {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect('/');
  }

  res.sendFile(path.join(__dirname, '../../public/login.html'));
});

// Route for logging user out
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
router.get('/signup', (req, res) => {
  // If the user already has an account send them to the root page
  if (req.user) {
    res.redirect('/');
  }

  res.sendFile(path.join(__dirname, '../../public/signup.html'));
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get('/members', isAuthenticated, async (req, res) => {
  try {
    const reqUser = req.user;
    const searchParams = { include: [db.User], where: { UserId: reqUser.id } };
    const crimeData = await db.Crime.findAll(searchParams);
    const crime = crimeData.map((crime) => crime.dataValues);
    console.log(crime);
    if (crime[0]) {
      crime.forEach((crime) => (crime.ofUser = true));
    }
    res.render('members', {
      user: reqUser,
      crime,
      GOOGLE_PLACES_API1: process.env.GOOGLE_PLACES_API1,
      GOOGLE_PLACES_API2: process.env.GOOGLE_PLACES_API2,
      style: 'members.css',
      javascript: 'members.js'
    });
  } catch (error) {
    if (!req.user) {
      res.status(400);
      res.send('No user information was sent!');
    }
    console.log(error);
    res.status(500);
    res.send(error);
  }
});

module.exports = router;
