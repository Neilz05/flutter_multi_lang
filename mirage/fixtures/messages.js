const data = `2025 Oct  2 02:39:09 etisalathub ubus-cli: "-- START --"
2025 Oct  2 02:39:09 etisalathub ubus-cli: > WANManager.WANMode?
2025 Oct  2 02:39:09 etisalathub ubus-cli: > !amx exit
2025 Oct  2 02:39:09 etisalathub ubus-cli: "-- STOP --"
2025 Oct  2 02:39:15 etisalathub pppd[4381]: sent [LCP EchoReq id=0x9 magic=0x874c1d5c]
2025 Oct  2 02:39:15 etisalathub pppd[4381]: rcvd [LCP EchoRep id=0x9 magic=0xb0324844]
2025 Oct  2 02:39:19 etisalathub time-manager: sequent - [i]at least one source 213.42.2.60 is still valid - (is_ntp_synchronised@sequential.c:118)
2025 Oct  2 02:39:19 etisalathub time-manager: sequent - [i]leap status [0] - all sources timeout [no] - (is_ntp_synchronised@sequential.c:124)
2025 Oct  2 02:39:19 etisalathub time-manager: sequent - [i]NTP synchronised - (sync_check_timer_timeout@sequential.c:284)
2025 Oct  2 02:39:19 etisalathub time-manager: sequent - [i]Sync check within [10s] - (sync_check@sequential.c:79)
2025 Oct  2 02:46:50 etisalathub odhcp6c[13421]: Starting REQUEST transaction (timeout 4294967295s, max rc 10)
2025 Oct  2 02:46:50 etisalathub odhcp6c[13421]: Send REQUEST message (elapsed 0ms, rc 0)
2025 Oct  2 02:46:50 etisalathub odhcp6c[13421]: Got a valid REPLY after 1ms
2025 Oct  2 02:46:50 etisalathub odhcp6c[13421]: IA_PD 0001 T1 60 T2 96
2025 Oct  2 02:46:50 etisalathub odhcp6c[13421]: 2001:4457:1021:6c00::/56 preferred 108 valid 120
2025 Oct  2 02:46:50 etisalathub odhcp6c[13421]: T1 60s, T2 96s, T3 120s
2025 Oct  2 02:46:50 etisalathub odhcp6c[13421]: entering stateful-mode on pppoe-wan
2025 Oct  2 02:46:50 etisalathub odhcp6c[13421]: Starting <POLL> transaction (timeout 60s, max rc 0)
2025 Oct  2 02:46:50 etisalathub time-manager: uci     - [i]failed to call UCI set, function returned 2 - (uci_call@uci.c:146)
2025 Oct  2 02:46:50 etisalathub time-manager: sequent - [i]ntp sync interval set to 65536(16) - (update_ntp_sync_interval@sequential.c:95)
2025 Oct  2 02:46:50 etisalathub chronyd[9954]: chronyd exiting
2025 Oct  2 02:46:50 etisalathub time-manager: sequent - [I]Sequential mode enabled - (sequential_start@sequential.c:243)
2025 Oct  2 02:46:50 etisalathub time-manager: sequent - [I]SyncInterval [65536s (16)] - RetryInterval [30s] - (sequential_start@sequential.c:244)
2025 Oct  2 02:46:50 etisalathub time-manager: sequent - [I]Sources List: - (sequential_start@sequential.c:245)
2025 Oct  2 02:46:50 etisalathub time-manager: sequent - [I]-> server ntp1.emirates.net.ae iburst minpoll 16 maxpoll 16 version 3 - (sequential_start@sequential.c:248)
2025 Oct  2 02:46:50 etisalathub time-manager: sequent - [I]-> server ntp2.emirates.net.ae iburst minpoll 16 maxpoll 16 version 3 - (sequential_start@sequential.c:248)
2025 Oct  2 02:46:50 etisalathub time-manager: sequent - [I]delay first reload for 5s - (sequential_start@sequential.c:251)
2025 Oct  2 02:46:50 etisalathub chronyd[13455]: chronyd version DEVELOPMENT starting (+CMDMON +NTP +REFCLOCK -RTC +PRIVDROP -SCFILTER -SIGND +ASYNCDNS -NTS -SECHASH +IPV6 -DEBUG)
2025 Oct  2 02:46:50 etisalathub chronyd[13455]: Frequency 0.000 +/- 1000000.000 ppm read from /var/run/chrony/drift
2025 Oct  2 02:46:50 etisalathub time-manager: chronyc - [i]subprocess exit code [0] - (chronyc_cmd_refresh@chronyc.c:214)
2025 Oct  2 02:46:50 etisalathub time-manager: mod-chr - [i]leap_status 0 - (get_sync_state@ntp_state.c:86)
2025 Oct  2 02:46:50 etisalathub time-manager: time-ma - [i]Client interface is up - (client_changed_state_cb@server/netmodel.c:221)
2025 Oct  2 02:46:51 etisalathub tr181-upnp: upnp    - [i]Reload config - (reload_miniupnpd_cb@upnp_miniupnp.c:343)
2025 Oct  2 02:46:51 etisalathub miniupnpd[9956]: should send external iface address change notification(s)
2025 Oct  2 02:46:51 etisalathub miniupnpd[9956]: SendNATPMPPublicAddressChangeNotification: cannot get public IP address, stopping
2025 Oct  2 02:46:51 etisalathub miniupnpd[9956]: amx_is_wan_up: 0 (Device.Logical.Interface.1.X_PRPL-COM_WAN.)
2025 Oct  2 02:46:51 etisalathub miniupnpd[9956]: get_redirect_rule_by_index: -1
2025 Oct  2 02:46:52 etisalathub ubus-cli: "-- START --"
2025 Oct  2 02:46:52 etisalathub ubus-cli: > WANManager.OperationMode?
2025 Oct  2 02:46:52 etisalathub ubus-cli: > !amx exit`;

module.exports = { data };