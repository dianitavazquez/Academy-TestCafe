import { t } from 'testcafe'
import homePage from '../pages/homePage.js'
import landingPage from '../pages/landingPage.js'
import { BASE_URL, USER, PASS, TASK_NAME} from '../utils/constants.js'

fixture`New Task Tests`
  .page(`${BASE_URL}`)
  .beforeEach(async () => {
    await landingPage.loginFlow(USER, PASS)
  })

test('Create New Task - List Validation', async t => {
  const tasksCountBeforeCreate = await homePage.getTasksCount()
  await homePage.createNewTask(TASK_NAME)
  const tasksCountAfterCreate = await homePage.getTasksCount()
  await t.expect(tasksCountAfterCreate - tasksCountBeforeCreate).eql(1)
})

test('Create New Task - Name Validation', async t => {
  await homePage.createNewTask(TASK_NAME)
  const newTaskName = await homePage.getLastTaskName()
  await t.expect(newTaskName).eql(TASK_NAME)
})