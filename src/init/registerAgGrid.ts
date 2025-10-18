import { ModuleRegistry, ClientSideRowModelModule, DateFilterModule, TextFilterModule, CellStyleModule } from 'ag-grid-community'

let registered = false

export function registerAgGrid() {
  if (!registered) {
    ModuleRegistry.registerModules([ClientSideRowModelModule, DateFilterModule, TextFilterModule, CellStyleModule])
    registered = true
  }
}
