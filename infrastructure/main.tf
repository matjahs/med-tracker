resource "azurerm_resource_group" "main" {
  name     = "med-tracker-rg"
  location = "West Europe"
}

resource "azurerm_virtual_network" "main" {
  name                = "med-tracker-vnet"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  address_space       = ["10.0.0.0/16"]

  subnet {
    name           = "default"
    address_prefix = "10.0.1.0/24"
  }
}

resource "random_integer" "main" {
  min = 10000
  max = 99999
}

resource "azurerm_cosmosdb_account" "main" {
  name                = "med-tracker-cosmosdb-user"
  resource_group_name = "med-tracker-rg"

  enable_free_tier = true

  ip_range_filter                   = "104.42.195.92,40.76.54.131,52.176.6.30,52.169.50.45,52.187.184.26,92.110.128.108"
  is_virtual_network_filter_enabled = true
  kind                              = "GlobalDocumentDB"
  location                          = "westeurope"
  offer_type                        = "Standard"
  public_network_access_enabled     = true

  capabilities {
    name = "EnableTable"
  }

  capacity {
    total_throughput_limit = 1000
  }

  consistency_policy {
    consistency_level       = "BoundedStaleness"
    max_interval_in_seconds = 86400
    max_staleness_prefix    = 1000000
  }

  geo_location {
    location          = "westeurope"
    zone_redundant    = false
    failover_priority = 0
  }

  virtual_network_rule {
    ignore_missing_vnet_service_endpoint = false
  }
}

