import type { ClientInstance } from '../../.poolster/client.js'
import { getScheduleBookingPage } from '../../clients/schedule/getScheduleBookingPage.js'
import { listScheduleBookings } from '../../clients/schedule/listScheduleBookings.js'
import { createScheduleBooking } from '../../clients/schedule/createScheduleBooking.js'
import { getScheduleBooking } from '../../clients/schedule/getScheduleBooking.js'
import { markScheduleBookingAttendance } from '../../clients/schedule/markScheduleBookingAttendance.js'
import { cancelScheduleBooking } from '../../clients/schedule/cancelScheduleBooking.js'
import { getScheduleBookingFeedback } from '../../clients/schedule/getScheduleBookingFeedback.js'
import { rateScheduleBooking } from '../../clients/schedule/rateScheduleBooking.js'
import { createScheduleBookingManagementLink } from '../../clients/schedule/createScheduleBookingManagementLink.js'
import { rescheduleScheduleBooking } from '../../clients/schedule/rescheduleScheduleBooking.js'
import { listScheduleBookingSlots } from '../../clients/schedule/listScheduleBookingSlots.js'
import { getScheduleBookingStatus } from '../../clients/schedule/getScheduleBookingStatus.js'
import { listScheduleEventTypes } from '../../clients/schedule/listScheduleEventTypes.js'
import { createScheduleEventType } from '../../clients/schedule/createScheduleEventType.js'
import { getScheduleEventType } from '../../clients/schedule/getScheduleEventType.js'
import { replaceScheduleEventType } from '../../clients/schedule/replaceScheduleEventType.js'
import { listSchedulePrivateLinks } from '../../clients/schedule/listSchedulePrivateLinks.js'
import { issueSchedulePrivateLink } from '../../clients/schedule/issueSchedulePrivateLink.js'
import { revokeSchedulePrivateLink } from '../../clients/schedule/revokeSchedulePrivateLink.js'
import { getScheduleHost } from '../../clients/schedule/getScheduleHost.js'
import { getScheduleHostBookingLimits } from '../../clients/schedule/getScheduleHostBookingLimits.js'
import { updateScheduleHostBookingLimits } from '../../clients/schedule/updateScheduleHostBookingLimits.js'
import { getScheduleHostInsights } from '../../clients/schedule/getScheduleHostInsights.js'
import { exportScheduleHostInsightsCsv } from '../../clients/schedule/exportScheduleHostInsightsCsv.js'
import { listScheduleNotificationHistory } from '../../clients/schedule/listScheduleNotificationHistory.js'
import { listScheduleNotificationSenders } from '../../clients/schedule/listScheduleNotificationSenders.js'
import { getScheduleNotificationSettings } from '../../clients/schedule/getScheduleNotificationSettings.js'
import { saveScheduleNotificationSettings } from '../../clients/schedule/saveScheduleNotificationSettings.js'
import { listScheduleSchedules } from '../../clients/schedule/listScheduleSchedules.js'
import { createScheduleAvailability } from '../../clients/schedule/createScheduleAvailability.js'
import { deleteScheduleAvailability } from '../../clients/schedule/deleteScheduleAvailability.js'
import { getScheduleAvailability } from '../../clients/schedule/getScheduleAvailability.js'
import { replaceScheduleAvailability } from '../../clients/schedule/replaceScheduleAvailability.js'
import { listScheduleSlots } from '../../clients/schedule/listScheduleSlots.js'
import { diagnoseScheduleSlot } from '../../clients/schedule/diagnoseScheduleSlot.js'
import { listScheduleWebhooks } from '../../clients/schedule/listScheduleWebhooks.js'
import { createScheduleWebhook } from '../../clients/schedule/createScheduleWebhook.js'
import { updateScheduleWebhook } from '../../clients/schedule/updateScheduleWebhook.js'
import { listScheduleWebhookDeliveries } from '../../clients/schedule/listScheduleWebhookDeliveries.js'
import { rotateScheduleWebhookSecret } from '../../clients/schedule/rotateScheduleWebhookSecret.js'
import { listScheduleWorkflows } from '../../clients/schedule/listScheduleWorkflows.js'
import { getScheduleWorkflow } from '../../clients/schedule/getScheduleWorkflow.js'
import { changeScheduleWorkflowState } from '../../clients/schedule/changeScheduleWorkflowState.js'

