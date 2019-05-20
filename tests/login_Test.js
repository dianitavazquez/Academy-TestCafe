import { t } from 'testcafe'
import landingPage from '../pages/landingPage.js'
import homePage from '../pages/homePage.js'
import { 
  BASE_URL, 
  USER, PASS, 
  INVALID_PASS, 
  INVALID_USER, 
  EMPTY_CREDENTIALS_ERROR_MSG 
} from '../utils/constants.js'

fixture`Login Tests`.page(BASE_URL)

test.before(async () => {
  await landingPage.loginFlow(USER, PASS)
})
  ('Login Test - Happy Path', async t => {
  await t.expect(homePage.topIcons.exists).ok()
})

test.before(async () => {
  await landingPage.loginFlowEmptyCredentials()
})
  ('Login Test - Empty Parameters', async t => {
    const errorMsg = await landingPage.getErrorMessage()
    await t.expect(errorMsg).eql(EMPTY_CREDENTIALS_ERROR_MSG)
})