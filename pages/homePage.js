import { Selector, t } from 'testcafe'

class HomePage {
  constructor() {
    this.topIcons = Selector('#top_icons')
    this.addTask = Selector('.agenda_add_task')
    this.taskNameInput = Selector('.richtext_editor')
    this.addTask_Submit = Selector('.submit_btn')
    this.newTaskRadioBtn = Selector('.checker')
    this.taskName = Selector('.text')
  }

  createNewTask = async (taskName) => {
    await t
      .click(this.addTask)
      .typeText(this.taskNameInput, taskName)
      .click(this.addTask_Submit)
  }

  getTasksCount = async () => {
    await t.hover(this.newTaskRadioBtn)
    return this.newTaskRadioBtn.count
  }

  getLastTaskName = async () => {
    const tasksCount = await this.getTasksCount()
    return this.taskName.nth(tasksCount - 1).innerText
  }
}

export default new HomePage()