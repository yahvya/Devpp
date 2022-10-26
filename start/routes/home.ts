import Route from '@ioc:Adonis/Core/Route'

Route.get('/','HomeController.index').as('home_page')
