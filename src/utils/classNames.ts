export default function setClassNames(
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
  const existing = setClassNames(existingClassNames)
  const additional = setClassNames(newClassNames)
  return existing ? `${existing} ${additional}` : additional
}

export function removeClassNames(
  existingClassNames: string | string[],
  classNamesToRemove: string | string[]
): string {
  const existing = setClassNames(existingClassNames).split(' ')
  const toRemove = setClassNames(classNamesToRemove).split(' ')
  return existing.filter((name) => !toRemove.includes(name)).join(' ')
}
