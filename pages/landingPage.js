import {Selector, t} from 'testcafe'

class LandingPage {
    constructor() {
        this.loginLink = Selector('.sel_login') // . is for class
        this.loginIframe = Selector('.GB_frame')
        this.loginIframeNested = Selector('#GB_frame') 
        this.loginEmailInput = Selector('#email')  // # is for id
        this.loginPasswordInput = Selector('#password')
        this.loginButton = Selector('.submit_btn')
        this.inboxButton = Selector('.item_content').withText('Inbox')
    }

    loginFlow = async () => {
        await t 
            .click(this.loginLink)
            .switchToIframe(this.loginIframe)
            .switchToIframe(this.loginIframeNested)
            .typeText(this.loginEmailInput, 'diana.vazquez@itexico.com')
            .typeText(this.loginPasswordInput, 'wizeline123')
            .click(this.loginButton)
            .switchToMainWindow()
            .click(this.inboxButton)
    }
}

export default new LandingPage()