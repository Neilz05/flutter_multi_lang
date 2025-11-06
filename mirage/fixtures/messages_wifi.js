const data = `2025 Mar 24 06:31:55 prplOS wld: wld     - [!]WLD plugin started - (_wld_main@wld_plugin.c:137)
2025 Mar 24 06:31:55 prplOS wld: wld     - [!]Initializing wld (Feb 27 2025:08:00:23) - (wld_plugin_start@wld.c:178)
2025 Mar 24 06:31:55 prplOS wld: wld     - [x]fail to scan dir /usr/lib/amx/wld/modules - (wld_vendorModuleMgr_loadExternalDir@VendorModule/wld_vendorModule_mgr.c:259)
2025 Mar 24 06:31:55 prplOS wld: wld     - [!]no modules registered - (s_loadSharedObj@VendorModule/wld_vendorModule_mgr.c:211)
2025 Mar 24 06:31:55 prplOS wld: gen     - [!]Generic init - (wifiGen_init@wifiGen.c:93)
2025 Mar 24 06:31:55 prplOS wld: nm_popu - [!]Waiting for app:start - (_mod_netmodel_main@mod_netmodel.c:554)
2025 Mar 24 06:31:56 prplOS wld: wld     - [!]data model is loaded - (_app_start@wld_plugin.c:95)
2025 Mar 24 06:31:56 prplOS wld: gen     - [!]no vdr radio neither wiphy dev: WAIT FOR DETECTION - (wifiGen_waitForGenRadios@wifiGen.c:263)
2025 Mar 24 06:31:56 prplOS wld: mod_pcm - [!]File '/etc/config/wld/pcm/wld-del.json' is not available - (pcm_inst_read@mod_pcm_inst.c:246)
2025 Mar 24 06:31:56 prplOS wld: mod_pcm - [!]File '/etc/config/wld/pcm/wld-add.json' is not available - (pcm_inst_read@mod_pcm_inst.c:246)`

module.exporst = { data };