import { __poolsterFixtures } from './runtime.js';
import type { Thread } from "../../models/Thread.js";
export function createThread(__depth = 0): Thread { return __poolsterFixtures.create("Thread", __depth) as Thread; }
import type { ThreadAssignee } from "../../models/ThreadAssignee.js";
export function createThreadAssignee(__depth = 0): ThreadAssignee { return __poolsterFixtures.create("ThreadAssignee", __depth) as ThreadAssignee; }
import type { ThreadListResponse } from "../../models/ThreadListResponse.js";
export function createThreadListResponse(__depth = 0): ThreadListResponse { return __poolsterFixtures.create("ThreadListResponse", __depth) as ThreadListResponse; }
import type { ThreadMessage } from "../../models/ThreadMessage.js";
export function createThreadMessage(__depth = 0): ThreadMessage { return __poolsterFixtures.create("ThreadMessage", __depth) as ThreadMessage; }
import type { ThreadResponse } from "../../models/ThreadResponse.js";
export function createThreadResponse(__depth = 0): ThreadResponse { return __poolsterFixtures.create("ThreadResponse", __depth) as ThreadResponse; }
import type { ThreadUpdate } from "../../models/ThreadUpdate.js";
export function createThreadUpdate(__depth = 0): ThreadUpdate { return __poolsterFixtures.create("ThreadUpdate", __depth) as ThreadUpdate; }
import type { ThreadWithMessages } from "../../models/ThreadWithMessages.js";
export function createThreadWithMessages(__depth = 0): ThreadWithMessages { return __poolsterFixtures.create("ThreadWithMessages", __depth) as ThreadWithMessages; }
import type { TrackEventRequest } from "../../models/TrackEventRequest.js";
export function createTrackEventRequest(__depth = 0): TrackEventRequest { return __poolsterFixtures.create("TrackEventRequest", __depth) as TrackEventRequest; }
import type { UpdateContact } from "../../models/UpdateContact.js";
export function createUpdateContact(__depth = 0): UpdateContact { return __poolsterFixtures.create("UpdateContact", __depth) as UpdateContact; }
import type { UpdateTemplateRequest } from "../../models/UpdateTemplateRequest.js";
export function createUpdateTemplateRequest(__depth = 0): UpdateTemplateRequest { return __poolsterFixtures.create("UpdateTemplateRequest", __depth) as UpdateTemplateRequest; }
import type { VariableDefinition } from "../../models/VariableDefinition.js";
export function createVariableDefinition(__depth = 0): VariableDefinition { return __poolsterFixtures.create("VariableDefinition", __depth) as VariableDefinition; }
import type { VariableProblem } from "../../models/VariableProblem.js";
export function createVariableProblem(__depth = 0): VariableProblem { return __poolsterFixtures.create("VariableProblem", __depth) as VariableProblem; }
import type { Webhook } from "../../models/Webhook.js";
export function createWebhook(__depth = 0): Webhook { return __poolsterFixtures.create("Webhook", __depth) as Webhook; }
import type { WebhookDelivery } from "../../models/WebhookDelivery.js";
export function createWebhookDelivery(__depth = 0): WebhookDelivery { return __poolsterFixtures.create("WebhookDelivery", __depth) as WebhookDelivery; }
import type { WebhookDeliveryListResponse } from "../../models/WebhookDeliveryListResponse.js";
export function createWebhookDeliveryListResponse(__depth = 0): WebhookDeliveryListResponse { return __poolsterFixtures.create("WebhookDeliveryListResponse", __depth) as WebhookDeliveryListResponse; }
import type { WebhookListResponse } from "../../models/WebhookListResponse.js";
export function createWebhookListResponse(__depth = 0): WebhookListResponse { return __poolsterFixtures.create("WebhookListResponse", __depth) as WebhookListResponse; }
import type { WebhookResponse } from "../../models/WebhookResponse.js";
export function createWebhookResponse(__depth = 0): WebhookResponse { return __poolsterFixtures.create("WebhookResponse", __depth) as WebhookResponse; }
