const data = [
  {
    "parameters": {
      "SupportedServices": "desec.io,dnshome.de,dnsdynamic.org,mythic-beasts.com,route53-v1,dyndns.org,godaddy.com-v1,dynv6.com,changeip.com,afraid.org-v2-token,google.com,duiadns.net,afraid.org-basicauth,moniker.com,mydns.jp,inwx.de,hosting.de,twodns.de,3322.org,oray.com,strato.com,opendns.com,core-networks.de,dnsmadeeasy.com,dynu.com,dyndns.it,mythic-beasts.com (API v2),udmedia.de,goip.de,all-inkl.com,do.de,he.net,loopia.se,dnsmax.com,thatip.com,dnsomatic.com,afraid.org-keyauth,zoneedit.com,simply.com,domopoli.de,dnsexit.com,nsupdate.info,freedns.42.pl,infomaniak.com,joker.com,no-ip.pl,ddnss.de,duckdns.org,ovh.com,now-dns.com,schokokeks.org,njal.la,bind-nsupdate,namecheap.com,dnsever.com,dy.fi,dhis.org,ipnodns.ru,system-ns.com,no-ip.com,dnspark.com,cloudflare.com-v4,xlhost.de,ddo.jp,regfish.de,sitelutions.com,easydns.com,variomedia.de,myonlineportal.net,selfhost.de,dyn.com,afraid.org-v2-basic,spdyn.de,custom",
      "ServerNumberOfEntries": 73,
      "ClientNumberOfEntries": 1
    },
    "path": "Device.DynamicDNS."
  },
  {
    "parameters": {
      "HostnameNumberOfEntries": 1,
      "Username": "UsernameAAA",
      "Password": "PasswordBBB",
      "Interface": "Device.IP.Interface.3.",
      "X_PRPL-COM_DNSServer": "",
      "Status": "Error_Misconfigured",
      "LastError": "MISCONFIGURATION_ERROR",
      "X_PRPL-COM_IPVersion": 4,
      "Enable": 1,
      "X_PRPL-COM_IP": "",
      "Alias": "default-client",
      "Server": "duiadns.net"
    },
    "path": "Device.DynamicDNS.Client.1."
  },
  {
    "parameters": {
      "Enable": 1,
      "LastUpdate": "0001-01-01T00:00:00Z",
      "Name": "NameCCC",
      "Status": "Error"
    },
    "path": "Device.DynamicDNS.Client.1.Hostname.1."
  },
  {
    "parameters": {
      "ServiceName": "desec.io",
      "ServerPort": 0,
      "Protocol": "HTTPS",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "update.dedyn.io",
      "MaxRetries": 0,
      "Name": "uci_desec.io",
      "Alias": "cpe-desec_io",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.1."
  },
  {
    "parameters": {
      "ServiceName": "afraid.org-v2-token",
      "ServerPort": 0,
      "Protocol": "HTTPS",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "sync.afraid.org",
      "MaxRetries": 0,
      "Name": "uci_afraid.org-v2-token",
      "Alias": "cpe-afraid_org-v2-token",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.10."
  },
  {
    "parameters": {
      "ServiceName": "google.com",
      "ServerPort": 0,
      "Protocol": "HTTPS",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]domains.google.com",
      "MaxRetries": 0,
      "Name": "uci_google.com",
      "Alias": "cpe-google_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.11."
  },
  {
    "parameters": {
      "ServiceName": "duiadns.net",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "ip.duiadns.net",
      "MaxRetries": 0,
      "Name": "uci_duiadns.net",
      "Alias": "cpe-duiadns_net",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.12."
  },
  {
    "parameters": {
      "ServiceName": "afraid.org-basicauth",
      "ServerPort": 0,
      "Protocol": "HTTPS",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]freedns.afraid.org",
      "MaxRetries": 0,
      "Name": "uci_afraid.org-basicauth",
      "Alias": "cpe-afraid_org-basicauth",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.13."
  },
  {
    "parameters": {
      "ServiceName": "moniker.com",
      "ServerPort": 0,
      "Protocol": "HTTPS",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "dynamicdns.key-systems.net",
      "MaxRetries": 0,
      "Name": "uci_moniker.com",
      "Alias": "cpe-moniker_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.14."
  },
  {
    "parameters": {
      "ServiceName": "mydns.jp",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "mydns.jp",
      "MaxRetries": 0,
      "Name": "uci_mydns.jp",
      "Alias": "cpe-mydns_jp",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.15."
  },
  {
    "parameters": {
      "ServiceName": "inwx.de",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]dyndns.inwx.com",
      "MaxRetries": 0,
      "Name": "uci_inwx.de",
      "Alias": "cpe-inwx_de",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.16."
  },
  {
    "parameters": {
      "ServiceName": "hosting.de",
      "ServerPort": 0,
      "Protocol": "HTTPS",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]ddns.hosting.de",
      "MaxRetries": 0,
      "Name": "uci_hosting.de",
      "Alias": "cpe-hosting_de",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.17."
  },
  {
    "parameters": {
      "ServiceName": "twodns.de",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]update.twodns.de",
      "MaxRetries": 0,
      "Name": "uci_twodns.de",
      "Alias": "cpe-twodns_de",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.18."
  },
  {
    "parameters": {
      "ServiceName": "3322.org",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]members.3322.org",
      "MaxRetries": 0,
      "Name": "uci_3322.org",
      "Alias": "cpe-3322_org",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.19."
  },
  {
    "parameters": {
      "ServiceName": "dnshome.de",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]dnshome.de",
      "MaxRetries": 0,
      "Name": "uci_dnshome.de",
      "Alias": "cpe-dnshome_de",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.2."
  },
  {
    "parameters": {
      "ServiceName": "oray.com",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]ddns.oray.com",
      "MaxRetries": 0,
      "Name": "uci_oray.com",
      "Alias": "cpe-oray_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.20."
  },
  {
    "parameters": {
      "ServiceName": "strato.com",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]dyndns.strato.com",
      "MaxRetries": 0,
      "Name": "uci_strato.com",
      "Alias": "cpe-strato_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.21."
  },
  {
    "parameters": {
      "ServiceName": "opendns.com",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]updates.opendns.com",
      "MaxRetries": 0,
      "Name": "uci_opendns.com",
      "Alias": "cpe-opendns_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.22."
  },
  {
    "parameters": {
      "ServiceName": "core-networks.de",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]dyndns.core-networks.de",
      "MaxRetries": 0,
      "Name": "uci_core-networks.de",
      "Alias": "cpe-core-networks_de",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.23."
  },
  {
    "parameters": {
      "ServiceName": "dnsmadeeasy.com",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "cp.dnsmadeeasy.com",
      "MaxRetries": 0,
      "Name": "uci_dnsmadeeasy.com",
      "Alias": "cpe-dnsmadeeasy_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.24."
  },
  {
    "parameters": {
      "ServiceName": "dynu.com",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "api.dynu.com",
      "MaxRetries": 0,
      "Name": "uci_dynu.com",
      "Alias": "cpe-dynu_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.25."
  },
  {
    "parameters": {
      "ServiceName": "dyndns.it",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]update.dyndns.it",
      "MaxRetries": 0,
      "Name": "uci_dyndns.it",
      "Alias": "cpe-dyndns_it",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.26."
  },
  {
    "parameters": {
      "ServiceName": "mythic-beasts.com (API v2)",
      "ServerPort": 0,
      "Protocol": "HTTPS",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]ipv4.api.mythic-beasts.com",
      "MaxRetries": 0,
      "Name": "uci_mythic-beasts.com (API v2)",
      "Alias": "cpe-mythic-beasts_com (API v2)",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.27."
  },
  {
    "parameters": {
      "ServiceName": "udmedia.de",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]udmedia.de",
      "MaxRetries": 0,
      "Name": "uci_udmedia.de",
      "Alias": "cpe-udmedia_de",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.28."
  },
  {
    "parameters": {
      "ServiceName": "goip.de",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "goip.de",
      "MaxRetries": 0,
      "Name": "uci_goip.de",
      "Alias": "cpe-goip_de",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.29."
  },
  {
    "parameters": {
      "ServiceName": "dnsdynamic.org",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]dnsdynamic.org",
      "MaxRetries": 0,
      "Name": "uci_dnsdynamic.org",
      "Alias": "cpe-dnsdynamic_org",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.3."
  },
  {
    "parameters": {
      "ServiceName": "all-inkl.com",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]dyndns.kasserver.com",
      "MaxRetries": 0,
      "Name": "uci_all-inkl.com",
      "Alias": "cpe-all-inkl_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.30."
  },
  {
    "parameters": {
      "ServiceName": "do.de",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "ddns.do.de",
      "MaxRetries": 0,
      "Name": "uci_do.de",
      "Alias": "cpe-do_de",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.31."
  },
  {
    "parameters": {
      "ServiceName": "he.net",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[DOMAIN][PASSWORD]dyn.dns.he.net",
      "MaxRetries": 0,
      "Name": "uci_he.net",
      "Alias": "cpe-he_net",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.32."
  },
  {
    "parameters": {
      "ServiceName": "loopia.se",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]dns.loopia.se",
      "MaxRetries": 0,
      "Name": "uci_loopia.se",
      "Alias": "cpe-loopia_se",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.33."
  },
  {
    "parameters": {
      "ServiceName": "dnsmax.com",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "update.dnsmax.com",
      "MaxRetries": 0,
      "Name": "uci_dnsmax.com",
      "Alias": "cpe-dnsmax_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.34."
  },
  {
    "parameters": {
      "ServiceName": "thatip.com",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "update.dnsmax.com",
      "MaxRetries": 0,
      "Name": "uci_thatip.com",
      "Alias": "cpe-thatip_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.35."
  },
  {
    "parameters": {
      "ServiceName": "dnsomatic.com",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]updates.dnsomatic.com",
      "MaxRetries": 0,
      "Name": "uci_dnsomatic.com",
      "Alias": "cpe-dnsomatic_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.36."
  },
  {
    "parameters": {
      "ServiceName": "afraid.org-keyauth",
      "ServerPort": 0,
      "Protocol": "HTTPS",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "freedns.afraid.org",
      "MaxRetries": 0,
      "Name": "uci_afraid.org-keyauth",
      "Alias": "cpe-afraid_org-keyauth",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.37."
  },
  {
    "parameters": {
      "ServiceName": "zoneedit.com",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]dynamic.zoneedit.com",
      "MaxRetries": 0,
      "Name": "uci_zoneedit.com",
      "Alias": "cpe-zoneedit_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.38."
  },
  {
    "parameters": {
      "ServiceName": "simply.com",
      "ServerPort": 0,
      "Protocol": "HTTPS",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]api.simply.com",
      "MaxRetries": 0,
      "Name": "uci_simply.com",
      "Alias": "cpe-simply_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.39."
  },
  {
    "parameters": {
      "ServiceName": "mythic-beasts.com",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "dnsapi4.mythic-beasts.com",
      "MaxRetries": 0,
      "Name": "uci_mythic-beasts.com",
      "Alias": "cpe-mythic-beasts_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.4."
  },
  {
    "parameters": {
      "ServiceName": "domopoli.de",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]dyndns.domopoli.de",
      "MaxRetries": 0,
      "Name": "uci_domopoli.de",
      "Alias": "cpe-domopoli_de",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.40."
  },
  {
    "parameters": {
      "ServiceName": "dnsexit.com",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "update.dnsexit.com",
      "MaxRetries": 0,
      "Name": "uci_dnsexit.com",
      "Alias": "cpe-dnsexit_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.41."
  },
  {
    "parameters": {
      "ServiceName": "nsupdate.info",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]ipv4.nsupdate.info",
      "MaxRetries": 0,
      "Name": "uci_nsupdate.info",
      "Alias": "cpe-nsupdate_info",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.42."
  },
  {
    "parameters": {
      "ServiceName": "freedns.42.pl",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "update_freedns_42_pl.sh",
      "MaxRetries": 0,
      "Name": "uci_freedns.42.pl",
      "Alias": "cpe-freedns_42_pl",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.43."
  },
  {
    "parameters": {
      "ServiceName": "infomaniak.com",
      "ServerPort": 0,
      "Protocol": "HTTPS",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]infomaniak.com",
      "MaxRetries": 0,
      "Name": "uci_infomaniak.com",
      "Alias": "cpe-infomaniak_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.44."
  },
  {
    "parameters": {
      "ServiceName": "joker.com",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "svc.joker.com",
      "MaxRetries": 0,
      "Name": "uci_joker.com",
      "Alias": "cpe-joker_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.45."
  },
  {
    "parameters": {
      "ServiceName": "no-ip.pl",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]update.no-ip.pl",
      "MaxRetries": 0,
      "Name": "uci_no-ip.pl",
      "Alias": "cpe-no-ip_pl",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.46."
  },
  {
    "parameters": {
      "ServiceName": "ddnss.de",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "ip4.ddnss.de",
      "MaxRetries": 0,
      "Name": "uci_ddnss.de",
      "Alias": "cpe-ddnss_de",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.47."
  },
  {
    "parameters": {
      "ServiceName": "duckdns.org",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "duckdns.org",
      "MaxRetries": 0,
      "Name": "uci_duckdns.org",
      "Alias": "cpe-duckdns_org",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.48."
  },
  {
    "parameters": {
      "ServiceName": "ovh.com",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]ovh.com",
      "MaxRetries": 0,
      "Name": "uci_ovh.com",
      "Alias": "cpe-ovh_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.49."
  },
  {
    "parameters": {
      "ServiceName": "route53-v1",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "update_route53_v1.sh",
      "MaxRetries": 0,
      "Name": "uci_route53-v1",
      "Alias": "cpe-route53-v1",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.5."
  },
  {
    "parameters": {
      "ServiceName": "now-dns.com",
      "ServerPort": 0,
      "Protocol": "HTTPS",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]now-dns.com",
      "MaxRetries": 0,
      "Name": "uci_now-dns.com",
      "Alias": "cpe-now-dns_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.50."
  },
  {
    "parameters": {
      "ServiceName": "schokokeks.org",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]dyndns.schokokeks.org",
      "MaxRetries": 0,
      "Name": "uci_schokokeks.org",
      "Alias": "cpe-schokokeks_org",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.51."
  },
  {
    "parameters": {
      "ServiceName": "njal.la",
      "ServerPort": 0,
      "Protocol": "HTTPS",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "njal.la",
      "MaxRetries": 0,
      "Name": "uci_njal.la",
      "Alias": "cpe-njal_la",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.52."
  },
  {
    "parameters": {
      "ServiceName": "bind-nsupdate",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "update_nsupdate.sh",
      "MaxRetries": 0,
      "Name": "uci_bind-nsupdate",
      "Alias": "cpe-bind-nsupdate",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.53."
  },
  {
    "parameters": {
      "ServiceName": "namecheap.com",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "dynamicdns.park-your-domain.com",
      "MaxRetries": 0,
      "Name": "uci_namecheap.com",
      "Alias": "cpe-namecheap_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.54."
  },
  {
    "parameters": {
      "ServiceName": "dnsever.com",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]dyna.dnsever.com",
      "MaxRetries": 0,
      "Name": "uci_dnsever.com",
      "Alias": "cpe-dnsever_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.55."
  },
  {
    "parameters": {
      "ServiceName": "dy.fi",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]dy.fi",
      "MaxRetries": 0,
      "Name": "uci_dy.fi",
      "Alias": "cpe-dy_fi",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.56."
  },
  {
    "parameters": {
      "ServiceName": "dhis.org",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]is.dhis.org",
      "MaxRetries": 0,
      "Name": "uci_dhis.org",
      "Alias": "cpe-dhis_org",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.57."
  },
  {
    "parameters": {
      "ServiceName": "ipnodns.ru",
      "ServerPort": 0,
      "Protocol": "HTTPS",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "ipnodns.ru",
      "MaxRetries": 0,
      "Name": "uci_ipnodns.ru",
      "Alias": "cpe-ipnodns_ru",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.58."
  },
  {
    "parameters": {
      "ServiceName": "system-ns.com",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "system-ns.com",
      "MaxRetries": 0,
      "Name": "uci_system-ns.com",
      "Alias": "cpe-system-ns_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.59."
  },
  {
    "parameters": {
      "ServiceName": "dyndns.org",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]members.dyndns.org",
      "MaxRetries": 0,
      "Name": "uci_dyndns.org",
      "Alias": "cpe-dyndns_org",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.6."
  },
  {
    "parameters": {
      "ServiceName": "no-ip.com",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "update_no-ip_com.sh",
      "MaxRetries": 0,
      "Name": "uci_no-ip.com",
      "Alias": "cpe-no-ip_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.60."
  },
  {
    "parameters": {
      "ServiceName": "dnspark.com",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]control.dnspark.com",
      "MaxRetries": 0,
      "Name": "uci_dnspark.com",
      "Alias": "cpe-dnspark_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.61."
  },
  {
    "parameters": {
      "ServiceName": "cloudflare.com-v4",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "update_cloudflare_com_v4.sh",
      "MaxRetries": 0,
      "Name": "uci_cloudflare.com-v4",
      "Alias": "cpe-cloudflare_com-v4",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.62."
  },
  {
    "parameters": {
      "ServiceName": "xlhost.de",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]nsupdate.xlhost.de",
      "MaxRetries": 0,
      "Name": "uci_xlhost.de",
      "Alias": "cpe-xlhost_de",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.63."
  },
  {
    "parameters": {
      "ServiceName": "ddo.jp",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "free.ddo.jp",
      "MaxRetries": 0,
      "Name": "uci_ddo.jp",
      "Alias": "cpe-ddo_jp",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.64."
  },
  {
    "parameters": {
      "ServiceName": "regfish.de",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "dyndns.regfish.de",
      "MaxRetries": 0,
      "Name": "uci_regfish.de",
      "Alias": "cpe-regfish_de",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.65."
  },
  {
    "parameters": {
      "ServiceName": "sitelutions.com",
      "ServerPort": 0,
      "Protocol": "HTTPS",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "dnsup.sitelutions.com",
      "MaxRetries": 0,
      "Name": "uci_sitelutions.com",
      "Alias": "cpe-sitelutions_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.66."
  },
  {
    "parameters": {
      "ServiceName": "easydns.com",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]api.cp.easydns.com",
      "MaxRetries": 0,
      "Name": "uci_easydns.com",
      "Alias": "cpe-easydns_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.67."
  },
  {
    "parameters": {
      "ServiceName": "variomedia.de",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]dyndns.variomedia.de",
      "MaxRetries": 0,
      "Name": "uci_variomedia.de",
      "Alias": "cpe-variomedia_de",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.68."
  },
  {
    "parameters": {
      "ServiceName": "myonlineportal.net",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "myonlineportal.net",
      "MaxRetries": 0,
      "Name": "uci_myonlineportal.net",
      "Alias": "cpe-myonlineportal_net",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.69."
  },
  {
    "parameters": {
      "ServiceName": "godaddy.com-v1",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "update_godaddy_com_v1.sh",
      "MaxRetries": 0,
      "Name": "uci_godaddy.com-v1",
      "Alias": "cpe-godaddy_com-v1",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.7."
  },
  {
    "parameters": {
      "ServiceName": "selfhost.de",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "carol.selfhost.de",
      "MaxRetries": 0,
      "Name": "uci_selfhost.de",
      "Alias": "cpe-selfhost_de",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.70."
  },
  {
    "parameters": {
      "ServiceName": "dyn.com",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]members.dyndns.org",
      "MaxRetries": 0,
      "Name": "uci_dyn.com",
      "Alias": "cpe-dyn_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.71."
  },
  {
    "parameters": {
      "ServiceName": "afraid.org-v2-basic",
      "ServerPort": 0,
      "Protocol": "HTTPS",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]sync.afraid.org",
      "MaxRetries": 0,
      "Name": "uci_afraid.org-v2-basic",
      "Alias": "cpe-afraid_org-v2-basic",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.72."
  },
  {
    "parameters": {
      "ServiceName": "spdyn.de",
      "ServerPort": 0,
      "Protocol": "HTTPS",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "update.spdyn.de",
      "MaxRetries": 0,
      "Name": "uci_spdyn.de",
      "Alias": "cpe-spdyn_de",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.73."
  },
  {
    "parameters": {
      "ServiceName": "dynv6.com",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "dynv6.com",
      "MaxRetries": 0,
      "Name": "uci_dynv6.com",
      "Alias": "cpe-dynv6_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.8."
  },
  {
    "parameters": {
      "ServiceName": "changeip.com",
      "ServerPort": 0,
      "Protocol": "HTTP",
      "RetryInterval": 60,
      "Enable": 1,
      "ServerAddress": "[USERNAME][PASSWORD]nic.changeip.com",
      "MaxRetries": 0,
      "Name": "uci_changeip.com",
      "Alias": "cpe-changeip_com",
      "SupportedProtocols": "HTTP,HTTPS",
      "CheckInterval": 600
    },
    "path": "Device.DynamicDNS.Server.9."
  }
];

module.exports = { data };