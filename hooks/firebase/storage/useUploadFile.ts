import {
  StorageError,
  StorageReference,
  uploadBytesResumable,
  UploadMetadata,
  UploadResult,
  UploadTaskSnapshot,
} from 'firebase/storage'
import { useMemo, useState } from 'react'

/**
 * An enumeration of the possible states of the upload task.
 * @public
 * @param function - {@link StorageReference} where data should be uploaded.
 * @param data - The data to upload.
 * @param metadata - Metadata for the data to upload.
 * @returns A Promise containing an {@link UploadResult} | undefined. The snapshot of the upload task.
 */
export type UploadFileHook = [
  /**
   * An enumeration of the possible states of the upload task.
   * @public
   * @param storageRef - {@link StorageReference} where data should be uploaded.
   * @param data - The data to upload.
   * @param metadata - Metadata for the data to upload.
   * @returns An {@link Promise<UploadResult | undefined>} - The snapshot of the upload task.
   */
  (
    storageRef: StorageReference,
    data: Blob | Uint8Array | ArrayBuffer,
    metadata?: UploadMetadata | undefined,
  ) => Promise<UploadResult | undefined>,
  boolean,
  UploadTaskSnapshot | undefined,
  StorageError | undefined,
]

/**
 * Uploads data to object's location(reference).
 * The upload can be paused and resumed, and exposes progress updates.
 * @public
 * @returns An {@link UploadFileHook}
 */
export default (): UploadFileHook => {
  const [uploading, setUploading] = useState<boolean>(false)
  const [snapshot, setSnapshot] = useState<UploadTaskSnapshot>()
  const [error, setError] = useState<StorageError>()

  const uploadFile = async (
    storageRef: StorageReference,
    data: Blob | Uint8Array | ArrayBuffer,
    metadata?: UploadMetadata | undefined,
  ): Promise<UploadResult | undefined> => {
    return new Promise((resolve, reject) => {
      setUploading(true)
      setError(undefined)
      const uploadTask = uploadBytesResumable(storageRef, data, metadata)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          setSnapshot(snapshot)
        },
        (error) => {
          setUploading(false)
          setError(error)
          resolve(undefined)
        },
        () => {
          setUploading(false)
          setSnapshot(undefined)
          resolve({
            metadata: uploadTask.snapshot.metadata,
            ref: uploadTask.snapshot.ref,
          })
        },
      )
    })
  }

  /**
   * Resets the state of the hook.
   */
  const resArray: UploadFileHook = [uploadFile, uploading, snapshot, error]
  return useMemo<UploadFileHook>(() => resArray, resArray)
}
