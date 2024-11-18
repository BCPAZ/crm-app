import api from "../api";

const notificationsService = api.injectEndpoints({
 endpoints : (builder) => ({
  getNotifications : builder.query({
    query : () => ({
      url : '/notifications',
    }),
    providesTags : ["NOTIFICATIONS"]
  }),
  readNotification : builder.mutation({
    query : (id) => ({
      url : `notifications/${id}`,
      method : "POST"
    }),
    invalidatesTags : ['NOTIFICATIONS']
  })
 })
})
export const {useGetNotificationsQuery, useReadNotificationMutation} = notificationsService;
export default notificationsService