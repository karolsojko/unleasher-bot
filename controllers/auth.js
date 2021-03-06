import express from 'express'
import { exchangeCodeForToken } from '../handlers/api/slack'
import * as storeHandler from '../handlers/store'
import * as botHandler from '../handlers/bot'

const router = new express.Router()

router.get('/auth', async function (req, res) {
  try {
    let token = await exchangeCodeForToken(req.query.code)
    storeHandler.storeTeamToken(token)
    botHandler.createNewBotConnection({
      token: token.bot.bot_access_token,
      team: token.team_id
    })
    res.send('Thank you for authorizing our application')
  } catch (e) {
    res.send('Error. Invalid/expired code.')
  }
})

export default router
