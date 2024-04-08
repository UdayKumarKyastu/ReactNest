import { ImporterError } from './UploadResponse'

export enum ImportState {
  Processing = 'PROCESSING',
  Completed = 'COMPLETED',
}

export interface ImportStatus {
  status: ImportState
  errors: ImporterError[]
  triggeredAt: string
  completedAt: string
}
