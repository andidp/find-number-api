'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const { validate } = use('Validator')

Route.get('/', () => {
  return { greeting: 'Find Number API' }
})


Route.group(() => {
  Route.post('/customer/register', 'AuthController.register')
  Route.post('/customer/login', 'AuthController.login')
  Route.get('/customer/profile/:id', 'AuthController.profile')

  // Api Find Number
  Route.post('/data/findnumber', async ({ request, session, response }) => {
    const dataInfo = request.only(['number', 'find'])
    
    const rules = {
      number: 'required|number',
      find: 'required|number'
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      return response.status(400).json('Please input number for number and find field')
    }

    const inpNumberString = dataInfo.number.toString()
    const inpFindString = dataInfo.find.toString()

    let returnValue = true
    
    if (inpNumberString.search(inpFindString) == -1) {
      returnValue = false
    }

    return response.status(200).json({status: 200, data: {isNumberFound: returnValue}})
  }).middleware('auth')
}).prefix('api/v2')
