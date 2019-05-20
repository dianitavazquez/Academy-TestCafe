import { Selector, t } from 'testcafe'

class LandingPage {
  constructor() {
    this.login_btn = Selector('.sel_login')
    this.username_input = Selector('#email')
    this.password_input = Selector('#password')
    this.submit_btn = Selector('.submit_btn')
    this.loginIFrame1 = Selector('.GB_frame')
    this.loginIFrame2 = Selector('#GB_frame')
    this.errorMsgContainer = Selector('.error_msg')
  }

  loginFlow = async (user = '', pass = '') => {
    await t
      .click(this.login_btn)
      .switchToIframe(this.loginIFrame1)
      .switchToIframe(this.loginIFrame2)
      .typeText(this.username_input, user, { replace: true })
      .typeText(this.password_input, pass, { replace: true })
      .click(this.submit_btn)
      .switchToMainWindow()
  }

  loginFlowEmptyCredentials = async () => {
    await t
      .click(this.login_btn)
      .switchToIframe(this.loginIFrame1)
      .switchToIframe(this.loginIFrame2)
      .click(this.submit_btn)
  }

  getErrorMessage = async () => {
    await t.hover(this.errorMsgContainer)
    return this.errorMsgContainer.innerText
  }
}

export default new LandingPage()