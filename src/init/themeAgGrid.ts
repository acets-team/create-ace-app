import { Theme, themeQuartz } from 'ag-grid-community'

let myTheme: undefined | Theme<any>

export function themeAgGrid() {
  if (!myTheme) {
    myTheme = themeQuartz.withParams({
      fontSize: '1.71rem',
      headerFontWeight: 600,
      foregroundColor: 'white',
      backgroundColor: 'var(--bg-color)',
    })
  }

  return myTheme
}
