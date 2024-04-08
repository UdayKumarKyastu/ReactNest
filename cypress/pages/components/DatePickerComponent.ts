export class DatePickerComponent {
  private days = () => {
    return cy.get('[class="DayPicker-Day"]')
  }

  public selectLastDayOfMonth() {
    this.days().last().click()
  }
}