export class ScheduleClientOperations0001 {
  readonly getScheduleBookingPage: typeof getScheduleBookingPage
  readonly listScheduleBookings: typeof listScheduleBookings
  readonly createScheduleBooking: typeof createScheduleBooking
  readonly getScheduleBooking: typeof getScheduleBooking
  readonly markScheduleBookingAttendance: typeof markScheduleBookingAttendance
  readonly cancelScheduleBooking: typeof cancelScheduleBooking
  readonly getScheduleBookingFeedback: typeof getScheduleBookingFeedback
  readonly rateScheduleBooking: typeof rateScheduleBooking
  readonly createScheduleBookingManagementLink: typeof createScheduleBookingManagementLink
  readonly rescheduleScheduleBooking: typeof rescheduleScheduleBooking
  readonly listScheduleBookingSlots: typeof listScheduleBookingSlots
  readonly getScheduleBookingStatus: typeof getScheduleBookingStatus
  readonly listScheduleEventTypes: typeof listScheduleEventTypes
  readonly createScheduleEventType: typeof createScheduleEventType
  readonly getScheduleEventType: typeof getScheduleEventType
  readonly replaceScheduleEventType: typeof replaceScheduleEventType
  readonly listSchedulePrivateLinks: typeof listSchedulePrivateLinks
  readonly issueSchedulePrivateLink: typeof issueSchedulePrivateLink
  readonly revokeSchedulePrivateLink: typeof revokeSchedulePrivateLink
  readonly getScheduleHost: typeof getScheduleHost
  readonly getScheduleHostBookingLimits: typeof getScheduleHostBookingLimits
  readonly updateScheduleHostBookingLimits: typeof updateScheduleHostBookingLimits
  readonly getScheduleHostInsights: typeof getScheduleHostInsights
  readonly exportScheduleHostInsightsCsv: typeof exportScheduleHostInsightsCsv
  readonly listScheduleNotificationHistory: typeof listScheduleNotificationHistory
  readonly listScheduleNotificationSenders: typeof listScheduleNotificationSenders
  readonly getScheduleNotificationSettings: typeof getScheduleNotificationSettings
  readonly saveScheduleNotificationSettings: typeof saveScheduleNotificationSettings
  readonly listScheduleSchedules: typeof listScheduleSchedules
  readonly createScheduleAvailability: typeof createScheduleAvailability
  readonly deleteScheduleAvailability: typeof deleteScheduleAvailability
  readonly getScheduleAvailability: typeof getScheduleAvailability
  readonly replaceScheduleAvailability: typeof replaceScheduleAvailability
  readonly listScheduleSlots: typeof listScheduleSlots
  readonly diagnoseScheduleSlot: typeof diagnoseScheduleSlot
  readonly listScheduleWebhooks: typeof listScheduleWebhooks
  readonly createScheduleWebhook: typeof createScheduleWebhook
  readonly updateScheduleWebhook: typeof updateScheduleWebhook
  readonly listScheduleWebhookDeliveries: typeof listScheduleWebhookDeliveries
  readonly rotateScheduleWebhookSecret: typeof rotateScheduleWebhookSecret
  readonly listScheduleWorkflows: typeof listScheduleWorkflows
  readonly getScheduleWorkflow: typeof getScheduleWorkflow
  readonly changeScheduleWorkflowState: typeof changeScheduleWorkflowState

