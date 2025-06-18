export default function setlassNames(
  classNames: string | (string | null)[]
): string {
  if (typeof classNames === 'string') {
    return classNames.trim()
  }
  if (!Array.isArray(classNames)) {
    return ''
  }
  if (classNames.length === 0) {
    return ''
  }
  const stringClassNames = classNames.filter((name) => typeof name === 'string')
  return stringClassNames.join(' ').trim()
}

export function addClassNames(
  existingClassNames: string | string[],
  newClassNames: string | string[]
): string {
  const existing = setlassNames(existingClassNames)
  const additional = setlassNames(newClassNames)
  return existing ? `${existing} ${additional}` : additional
}

export function removeClassNames(
  existingClassNames: string | string[],
  classNamesToRemove: string | string[]
): string {
  const existing = setlassNames(existingClassNames).split(' ')
  const toRemove = setlassNames(classNamesToRemove).split(' ')
  return existing.filter((name) => !toRemove.includes(name)).join(' ')
}

export function getDroppableClassNames(
  canBeDropped: boolean,
  readyToDrop: boolean,
  classNames?: string | string[]
): string {
  const baseClass = classNames ? setlassNames(classNames) : ''
  const droppableClass = canBeDropped ? 'can-be-dropped' : 'cannot-be-dropped'
  const readyClass = readyToDrop ? 'ready-to-drop' : 'not-ready-to-drop'

  return addClassNames(baseClass, [droppableClass, readyClass])
}
