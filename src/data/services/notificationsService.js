import api from "../api";

const notificationsService = api.injectEndpoints({
 endpoints : (builder) => ({
  getNotifications : builder.query({
    query : () => ({
      url : '/notifications',
    })
  })
 })
})
export const {useGetNotificationsQuery} = notificationsService;
export default notificationsService