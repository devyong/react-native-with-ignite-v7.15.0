import { ApiBase } from "./api/api-base"

import { ICalendarModel } from "../models/Calendar.model"

export class CalendarApi extends ApiBase {
  async listCalendar() {
    return this.list<ICalendarModel>("calendar")
  }

  async getCalendar(id: number) {
    return this.get<ICalendarModel>(`calendar/${id}`)
  }

  async postCalendar(data: ICalendarModel) {
    return this.post<ICalendarModel>(`calendar`, data)
  }

  async putCalendar(id: number, data: ICalendarModel) {
    return this.put<ICalendarModel>(`calendar/${id}`, data)
  }

  async patchCalendar(id: number, data: ICalendarModel) {
    return this.patch<ICalendarModel>(`calendar/${id}`, data)
  }

  async deleteCalendar(id: number) {
    return this.delete(`calendar/${id}`)
  }
}
