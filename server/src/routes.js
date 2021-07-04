const express = require('express')
const route = express.Router()
const multer = require('multer')
const multerConfig = require('./config/ multer');
const upload = multer({storage: multerConfig})

const UserControllers = require('./controllers/userControllers')
const TripControllers = require('./controllers/tripControllers')
const authEmailMiddleware = require('./middlewares/authEmail')
const PaymentControllers = require('./controllers/paymentsControllers');
const authMiddleware = require('./middlewares/auth')

    


route.get('/trip', TripControllers.readTrips)
route.get('/trip/:id', TripControllers.readTrip)
route.get('/trip/:id/:date', TripControllers.availabilityTrips)

route.post('/user', UserControllers.createUser)

route.post('/user/auth', UserControllers.authenticateUser)
route.post('/user/auth/email', UserControllers.authenticateEmail)
route.post('/auth', authMiddleware)

route.post('/trip',upload.any(), TripControllers.createTrip)
route.put('/trip/:id', upload.any(),TripControllers.updateTrip)
route.delete('/trip/:id', TripControllers.deleteTrip)


route.post('/payment', PaymentControllers.pay)
route.get('/payment/:id', PaymentControllers.readTripsPayedUser)
route.get('/payment', PaymentControllers.readAllTripsPayed)
route.post('/payment-sheet', PaymentControllers.paymentSheet)

module.exports = route


