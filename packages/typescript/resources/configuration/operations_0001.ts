import type { ClientInstance } from '../../.poolster/client.js'
import { checkEmailAuth } from '../../clients/configuration/checkEmailAuth.js'
import { listEmailDomains } from '../../clients/configuration/listEmailDomains.js'
import { createEmailDomain } from '../../clients/configuration/createEmailDomain.js'
import { deleteEmailDomain } from '../../clients/configuration/deleteEmailDomain.js'
import { getEmailDomain } from '../../clients/configuration/getEmailDomain.js'
import { verifyEmailDomain } from '../../clients/configuration/verifyEmailDomain.js'
import { listEmailSenderIdentities } from '../../clients/configuration/listEmailSenderIdentities.js'
import { getEmailSenderIdentity } from '../../clients/configuration/getEmailSenderIdentity.js'

export class ConfigurationClientOperations0001 {
  readonly checkEmailAuth: typeof checkEmailAuth
  readonly listEmailDomains: typeof listEmailDomains
  readonly createEmailDomain: typeof createEmailDomain
  readonly deleteEmailDomain: typeof deleteEmailDomain
  readonly getEmailDomain: typeof getEmailDomain
  readonly verifyEmailDomain: typeof verifyEmailDomain
  readonly listEmailSenderIdentities: typeof listEmailSenderIdentities
  readonly getEmailSenderIdentity: typeof getEmailSenderIdentity

  constructor(client: ClientInstance) {
    this.checkEmailAuth = ((options: Parameters<typeof checkEmailAuth>[0]) => checkEmailAuth({ ...options, client })) as typeof checkEmailAuth
    this.listEmailDomains = ((options: Parameters<typeof listEmailDomains>[0]) => listEmailDomains({ ...options, client })) as typeof listEmailDomains
    this.createEmailDomain = ((options: Parameters<typeof createEmailDomain>[0]) => createEmailDomain({ ...options, client })) as typeof createEmailDomain
    this.deleteEmailDomain = ((options: Parameters<typeof deleteEmailDomain>[0]) => deleteEmailDomain({ ...options, client })) as typeof deleteEmailDomain
    this.getEmailDomain = ((options: Parameters<typeof getEmailDomain>[0]) => getEmailDomain({ ...options, client })) as typeof getEmailDomain
    this.verifyEmailDomain = ((options: Parameters<typeof verifyEmailDomain>[0]) => verifyEmailDomain({ ...options, client })) as typeof verifyEmailDomain
    this.listEmailSenderIdentities = ((options: Parameters<typeof listEmailSenderIdentities>[0]) => listEmailSenderIdentities({ ...options, client })) as typeof listEmailSenderIdentities
    this.getEmailSenderIdentity = ((options: Parameters<typeof getEmailSenderIdentity>[0]) => getEmailSenderIdentity({ ...options, client })) as typeof getEmailSenderIdentity
  }
}
