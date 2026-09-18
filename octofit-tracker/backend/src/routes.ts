import { Router } from 'express'
import { Activity, Leaderboard, Team, User, Workout } from './models.js'

const router = Router()

type ResourceModel = typeof User

function addCrudRoutes(path: string, model: ResourceModel) {
  router.get(path, async (_request, response) => {
    try {
      response.json(await model.find().lean())
    } catch (error) {
      response.status(500).json({ error: 'Unable to load resources', details: error instanceof Error ? error.message : 'Unknown error' })
    }
  })

  router.post(path, async (request, response) => {
    try {
      const resource = await model.create(request.body)
      response.status(201).json(resource)
    } catch (error) {
      response.status(400).json({ error: 'Unable to create resource', details: error instanceof Error ? error.message : 'Unknown error' })
    }
  })

  router.get(`${path}/:id`, async (request, response) => {
    try {
      const resource = await model.findById(request.params.id).lean()
      if (!resource) {
        response.status(404).json({ error: 'Resource not found' })
        return
      }
      response.json(resource)
    } catch (error) {
      response.status(400).json({ error: 'Invalid resource id' })
    }
  })
}

addCrudRoutes('/users', User)
addCrudRoutes('/teams', Team)
addCrudRoutes('/activities', Activity)
addCrudRoutes('/leaderboard', Leaderboard)
addCrudRoutes('/workouts', Workout)

router.get('/leaderboard', async (_request, response) => {
  try {
    response.json(await Leaderboard.find().sort({ rank: 1 }).populate('userId', 'username').lean())
  } catch (error) {
    response.status(500).json({ error: 'Unable to load leaderboard', details: error instanceof Error ? error.message : 'Unknown error' })
  }
})

export default router
