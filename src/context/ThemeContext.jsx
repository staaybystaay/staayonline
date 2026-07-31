// The site is fixed to the light theme — the light/dark toggle feature
// was removed. This wrapper is kept only so the "theme-root" element and
// its CSS variables (used throughout the app's styles) keep working.
export function ThemeProvider({ children }) {
  return (
    <div data-theme="light" className="theme-root">
      {children}
    </div>
  )
}
