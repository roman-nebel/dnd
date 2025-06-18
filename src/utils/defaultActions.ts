export function showElement(ref: HTMLElement) {
  setTimeout(() => {
    if (ref) {
      ref.style.display = 'inherit'
      ref.style.opacity = '1'
      ref.style.pointerEvents = 'auto'
    }
  }, 0)
}

export function hideElement(ref: HTMLElement) {
  setTimeout(() => {
    if (ref) {
      ref.style.display = 'none'
      ref.style.opacity = '0'
      ref.style.pointerEvents = 'none'
    }
  }, 0)
}
