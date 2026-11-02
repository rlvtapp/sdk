import type { ClientInstance } from '../../.poolster/client.js'
import { listEmailTemplates } from '../../clients/templates/listEmailTemplates.js'
import { createEmailTemplate } from '../../clients/templates/createEmailTemplate.js'
import { deleteEmailTemplate } from '../../clients/templates/deleteEmailTemplate.js'
import { getEmailTemplate } from '../../clients/templates/getEmailTemplate.js'
import { updateEmailTemplate } from '../../clients/templates/updateEmailTemplate.js'
import { duplicateEmailTemplate } from '../../clients/templates/duplicateEmailTemplate.js'
import { publishEmailTemplate } from '../../clients/templates/publishEmailTemplate.js'
import { renderEmailTemplate } from '../../clients/templates/renderEmailTemplate.js'

export class TemplatesClientOperations0001 {
  readonly listEmail: typeof listEmailTemplates
  readonly createEmail: typeof createEmailTemplate
  readonly deleteEmail: typeof deleteEmailTemplate
  readonly getEmail: typeof getEmailTemplate
  readonly updateEmail: typeof updateEmailTemplate
  readonly duplicateEmail: typeof duplicateEmailTemplate
  readonly publishEmail: typeof publishEmailTemplate
  readonly renderEmail: typeof renderEmailTemplate

  constructor(client: ClientInstance) {
    this.listEmail = ((options: Parameters<typeof listEmailTemplates>[0]) => listEmailTemplates({ ...options, client })) as typeof listEmailTemplates
    this.createEmail = ((options: Parameters<typeof createEmailTemplate>[0]) => createEmailTemplate({ ...options, client })) as typeof createEmailTemplate
    this.deleteEmail = ((options: Parameters<typeof deleteEmailTemplate>[0]) => deleteEmailTemplate({ ...options, client })) as typeof deleteEmailTemplate
    this.getEmail = ((options: Parameters<typeof getEmailTemplate>[0]) => getEmailTemplate({ ...options, client })) as typeof getEmailTemplate
    this.updateEmail = ((options: Parameters<typeof updateEmailTemplate>[0]) => updateEmailTemplate({ ...options, client })) as typeof updateEmailTemplate
    this.duplicateEmail = ((options: Parameters<typeof duplicateEmailTemplate>[0]) => duplicateEmailTemplate({ ...options, client })) as typeof duplicateEmailTemplate
    this.publishEmail = ((options: Parameters<typeof publishEmailTemplate>[0]) => publishEmailTemplate({ ...options, client })) as typeof publishEmailTemplate
    this.renderEmail = ((options: Parameters<typeof renderEmailTemplate>[0]) => renderEmailTemplate({ ...options, client })) as typeof renderEmailTemplate
  }
}
