export function getEndPointSearch(config_menu_rfid_screen, searchValue) {

  const enableStockOpname = config_menu_rfid_screen.enable_stock_opname
  const enableScanItem = config_menu_rfid_screen.enable_scan_item
  const enableScanMonitoring = config_menu_rfid_screen.enable_scan_monitoring
  const enableGateScanning = config_menu_rfid_screen.enable_gate_scanning

  let endPoint = ''

  if (enableStockOpname) {
    endPoint = `/stoktake?asset_id=${encodeURIComponent(searchValue)}`
  } else if (enableScanItem) {
    endPoint = `/item/search?asset_id=${encodeURIComponent(searchValue)}`
  } else if (enableScanMonitoring) {
    endPoint = `/tm/search?asset_id=${encodeURIComponent(searchValue)}`
  } else if (enableGateScanning) {
    endPoint = `/gatescan?tag_number=${encodeURIComponent(searchValue)}`
  }

  return endPoint
}