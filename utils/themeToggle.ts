export function toggleThemeWithTransition(
  setTheme: (theme: string) => void,
  nextTheme: string,
) {
  if (typeof document === 'undefined') {
    setTheme(nextTheme)
    return
  }

  var startViewTransition = document.startViewTransition

  if (!startViewTransition) {
    setTheme(nextTheme)
    return
  }

  startViewTransition.call(document, function () {
    setTheme(nextTheme)
  })
}
