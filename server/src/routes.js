const express = require('express')
const route = express.Router()
const multer = require('multer')
const multerConfig = require('./config/ multer');
const upload = multer({storage: multerConfig})

const UserControllers = require('./controllers/userControllers/index')
const TripControllers = require('./controllers/tripControllers')
const AuthenticateControllers = require('./controllers/userControllers/auth')
const SchedulesTrip = require('./middlewares/schedulesTrip')
const userTripControllers = require('./controllers/userTripControllers')
const AuthToken = require('./middlewares/AuthToken')
const AuthTokenEmail = require('./middlewares/AuthTokenEmail')
const PaymentControllers = require('./controllers/paymentsControllers');
const CreateSessionStripe = require('./middlewares/stripe')


    
//Trips
route.post('/trip',upload.any(), TripControllers.createTrip)
route.get('/trip', TripControllers.readTrips)
route.get('/trip/:id', TripControllers.readTrip)
route.get('/trip/:id/:date', SchedulesTrip)
route.put('/trip/:id', upload.any(),TripControllers.updateTrip)
route.delete('/trip/:id', TripControllers.deleteTrip)

//User
route.post('/user', UserControllers.createUser)

route.get('/user/:id', UserControllers.readUser)
route.put('/user/:id', UserControllers.updateUser)

//Authenticate

route.post('/user/auth', AuthenticateControllers.authenticateUser)
route.post('/user/auth/email', AuthenticateControllers.authenticateEmail)

//User trip

route.post('/trip-user/', userTripControllers.createUserTrip)
route.get('/trip-user/:idUser', userTripControllers.readTripsUser)
route.get('/trip-user/', userTripControllers.readTripsUsers)


route.post('/verify-token-user', AuthToken)
route.post('/verify-token-email', AuthTokenEmail)

// Payment

route.post('/payment', PaymentControllers.pay)
route.get('/payment/:id', PaymentControllers.readTripsPayedUser)
route.get('/payment', PaymentControllers.readAllTripsPayed)

route.post('/payment-sheet', CreateSessionStripe)

module.exports = route


