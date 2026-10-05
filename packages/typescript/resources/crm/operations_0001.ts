import type { ClientInstance } from '../../.kaji/client.js'
import { listCrmLists } from '../../clients/crm/listCrmLists.js'
import { createCrmList } from '../../clients/crm/createCrmList.js'
import { deleteCrmList } from '../../clients/crm/deleteCrmList.js'
import { getCrmList } from '../../clients/crm/getCrmList.js'
import { updateCrmList } from '../../clients/crm/updateCrmList.js'
import { listCrmListAttributes } from '../../clients/crm/listCrmListAttributes.js'
import { createCrmListAttribute } from '../../clients/crm/createCrmListAttribute.js'
import { deleteCrmListAttribute } from '../../clients/crm/deleteCrmListAttribute.js'
import { updateCrmListAttribute } from '../../clients/crm/updateCrmListAttribute.js'
import { listCrmListEntries } from '../../clients/crm/listCrmListEntries.js'
import { createCrmListEntry } from '../../clients/crm/createCrmListEntry.js'
import { deleteCrmListEntry } from '../../clients/crm/deleteCrmListEntry.js'
import { getCrmListEntry } from '../../clients/crm/getCrmListEntry.js'
import { updateCrmListEntry } from '../../clients/crm/updateCrmListEntry.js'
import { deleteCrmNote } from '../../clients/crm/deleteCrmNote.js'
import { getCrmNote } from '../../clients/crm/getCrmNote.js'
import { updateCrmNote } from '../../clients/crm/updateCrmNote.js'
import { listCrmObjects } from '../../clients/crm/listCrmObjects.js'
import { createCrmObject } from '../../clients/crm/createCrmObject.js'
import { deleteCrmObject } from '../../clients/crm/deleteCrmObject.js'
import { getCrmObject } from '../../clients/crm/getCrmObject.js'
import { updateCrmObject } from '../../clients/crm/updateCrmObject.js'
import { listCrmObjectAttributes } from '../../clients/crm/listCrmObjectAttributes.js'
import { createCrmObjectAttribute } from '../../clients/crm/createCrmObjectAttribute.js'
import { deleteCrmObjectAttribute } from '../../clients/crm/deleteCrmObjectAttribute.js'
import { updateCrmObjectAttribute } from '../../clients/crm/updateCrmObjectAttribute.js'
import { previewCrmObjectDeletion } from '../../clients/crm/previewCrmObjectDeletion.js'
import { getCrmObjectQuality } from '../../clients/crm/getCrmObjectQuality.js'
import { listCrmRecords } from '../../clients/crm/listCrmRecords.js'
import { createCrmRecord } from '../../clients/crm/createCrmRecord.js'
import { upsertCrmRecord } from '../../clients/crm/upsertCrmRecord.js'
import { archiveCrmRecord } from '../../clients/crm/archiveCrmRecord.js'
import { getCrmRecord } from '../../clients/crm/getCrmRecord.js'
import { updateCrmRecord } from '../../clients/crm/updateCrmRecord.js'
import { listCrmActivities } from '../../clients/crm/listCrmActivities.js'
import { listCrmNotes } from '../../clients/crm/listCrmNotes.js'
import { createCrmNote } from '../../clients/crm/createCrmNote.js'
import { listCrmTasks } from '../../clients/crm/listCrmTasks.js'
import { createCrmTask } from '../../clients/crm/createCrmTask.js'
import { deleteCrmTask } from '../../clients/crm/deleteCrmTask.js'
import { getCrmTask } from '../../clients/crm/getCrmTask.js'
import { updateCrmTask } from '../../clients/crm/updateCrmTask.js'

