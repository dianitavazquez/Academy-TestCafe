import {Selector, t} from 'testcafe'

class HomePage {

    constructor() {
        this.topBar = Selector('#top_bar')
        this.addTaskIcon = Selector('.action_add_item')
        this.dateInput = Selector('.due_date_holder')
        this.addTimeBtn = Selector('.scheduler-actions-addtime')
        this.timeInput = Selector('.scheduler-timepicker-input-controls')
        this.addBtn = Selector('.scheduler-timepicker-actions-add')
        this.nextMonthBtn= Selector('.scheduler-picker-header-action').nth(2)
        this.selectDayBtn = Selector('.scheduler-picker-cell-day')
        this.saveDateBtn = Selector('.scheduler-actions-save')
        this.taskNameInput = Selector('.richtext_editor')
        this.addTaskBtn = Selector('.ist_button')
        this.newTaskRadioBtn = Selector('.checker')
        this.taskName = Selector('.text')
        this.deleteTaskLink = Selector('.menu_label').withText('Delete task')
        this.deleteIframe = Selector('.button_holder')
        this.deleteTaskBtn = Selector('.ist_button_red').withText('Delete')
        this.dueDateBtn = Selector('.due_date_controls')
        this.modifyTimeBtn = Selector('.scheduler-actions-time')
        this.dragTaskBtn = Selector('.invisible_space')
        this.topTaskHeader = Selector('.project_header')
    }

    getInboxTaskCount = async () => {
        await t.hover(this.newTaskRadioBtn)
        return this.newTaskRadioBtn.count
    }

    getLastTaskName = async () => {
        const tasksCount = await this.getInboxTaskCount()
        return this.taskName.nth(tasksCount - 1).innerText
    }

    getFirstTaskName = async () => {
        return this.taskName.nth(0).innerText
    }

    getTaskDate = async () => {
        const tasksCount = await this.getInboxTaskCount()
        return this.dueDateBtn.nth(tasksCount - 1).innerText
    }

    addTaskFlow = async () => {
        await t
            .click(this.addTaskIcon)
            .click(this.dateInput)
            .click(this.addTimeBtn)
            .typeText(this.timeInput, '2:00 PM')
            .click(this.addBtn)
            .click(this.nextMonthBtn)
            .click(this.selectDayBtn.withText('10'))
            .click(this.saveDateBtn)
            .typeText(this.taskNameInput, 'TestCafe')
            .click(this.addTaskBtn)
    }

    updateTaskName = async () => {
        const tasksCount = await this.getInboxTaskCount()
        await t
            .click(this.taskName.nth(tasksCount-1))
            .selectText(this.taskNameInput)
            .typeText(this.taskNameInput, 'Updated')
            .click(this.addTaskBtn)
    }

    deleteTask = async () => {
        const tasksCountDelete = await this.getInboxTaskCount()
        await t
            .rightClick(this.taskName.nth(tasksCountDelete-1))
            .click(this.deleteTaskLink)
            .hover(this.deleteIframe)
            .click(this.deleteTaskBtn)
    }

    modifyTaskDueDate = async () => {
        const tasksCountModify = await this.getInboxTaskCount()
        await t
            .click(this.dueDateBtn.nth(tasksCountModify-1))
            .click(this.modifyTimeBtn)
            .click(this.timeInput)
            .typeText(this.timeInput, ' 6:00 PM')
            .click(this.addBtn)
            .click(this.nextMonthBtn)
            .click(this.selectDayBtn.withText('18'))
            .click(this.saveDateBtn)
    }

    dragDropTask = async() => {
        const tasksCountDrop = await this.getInboxTaskCount()
        await t
            .dragToElement(this.dragTaskBtn.nth(tasksCountDrop), this.topTaskHeader)
    }
}

export default new HomePage() 
