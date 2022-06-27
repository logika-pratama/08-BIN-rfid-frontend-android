export function getEndPointSearch(config_menu_rfid_screen, searchValue) {

  const enableStockOpname = config_menu_rfid_screen.enable_stock_opname || false
  const enableMaterialTest = config_menu_rfid_screen.enable_material_test || false
  const enableScanItem = config_menu_rfid_screen.enable_scan_item || false
  const enableScanMonitoring = config_menu_rfid_screen.enable_scan_monitoring || false
  const enableGateScanning = config_menu_rfid_screen.enable_gate_scanning || false

  let endPoint = ''

  if (enableStockOpname) {
    endPoint = `/stoktake?tag_number=${encodeURIComponent(searchValue)}`
  } else if (enableMaterialTest) {
    endPoint = `/material_test?tag_number=${encodeURIComponent(searchValue)}`
  } else if (enableScanItem) {
    endPoint = `/item/search?tag_number=${encodeURIComponent(searchValue)}`
  } else if (enableScanMonitoring) {
    endPoint = `/tm/search?tag_number=${encodeURIComponent(searchValue)}`
  } else if (enableGateScanning) {
    endPoint = `/gatescan?tag_number=${encodeURIComponent(searchValue)}`
  }

  return endPoint
}