export class CrmClientOperations0001 {
  readonly listCrmLists: typeof listCrmLists
  readonly createCrmList: typeof createCrmList
  readonly deleteCrmList: typeof deleteCrmList
  readonly getCrmList: typeof getCrmList
  readonly updateCrmList: typeof updateCrmList
  readonly listCrmListAttributes: typeof listCrmListAttributes
  readonly createCrmListAttribute: typeof createCrmListAttribute
  readonly deleteCrmListAttribute: typeof deleteCrmListAttribute
  readonly updateCrmListAttribute: typeof updateCrmListAttribute
  readonly listCrmListEntries: typeof listCrmListEntries
  readonly createCrmListEntry: typeof createCrmListEntry
  readonly deleteCrmListEntry: typeof deleteCrmListEntry
  readonly getCrmListEntry: typeof getCrmListEntry
  readonly updateCrmListEntry: typeof updateCrmListEntry
  readonly deleteCrmNote: typeof deleteCrmNote
  readonly getCrmNote: typeof getCrmNote
  readonly updateCrmNote: typeof updateCrmNote
  readonly listCrmObjects: typeof listCrmObjects
  readonly createCrmObject: typeof createCrmObject
  readonly deleteCrmObject: typeof deleteCrmObject
  readonly getCrmObject: typeof getCrmObject
  readonly updateCrmObject: typeof updateCrmObject
  readonly listCrmObjectAttributes: typeof listCrmObjectAttributes
  readonly createCrmObjectAttribute: typeof createCrmObjectAttribute
  readonly deleteCrmObjectAttribute: typeof deleteCrmObjectAttribute
  readonly updateCrmObjectAttribute: typeof updateCrmObjectAttribute
  readonly previewCrmObjectDeletion: typeof previewCrmObjectDeletion
  readonly getCrmObjectQuality: typeof getCrmObjectQuality
  readonly listCrmRecords: typeof listCrmRecords
  readonly createCrmRecord: typeof createCrmRecord
  readonly upsertCrmRecord: typeof upsertCrmRecord
  readonly archiveCrmRecord: typeof archiveCrmRecord
  readonly getCrmRecord: typeof getCrmRecord
  readonly updateCrmRecord: typeof updateCrmRecord
  readonly listCrmActivities: typeof listCrmActivities
  readonly listCrmNotes: typeof listCrmNotes
  readonly createCrmNote: typeof createCrmNote
  readonly listCrmTasks: typeof listCrmTasks
  readonly createCrmTask: typeof createCrmTask
  readonly deleteCrmTask: typeof deleteCrmTask
  readonly getCrmTask: typeof getCrmTask
  readonly updateCrmTask: typeof updateCrmTask

