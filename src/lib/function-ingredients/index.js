function getEndPointSearch(config_menu_rfid_screen,
  searchValue,
  selectedSPrint = null,
  activeCameraBle = false,
  activeCameraRfid = false) {

  const enableStockOpname = config_menu_rfid_screen.enable_stock_opname || false
  const enableMaterialTest = config_menu_rfid_screen.enable_material_test || false
  const enableScanItem = config_menu_rfid_screen.enable_scan_item || false
  const enableScanMonitoring = config_menu_rfid_screen.enable_scan_monitoring || false
  const enableGateScanning = config_menu_rfid_screen.enable_gate_scanning || false
  const enableTagingBle = config_menu_rfid_screen.enable_taging_ble || false

  let endPoint = ''

  if (enableStockOpname) {
    endPoint = `/stock_opname?tag_number=${encodeURIComponent(searchValue)}&sprint=${encodeURIComponent(selectedSPrint)}`
  } else if (enableMaterialTest) {
    endPoint = `/material_test?tag_number=${encodeURIComponent(searchValue)}`
  } else if (enableScanItem) {
    endPoint = `/item/search?tag_number=${encodeURIComponent(searchValue)}`
  } else if (enableScanMonitoring) {
    endPoint = `/tm/search?tag_number=${encodeURIComponent(searchValue)}`
  } else if (enableGateScanning) {
    endPoint = `/gatescan?tag_number=${encodeURIComponent(searchValue)}`
  } else if (enableTagingBle) {
    if (activeCameraBle) {
      endPoint = `/ble?ble_code=${encodeURIComponent(searchValue)}`
    }
    if (activeCameraRfid) {
      endPoint = `/item/search?tag_number=${encodeURIComponent(searchValue)}`
    }
  }

  return endPoint
}

function getEndPointSPrint(config_menu_rfid_screen) {
  const enableStockOpname = config_menu_rfid_screen.enable_stock_opname || false
  const enableMaterialTest = config_menu_rfid_screen.enable_material_test || false

  let endPoint = ''

  if (enableStockOpname) {
    endPoint = '/stock_opname/list'
  } else if (enableMaterialTest) {
    endPoint = '/material_test/list'
  }

  return endPoint
}

export { getEndPointSearch, getEndPointSPrint }