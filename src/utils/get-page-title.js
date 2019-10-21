import defaultSettings from '@/settings'

const title = "乐居管理系统"

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
