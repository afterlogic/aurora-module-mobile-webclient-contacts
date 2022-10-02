import types from 'src/utils/types'
// import store from 'src/store'
// import { getApiHost } from 'src/api/helpers'

// import { fileFormats } from './formats'

const parseContact = (item) => {
    item.loading = false
    item.isSelected = false
    return item
    // return {
    //     loading: false,
    //     isSelected: false,
        // id: types.pString(item?.Id),
    //   content: types.pString(file.Content),
    //   size: types.pInt(file.Size),
    //   file: file,
    //   hash: types.pString(file.Hash),
    //   name: types.pString(file.Name),
    //   type: types.pString(file.Type),
    //   lastModified: types.pInt(file.LastModified),
    //   owner: types.pString(file.Owner),
    //   fullPath: types.pString(file.FullPath),
    //   path: types.pString(file.Path),
    //   isFolder: types.pBool(file.IsFolder),
    //   shares: types.pArray(file?.ExtendedProps?.Shares),
    //   publicLink: getPublicLink(
    //     types.pString(file?.ExtendedProps?.PublicLink)
    //   ),
    //   linkPassword: '',
    //   downloadUrl: types.pString(file?.Actions?.download?.url),
    //   eitUrl: types.pString(file?.Actions?.edit?.url),
    //   viewUrl: types.pString(file?.Actions?.view?.url),
    //   decryptViewUrl: '',
    //   openUrl: types.pString(file?.Actions?.open?.url),
    //   paranoidKey: types.pString(file?.ExtendedProps?.ParanoidKey),
    //   initializationVector: types.pString(
    //     file?.ExtendedProps?.InitializationVector
    //   ),
    //   thumbnailUrl: types.pString(file?.ThumbnailUrl),
    //   contentType: types.pString(file.ContentType),
    //   cancelToken: null,
    //   downloading: false,
    //   percentDownloading: 0,
    //   isSelected: false,
    //   isCopied: isCopied(types.pString(file.Hash)),
    //   isImg: isImg(types.pString(file.Name)),
    //   isArchive: !!file?.Actions?.list,
    //   sharedWithMeAccess: types.pInt(file?.ExtendedProps?.SharedWithMeAccess),
    //   decryptionProgress: false
    // }
  }

export const getParseContacts = (items) => {
  const contacts = []
  items.forEach((item) => {
    contacts.push(parseContact(item))
  })
  return contacts
}

export const getFilteredItems = (items, key) => {
    return items.filter((item) => {
      if (item[key]) {
        return item
      }
    })
  }