  constructor(client: ClientInstance) {
    this.listCrmLists = ((options: Parameters<typeof listCrmLists>[0]) => listCrmLists({ ...options, client })) as typeof listCrmLists
    this.createCrmList = ((options: Parameters<typeof createCrmList>[0]) => createCrmList({ ...options, client })) as typeof createCrmList
    this.deleteCrmList = ((options: Parameters<typeof deleteCrmList>[0]) => deleteCrmList({ ...options, client })) as typeof deleteCrmList
    this.getCrmList = ((options: Parameters<typeof getCrmList>[0]) => getCrmList({ ...options, client })) as typeof getCrmList
    this.updateCrmList = ((options: Parameters<typeof updateCrmList>[0]) => updateCrmList({ ...options, client })) as typeof updateCrmList
    this.listCrmListAttributes = ((options: Parameters<typeof listCrmListAttributes>[0]) => listCrmListAttributes({ ...options, client })) as typeof listCrmListAttributes
    this.createCrmListAttribute = ((options: Parameters<typeof createCrmListAttribute>[0]) => createCrmListAttribute({ ...options, client })) as typeof createCrmListAttribute
    this.deleteCrmListAttribute = ((options: Parameters<typeof deleteCrmListAttribute>[0]) => deleteCrmListAttribute({ ...options, client })) as typeof deleteCrmListAttribute
    this.updateCrmListAttribute = ((options: Parameters<typeof updateCrmListAttribute>[0]) => updateCrmListAttribute({ ...options, client })) as typeof updateCrmListAttribute
    this.listCrmListEntries = ((options: Parameters<typeof listCrmListEntries>[0]) => listCrmListEntries({ ...options, client })) as typeof listCrmListEntries
    this.createCrmListEntry = ((options: Parameters<typeof createCrmListEntry>[0]) => createCrmListEntry({ ...options, client })) as typeof createCrmListEntry
    this.deleteCrmListEntry = ((options: Parameters<typeof deleteCrmListEntry>[0]) => deleteCrmListEntry({ ...options, client })) as typeof deleteCrmListEntry
    this.getCrmListEntry = ((options: Parameters<typeof getCrmListEntry>[0]) => getCrmListEntry({ ...options, client })) as typeof getCrmListEntry
    this.updateCrmListEntry = ((options: Parameters<typeof updateCrmListEntry>[0]) => updateCrmListEntry({ ...options, client })) as typeof updateCrmListEntry
    this.deleteCrmNote = ((options: Parameters<typeof deleteCrmNote>[0]) => deleteCrmNote({ ...options, client })) as typeof deleteCrmNote
    this.getCrmNote = ((options: Parameters<typeof getCrmNote>[0]) => getCrmNote({ ...options, client })) as typeof getCrmNote
    this.updateCrmNote = ((options: Parameters<typeof updateCrmNote>[0]) => updateCrmNote({ ...options, client })) as typeof updateCrmNote
    this.listCrmObjects = ((options: Parameters<typeof listCrmObjects>[0]) => listCrmObjects({ ...options, client })) as typeof listCrmObjects
    this.createCrmObject = ((options: Parameters<typeof createCrmObject>[0]) => createCrmObject({ ...options, client })) as typeof createCrmObject
    this.deleteCrmObject = ((options: Parameters<typeof deleteCrmObject>[0]) => deleteCrmObject({ ...options, client })) as typeof deleteCrmObject
    this.getCrmObject = ((options: Parameters<typeof getCrmObject>[0]) => getCrmObject({ ...options, client })) as typeof getCrmObject
    this.updateCrmObject = ((options: Parameters<typeof updateCrmObject>[0]) => updateCrmObject({ ...options, client })) as typeof updateCrmObject
    this.listCrmObjectAttributes = ((options: Parameters<typeof listCrmObjectAttributes>[0]) => listCrmObjectAttributes({ ...options, client })) as typeof listCrmObjectAttributes
    this.createCrmObjectAttribute = ((options: Parameters<typeof createCrmObjectAttribute>[0]) => createCrmObjectAttribute({ ...options, client })) as typeof createCrmObjectAttribute
    this.deleteCrmObjectAttribute = ((options: Parameters<typeof deleteCrmObjectAttribute>[0]) => deleteCrmObjectAttribute({ ...options, client })) as typeof deleteCrmObjectAttribute
    this.updateCrmObjectAttribute = ((options: Parameters<typeof updateCrmObjectAttribute>[0]) => updateCrmObjectAttribute({ ...options, client })) as typeof updateCrmObjectAttribute
    this.previewCrmObjectDeletion = ((options: Parameters<typeof previewCrmObjectDeletion>[0]) => previewCrmObjectDeletion({ ...options, client })) as typeof previewCrmObjectDeletion
    this.getCrmObjectQuality = ((options: Parameters<typeof getCrmObjectQuality>[0]) => getCrmObjectQuality({ ...options, client })) as typeof getCrmObjectQuality
    this.listCrmRecords = ((options: Parameters<typeof listCrmRecords>[0]) => listCrmRecords({ ...options, client })) as typeof listCrmRecords
    this.createCrmRecord = ((options: Parameters<typeof createCrmRecord>[0]) => createCrmRecord({ ...options, client })) as typeof createCrmRecord
    this.upsertCrmRecord = ((options: Parameters<typeof upsertCrmRecord>[0]) => upsertCrmRecord({ ...options, client })) as typeof upsertCrmRecord
    this.archiveCrmRecord = ((options: Parameters<typeof archiveCrmRecord>[0]) => archiveCrmRecord({ ...options, client })) as typeof archiveCrmRecord
    this.getCrmRecord = ((options: Parameters<typeof getCrmRecord>[0]) => getCrmRecord({ ...options, client })) as typeof getCrmRecord
    this.updateCrmRecord = ((options: Parameters<typeof updateCrmRecord>[0]) => updateCrmRecord({ ...options, client })) as typeof updateCrmRecord
    this.listCrmActivities = ((options: Parameters<typeof listCrmActivities>[0]) => listCrmActivities({ ...options, client })) as typeof listCrmActivities
    this.listCrmNotes = ((options: Parameters<typeof listCrmNotes>[0]) => listCrmNotes({ ...options, client })) as typeof listCrmNotes
    this.createCrmNote = ((options: Parameters<typeof createCrmNote>[0]) => createCrmNote({ ...options, client })) as typeof createCrmNote
    this.listCrmTasks = ((options: Parameters<typeof listCrmTasks>[0]) => listCrmTasks({ ...options, client })) as typeof listCrmTasks
    this.createCrmTask = ((options: Parameters<typeof createCrmTask>[0]) => createCrmTask({ ...options, client })) as typeof createCrmTask
    this.deleteCrmTask = ((options: Parameters<typeof deleteCrmTask>[0]) => deleteCrmTask({ ...options, client })) as typeof deleteCrmTask
    this.getCrmTask = ((options: Parameters<typeof getCrmTask>[0]) => getCrmTask({ ...options, client })) as typeof getCrmTask
    this.updateCrmTask = ((options: Parameters<typeof updateCrmTask>[0]) => updateCrmTask({ ...options, client })) as typeof updateCrmTask
  }
}
