import {Selector, t} from 'testcafe'
import landingPage from '../pages/landingPage'
import homePage from '../pages/homePage'

fixture('Successful login')
    .page('https://todoist.com/')
    .beforeEach(async () => {
        await landingPage.loginFlow()
      })

test('Add Task - List Validation', async t => {
    const tasksCountBeforeCreate = await homePage.getInboxTaskCount()
    await homePage.addTaskFlow()
    const tasksCountAfterCreate = await homePage.getInboxTaskCount()
    await t.expect(tasksCountAfterCreate - tasksCountBeforeCreate).eql(1)
})

test('Add Task - Name Validation', async t => {
    await homePage.addTaskFlow()
    const newTaskName = await homePage.getLastTaskName()
    await t.expect(newTaskName).eql('TestCafe')
})

test('Update Task Name', async t => {
    await homePage.updateTaskName()
    const newTaskName = await homePage.getLastTaskName()
    await t.expect(newTaskName).eql('Updated')
})

test('Delete Task', async t => {
    await homePage.addTaskFlow()
    const tasksCountBeforeDelete = await homePage.getInboxTaskCount()
    await homePage.deleteTask()
    const tasksCountAfterDelete = await homePage.getInboxTaskCount()
    await t.expect(tasksCountBeforeDelete - tasksCountAfterDelete).eql(1)
})

test('Modify Task Due Date', async t => {
    const dateBeforeModify = await homePage.getTaskDate()
    await homePage.modifyTaskDueDate()
    const dateAftereModify = await homePage.getTaskDate()
    await t.expect(dateBeforeModify).notEql(dateAftereModify)
})

test('Drag & Drop Task', async t => {
    const taskBeforeDrag = await homePage.getLastTaskName()
    await homePage.dragDropTask()
    const taskAfterDrag = await homePage.getFirstTaskName()
    await t.expect(taskBeforeDrag).eql(taskAfterDrag);
})