  constructor(client: ClientInstance) {
    this.getScheduleBookingPage = ((options: Parameters<typeof getScheduleBookingPage>[0]) => getScheduleBookingPage({ ...options, client })) as typeof getScheduleBookingPage
    this.listScheduleBookings = ((options: Parameters<typeof listScheduleBookings>[0]) => listScheduleBookings({ ...options, client })) as typeof listScheduleBookings
    this.createScheduleBooking = ((options: Parameters<typeof createScheduleBooking>[0]) => createScheduleBooking({ ...options, client })) as typeof createScheduleBooking
    this.getScheduleBooking = ((options: Parameters<typeof getScheduleBooking>[0]) => getScheduleBooking({ ...options, client })) as typeof getScheduleBooking
    this.markScheduleBookingAttendance = ((options: Parameters<typeof markScheduleBookingAttendance>[0]) => markScheduleBookingAttendance({ ...options, client })) as typeof markScheduleBookingAttendance
    this.cancelScheduleBooking = ((options: Parameters<typeof cancelScheduleBooking>[0]) => cancelScheduleBooking({ ...options, client })) as typeof cancelScheduleBooking
    this.getScheduleBookingFeedback = ((options: Parameters<typeof getScheduleBookingFeedback>[0]) => getScheduleBookingFeedback({ ...options, client })) as typeof getScheduleBookingFeedback
    this.rateScheduleBooking = ((options: Parameters<typeof rateScheduleBooking>[0]) => rateScheduleBooking({ ...options, client })) as typeof rateScheduleBooking
    this.createScheduleBookingManagementLink = ((options: Parameters<typeof createScheduleBookingManagementLink>[0]) => createScheduleBookingManagementLink({ ...options, client })) as typeof createScheduleBookingManagementLink
    this.rescheduleScheduleBooking = ((options: Parameters<typeof rescheduleScheduleBooking>[0]) => rescheduleScheduleBooking({ ...options, client })) as typeof rescheduleScheduleBooking
    this.listScheduleBookingSlots = ((options: Parameters<typeof listScheduleBookingSlots>[0]) => listScheduleBookingSlots({ ...options, client })) as typeof listScheduleBookingSlots
    this.getScheduleBookingStatus = ((options: Parameters<typeof getScheduleBookingStatus>[0]) => getScheduleBookingStatus({ ...options, client })) as typeof getScheduleBookingStatus
    this.listScheduleEventTypes = ((options: Parameters<typeof listScheduleEventTypes>[0]) => listScheduleEventTypes({ ...options, client })) as typeof listScheduleEventTypes
    this.createScheduleEventType = ((options: Parameters<typeof createScheduleEventType>[0]) => createScheduleEventType({ ...options, client })) as typeof createScheduleEventType
    this.getScheduleEventType = ((options: Parameters<typeof getScheduleEventType>[0]) => getScheduleEventType({ ...options, client })) as typeof getScheduleEventType
    this.replaceScheduleEventType = ((options: Parameters<typeof replaceScheduleEventType>[0]) => replaceScheduleEventType({ ...options, client })) as typeof replaceScheduleEventType
    this.listSchedulePrivateLinks = ((options: Parameters<typeof listSchedulePrivateLinks>[0]) => listSchedulePrivateLinks({ ...options, client })) as typeof listSchedulePrivateLinks
    this.issueSchedulePrivateLink = ((options: Parameters<typeof issueSchedulePrivateLink>[0]) => issueSchedulePrivateLink({ ...options, client })) as typeof issueSchedulePrivateLink
    this.revokeSchedulePrivateLink = ((options: Parameters<typeof revokeSchedulePrivateLink>[0]) => revokeSchedulePrivateLink({ ...options, client })) as typeof revokeSchedulePrivateLink
    this.getScheduleHost = ((options: Parameters<typeof getScheduleHost>[0]) => getScheduleHost({ ...options, client })) as typeof getScheduleHost
    this.getScheduleHostBookingLimits = ((options: Parameters<typeof getScheduleHostBookingLimits>[0]) => getScheduleHostBookingLimits({ ...options, client })) as typeof getScheduleHostBookingLimits
    this.updateScheduleHostBookingLimits = ((options: Parameters<typeof updateScheduleHostBookingLimits>[0]) => updateScheduleHostBookingLimits({ ...options, client })) as typeof updateScheduleHostBookingLimits
    this.getScheduleHostInsights = ((options: Parameters<typeof getScheduleHostInsights>[0]) => getScheduleHostInsights({ ...options, client })) as typeof getScheduleHostInsights
    this.exportScheduleHostInsightsCsv = ((options: Parameters<typeof exportScheduleHostInsightsCsv>[0]) => exportScheduleHostInsightsCsv({ ...options, client })) as typeof exportScheduleHostInsightsCsv
    this.listScheduleNotificationHistory = ((options: Parameters<typeof listScheduleNotificationHistory>[0]) => listScheduleNotificationHistory({ ...options, client })) as typeof listScheduleNotificationHistory
    this.listScheduleNotificationSenders = ((options: Parameters<typeof listScheduleNotificationSenders>[0]) => listScheduleNotificationSenders({ ...options, client })) as typeof listScheduleNotificationSenders
    this.getScheduleNotificationSettings = ((options: Parameters<typeof getScheduleNotificationSettings>[0]) => getScheduleNotificationSettings({ ...options, client })) as typeof getScheduleNotificationSettings
    this.saveScheduleNotificationSettings = ((options: Parameters<typeof saveScheduleNotificationSettings>[0]) => saveScheduleNotificationSettings({ ...options, client })) as typeof saveScheduleNotificationSettings
    this.listScheduleSchedules = ((options: Parameters<typeof listScheduleSchedules>[0]) => listScheduleSchedules({ ...options, client })) as typeof listScheduleSchedules
    this.createScheduleAvailability = ((options: Parameters<typeof createScheduleAvailability>[0]) => createScheduleAvailability({ ...options, client })) as typeof createScheduleAvailability
    this.deleteScheduleAvailability = ((options: Parameters<typeof deleteScheduleAvailability>[0]) => deleteScheduleAvailability({ ...options, client })) as typeof deleteScheduleAvailability
    this.getScheduleAvailability = ((options: Parameters<typeof getScheduleAvailability>[0]) => getScheduleAvailability({ ...options, client })) as typeof getScheduleAvailability
    this.replaceScheduleAvailability = ((options: Parameters<typeof replaceScheduleAvailability>[0]) => replaceScheduleAvailability({ ...options, client })) as typeof replaceScheduleAvailability
    this.listScheduleSlots = ((options: Parameters<typeof listScheduleSlots>[0]) => listScheduleSlots({ ...options, client })) as typeof listScheduleSlots
    this.diagnoseScheduleSlot = ((options: Parameters<typeof diagnoseScheduleSlot>[0]) => diagnoseScheduleSlot({ ...options, client })) as typeof diagnoseScheduleSlot
    this.listScheduleWebhooks = ((options: Parameters<typeof listScheduleWebhooks>[0]) => listScheduleWebhooks({ ...options, client })) as typeof listScheduleWebhooks
    this.createScheduleWebhook = ((options: Parameters<typeof createScheduleWebhook>[0]) => createScheduleWebhook({ ...options, client })) as typeof createScheduleWebhook
    this.updateScheduleWebhook = ((options: Parameters<typeof updateScheduleWebhook>[0]) => updateScheduleWebhook({ ...options, client })) as typeof updateScheduleWebhook
    this.listScheduleWebhookDeliveries = ((options: Parameters<typeof listScheduleWebhookDeliveries>[0]) => listScheduleWebhookDeliveries({ ...options, client })) as typeof listScheduleWebhookDeliveries
    this.rotateScheduleWebhookSecret = ((options: Parameters<typeof rotateScheduleWebhookSecret>[0]) => rotateScheduleWebhookSecret({ ...options, client })) as typeof rotateScheduleWebhookSecret
    this.listScheduleWorkflows = ((options: Parameters<typeof listScheduleWorkflows>[0]) => listScheduleWorkflows({ ...options, client })) as typeof listScheduleWorkflows
    this.getScheduleWorkflow = ((options: Parameters<typeof getScheduleWorkflow>[0]) => getScheduleWorkflow({ ...options, client })) as typeof getScheduleWorkflow
    this.changeScheduleWorkflowState = ((options: Parameters<typeof changeScheduleWorkflowState>[0]) => changeScheduleWorkflowState({ ...options, client })) as typeof changeScheduleWorkflowState
  }
}
