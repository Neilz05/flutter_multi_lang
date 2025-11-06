const data = [
    {
        "parameters": {
            "AutoIPEnable": 0,
            "IPv4AddressNumberOfEntries": 1,
            "IPv6AddressNumberOfEntries": 1,
            "Status": "Up",
            "LowerLayers": "Device.Ethernet.Link.1.",
            "MaxMTUSize": 65535,
            "Enable": 1,
            "IPv6Enable": 1,
            "Reset": 0,
            "Name": "lo",
            "Router": "Device.Routing.Router.1.",
            "X_PRPL-COM_Description": "",
            "Type": "Loopback",
            "Loopback": 1,
            "IPv4Enable": 1,
            "IPv6PrefixNumberOfEntries": 0,
            "ULAEnable": 0,
            "LastChange": 1270,
            "Alias": "loopback"
        },
        "path": "Device.IP.Interface.1."
    },
    {
        "parameters": {
            "Enable": 1,
            "IPAddress": "127.0.0.1",
            "SubnetMask": "255.0.0.0",
            "AddressingType": "Static",
            "Status": "Enabled",
            "Alias": "loopback_ipv4"
        },
        "path": "Device.IP.Interface.1.IPv4Address.1."
    },
    {
        "parameters": {
            "IPAddress": "::1",
            "IPAddressStatus": "Preferred",
            "Status": "Enabled",
            "Prefix": "",
            "Anycast": 0,
            "Enable": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "WellKnown",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "loopbackipv6"
        },
        "path": "Device.IP.Interface.1.IPv6Address.1."
    },
    {
        "parameters": {
            "MulticastPacketsSent": 0,
            "ErrorsSent": 0,
            "BroadcastPacketsSent": 0,
            "BytesSent": 31932115,
            "PacketsSent": 87357,
            "BytesReceived": 31932115,
            "DiscardPacketsReceived": 0,
            "ErrorsReceived": 0,
            "MulticastPacketsReceived": 0,
            "UnknownProtoPacketsReceived": 0,
            "UnicastPacketsSent": 0,
            "UnicastPacketsReceived": 0,
            "PacketsReceived": 87357,
            "DiscardPacketsSent": 0,
            "BroadcastPacketsReceived": 0
        },
        "path": "Device.IP.Interface.1.Stats."
    },
    {
        "parameters": {
            "NeighborReachableTime": 30000
        },
        "path": "Device.IP.Interface.1.X_PRPL-COM_IPv4Config."
    },
    {
        "parameters": {
            "NeighborReachableTime": 30000
        },
        "path": "Device.IP.Interface.1.X_PRPL-COM_IPv6Config."
    },
    {
        "parameters": {
            "AutoIPEnable": 0,
            "IPv4AddressNumberOfEntries": 1,
            "IPv6AddressNumberOfEntries": 0,
            "Status": "Up",
            "LowerLayers": "Device.Ethernet.Link.2.",
            "MaxMTUSize": 1500,
            "Enable": 1,
            "IPv6Enable": 0,
            "Reset": 0,
            "Name": "eth0",
            "Router": "Device.Routing.Router.ETH_MGMT.",
            "X_PRPL-COM_Description": "",
            "Type": "Normal",
            "Loopback": 0,
            "IPv4Enable": 1,
            "IPv6PrefixNumberOfEntries": 0,
            "ULAEnable": 0,
            "LastChange": 1266,
            "Alias": "mgmt"
        },
        "path": "Device.IP.Interface.10."
    },
    {
        "parameters": {
            "Enable": 1,
            "IPAddress": "172.21.44.50",
            "SubnetMask": "255.255.255.0",
            "AddressingType": "DHCP",
            "Status": "Enabled",
            "Alias": "primary"
        },
        "path": "Device.IP.Interface.10.IPv4Address.1."
    },
    {
        "parameters": {
            "MulticastPacketsSent": 0,
            "ErrorsSent": 0,
            "BroadcastPacketsSent": 0,
            "BytesSent": 33100,
            "PacketsSent": 149,
            "BytesReceived": 4440259,
            "DiscardPacketsReceived": 0,
            "ErrorsReceived": 0,
            "MulticastPacketsReceived": 0,
            "UnknownProtoPacketsReceived": 0,
            "UnicastPacketsSent": 0,
            "UnicastPacketsReceived": 0,
            "PacketsReceived": 38002,
            "DiscardPacketsSent": 0,
            "BroadcastPacketsReceived": 0
        },
        "path": "Device.IP.Interface.10.Stats."
    },
    {
        "parameters": {
            "NeighborReachableTime": 30000
        },
        "path": "Device.IP.Interface.10.X_PRPL-COM_IPv4Config."
    },
    {
        "parameters": {
            "NeighborReachableTime": 30000
        },
        "path": "Device.IP.Interface.10.X_PRPL-COM_IPv6Config."
    },
    {
        "parameters": {
            "AutoIPEnable": 0,
            "IPv4AddressNumberOfEntries": 0,
            "IPv6AddressNumberOfEntries": 0,
            "Status": "Unknown",
            "LowerLayers": "",
            "MaxMTUSize": 1500,
            "Enable": 0,
            "IPv6Enable": 1,
            "Reset": 0,
            "Name": "",
            "Router": "Device.Routing.Router.1.",
            "X_PRPL-COM_Description": "",
            "Type": "Tunneled",
            "Loopback": 0,
            "IPv4Enable": 0,
            "IPv6PrefixNumberOfEntries": 0,
            "ULAEnable": 0,
            "LastChange": 1276,
            "Alias": "DSLite-exit"
        },
        "path": "Device.IP.Interface.11."
    },
    {
        "parameters": {
            "MulticastPacketsSent": 0,
            "ErrorsSent": 0,
            "BroadcastPacketsSent": 0,
            "BytesSent": 0,
            "PacketsSent": 0,
            "BytesReceived": 0,
            "DiscardPacketsReceived": 0,
            "ErrorsReceived": 0,
            "MulticastPacketsReceived": 0,
            "UnknownProtoPacketsReceived": 0,
            "UnicastPacketsSent": 0,
            "UnicastPacketsReceived": 0,
            "PacketsReceived": 0,
            "DiscardPacketsSent": 0,
            "BroadcastPacketsReceived": 0
        },
        "path": "Device.IP.Interface.11.Stats."
    },
    {
        "parameters": {
            "NeighborReachableTime": 30000
        },
        "path": "Device.IP.Interface.11.X_PRPL-COM_IPv4Config."
    },
    {
        "parameters": {
            "NeighborReachableTime": 30000
        },
        "path": "Device.IP.Interface.11.X_PRPL-COM_IPv6Config."
    },
    {
        "parameters": {
            "AutoIPEnable": 0,
            "IPv4AddressNumberOfEntries": 2,
            "IPv6AddressNumberOfEntries": 4,
            "Status": "Up",
            "LowerLayers": "Device.Ethernet.Link.3.",
            "MaxMTUSize": 1500,
            "Enable": 1,
            "IPv6Enable": 1,
            "Reset": 0,
            "Name": "br-lan",
            "Router": "Device.Routing.Router.1.",
            "X_PRPL-COM_Description": "",
            "Type": "Normal",
            "Loopback": 0,
            "IPv4Enable": 1,
            "IPv6PrefixNumberOfEntries": 4,
            "ULAEnable": 0,
            "LastChange": 1261,
            "Alias": "lan"
        },
        "path": "Device.IP.Interface.2."
    },
    {
        "parameters": {
            "Enable": 1,
            "IPAddress": "192.168.1.1",
            "SubnetMask": "255.255.255.0",
            "AddressingType": "Static",
            "Status": "Enabled",
            "Alias": "lan"
        },
        "path": "Device.IP.Interface.2.IPv4Address.1."
    },
    {
        "parameters": {
            "Enable": 0,
            "IPAddress": "",
            "SubnetMask": "",
            "AddressingType": "Static",
            "Status": "Disabled",
            "Alias": "public-lan"
        },
        "path": "Device.IP.Interface.2.IPv4Address.2."
    },
    {
        "parameters": {
            "IPAddress": "",
            "IPAddressStatus": "Invalid",
            "Status": "Disabled",
            "Prefix": "Device.IP.Interface.2.IPv6Prefix.1.",
            "Anycast": 0,
            "Enable": 0,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "AutoConfigured",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "ULA"
        },
        "path": "Device.IP.Interface.2.IPv6Address.1."
    },
    {
        "parameters": {
            "IPAddress": "",
            "IPAddressStatus": "Invalid",
            "Status": "Error",
            "Prefix": "Device.IP.Interface.2.IPv6Prefix.2.",
            "Anycast": 0,
            "Enable": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "AutoConfigured",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "GUA"
        },
        "path": "Device.IP.Interface.2.IPv6Address.2."
    },
    {
        "parameters": {
            "IPAddress": "",
            "IPAddressStatus": "Invalid",
            "Status": "Error",
            "Prefix": "Device.IP.Interface.2.IPv6Prefix.4.",
            "Anycast": 0,
            "Enable": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "AutoConfigured",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "GUA_STATIC"
        },
        "path": "Device.IP.Interface.2.IPv6Address.3."
    },
    {
        "parameters": {
            "IPAddress": "fe80::1aef:c0ff:fe00:280",
            "IPAddressStatus": "Preferred",
            "Status": "Enabled",
            "Prefix": "",
            "Anycast": 0,
            "Enable": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "WellKnown",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "LLA"
        },
        "path": "Device.IP.Interface.2.IPv6Address.4."
    },
    {
        "parameters": {
            "PrefixStatus": "Invalid",
            "OnLink": 0,
            "Status": "Disabled",
            "Prefix": "",
            "ChildPrefixBits": "0:0:0:1::/64",
            "StaticType": "Static",
            "Enable": 0,
            "Autonomous": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "AutoConfigured",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "ULA64",
            "ParentPrefix": ""
        },
        "path": "Device.IP.Interface.2.IPv6Prefix.1."
    },
    {
        "parameters": {
            "PrefixStatus": "Invalid",
            "OnLink": 0,
            "Status": "Error",
            "Prefix": "",
            "ChildPrefixBits": "0:0:0:1::/64",
            "StaticType": "Inapplicable",
            "Enable": 1,
            "Autonomous": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "Child",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "GUA",
            "ParentPrefix": "Device.IP.Interface.3.IPv6Prefix.1."
        },
        "path": "Device.IP.Interface.2.IPv6Prefix.2."
    },
    {
        "parameters": {
            "PrefixStatus": "Invalid",
            "OnLink": 0,
            "Status": "Error",
            "Prefix": "",
            "ChildPrefixBits": "0:0:0:10::/60",
            "StaticType": "Child",
            "Enable": 1,
            "Autonomous": 0,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "Static",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "GUA_IAPD",
            "ParentPrefix": "Device.IP.Interface.3.IPv6Prefix.1."
        },
        "path": "Device.IP.Interface.2.IPv6Prefix.3."
    },
    {
        "parameters": {
            "PrefixStatus": "Invalid",
            "OnLink": 0,
            "Status": "Error",
            "Prefix": "",
            "ChildPrefixBits": "0:0:0:1::/64",
            "StaticType": "Inapplicable",
            "Enable": 1,
            "Autonomous": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "Child",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "GUA_STATIC",
            "ParentPrefix": "Device.IP.Interface.3.IPv6Prefix.4."
        },
        "path": "Device.IP.Interface.2.IPv6Prefix.4."
    },
    {
        "parameters": {
            "MulticastPacketsSent": 0,
            "ErrorsSent": 0,
            "BroadcastPacketsSent": 0,
            "BytesSent": 24643515,
            "PacketsSent": 8472,
            "BytesReceived": 18987646,
            "DiscardPacketsReceived": 0,
            "ErrorsReceived": 0,
            "MulticastPacketsReceived": 0,
            "UnknownProtoPacketsReceived": 0,
            "UnicastPacketsSent": 0,
            "UnicastPacketsReceived": 0,
            "PacketsReceived": 52591,
            "DiscardPacketsSent": 0,
            "BroadcastPacketsReceived": 0
        },
        "path": "Device.IP.Interface.2.Stats."
    },
    {
        "parameters": {
            "NeighborReachableTime": 30000
        },
        "path": "Device.IP.Interface.2.X_PRPL-COM_IPv4Config."
    },
    {
        "parameters": {
            "NeighborReachableTime": 30000
        },
        "path": "Device.IP.Interface.2.X_PRPL-COM_IPv6Config."
    },
    {
        "parameters": {
            "AutoIPEnable": 0,
            "IPv4AddressNumberOfEntries": 1,
            "IPv6AddressNumberOfEntries": 4,
            "Status": "Down",
            "LowerLayers": "Device.PPP.Interface.1.",
            "MaxMTUSize": 1500,
            "Enable": 1,
            "IPv6Enable": 1,
            "Reset": 0,
            "Name": "",
            "Router": "Device.Routing.Router.main.",
            "X_PRPL-COM_Description": "",
            "Type": "Normal",
            "Loopback": 0,
            "IPv4Enable": 1,
            "IPv6PrefixNumberOfEntries": 4,
            "ULAEnable": 0,
            "LastChange": 1264,
            "Alias": "wan"
        },
        "path": "Device.IP.Interface.3."
    },
    {
        "parameters": {
            "Enable": 1,
            "IPAddress": "",
            "SubnetMask": "",
            "AddressingType": "IPCP",
            "Status": "Disabled",
            "Alias": "primary"
        },
        "path": "Device.IP.Interface.3.IPv4Address.1."
    },
    {
        "parameters": {
            "IPAddress": "",
            "IPAddressStatus": "Invalid",
            "Status": "Disabled",
            "Prefix": "Device.IP.Interface.3.IPv6Prefix.2.",
            "Anycast": 0,
            "Enable": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "AutoConfigured",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "GUA_RA"
        },
        "path": "Device.IP.Interface.3.IPv6Address.1."
    },
    {
        "parameters": {
            "IPAddress": "",
            "IPAddressStatus": "Invalid",
            "Status": "Disabled",
            "Prefix": "",
            "Anycast": 0,
            "Enable": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "DHCPv6",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "DHCP"
        },
        "path": "Device.IP.Interface.3.IPv6Address.2."
    },
    {
        "parameters": {
            "IPAddress": "",
            "IPAddressStatus": "Invalid",
            "Status": "Disabled",
            "Prefix": "Device.IP.Interface.3.IPv6Prefix.3.",
            "Anycast": 0,
            "Enable": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "AutoConfigured",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "DHCP_IAPD"
        },
        "path": "Device.IP.Interface.3.IPv6Address.3."
    },
    {
        "parameters": {
            "IPAddress": "",
            "IPAddressStatus": "Preferred",
            "Status": "Disabled",
            "Prefix": "Device.IP.Interface.3.IPv6Prefix.4.",
            "Anycast": 0,
            "Enable": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "Static",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "GUA_STATIC"
        },
        "path": "Device.IP.Interface.3.IPv6Address.4."
    },
    {
        "parameters": {
            "PrefixStatus": "Invalid",
            "OnLink": 0,
            "Status": "Disabled",
            "Prefix": "",
            "ChildPrefixBits": "",
            "StaticType": "Inapplicable",
            "Enable": 1,
            "Autonomous": 0,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "PrefixDelegation",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "GUA_IAPD",
            "ParentPrefix": ""
        },
        "path": "Device.IP.Interface.3.IPv6Prefix.1."
    },
    {
        "parameters": {
            "PrefixStatus": "Invalid",
            "OnLink": 0,
            "Status": "Disabled",
            "Prefix": "",
            "ChildPrefixBits": "",
            "StaticType": "Inapplicable",
            "Enable": 1,
            "Autonomous": 0,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "RouterAdvertisement",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "GUA_RA",
            "ParentPrefix": ""
        },
        "path": "Device.IP.Interface.3.IPv6Prefix.2."
    },
    {
        "parameters": {
            "PrefixStatus": "Invalid",
            "OnLink": 0,
            "Status": "Disabled",
            "Prefix": "",
            "ChildPrefixBits": "0:0:0:FFFF::/64",
            "StaticType": "Inapplicable",
            "Enable": 1,
            "Autonomous": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "Child",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "DHCP_IAPD",
            "ParentPrefix": "Device.IP.Interface.3.IPv6Prefix.1."
        },
        "path": "Device.IP.Interface.3.IPv6Prefix.3."
    },
    {
        "parameters": {
            "PrefixStatus": "Preferred",
            "OnLink": 1,
            "Status": "Disabled",
            "Prefix": "",
            "ChildPrefixBits": "",
            "StaticType": "Static",
            "Enable": 1,
            "Autonomous": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "Static",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "GUA_STATIC",
            "ParentPrefix": ""
        },
        "path": "Device.IP.Interface.3.IPv6Prefix.4."
    },
    {
        "parameters": {
            "MulticastPacketsSent": 0,
            "ErrorsSent": 0,
            "BroadcastPacketsSent": 0,
            "BytesSent": 0,
            "PacketsSent": 0,
            "BytesReceived": 0,
            "DiscardPacketsReceived": 0,
            "ErrorsReceived": 0,
            "MulticastPacketsReceived": 0,
            "UnknownProtoPacketsReceived": 0,
            "UnicastPacketsSent": 0,
            "UnicastPacketsReceived": 0,
            "PacketsReceived": 0,
            "DiscardPacketsSent": 0,
            "BroadcastPacketsReceived": 0
        },
        "path": "Device.IP.Interface.3.Stats."
    },
    {
        "parameters": {
            "NeighborReachableTime": 30000
        },
        "path": "Device.IP.Interface.3.X_PRPL-COM_IPv4Config."
    },
    {
        "parameters": {
            "NeighborReachableTime": 30000
        },
        "path": "Device.IP.Interface.3.X_PRPL-COM_IPv6Config."
    },
    {
        "parameters": {
            "AutoIPEnable": 0,
            "IPv4AddressNumberOfEntries": 0,
            "IPv6AddressNumberOfEntries": 4,
            "Status": "Unknown",
            "LowerLayers": "",
            "MaxMTUSize": 1500,
            "Enable": 0,
            "IPv6Enable": 1,
            "Reset": 0,
            "Name": "",
            "Router": "Device.Routing.Router.1.",
            "X_PRPL-COM_Description": "",
            "Type": "Normal",
            "Loopback": 0,
            "IPv4Enable": 0,
            "IPv6PrefixNumberOfEntries": 4,
            "ULAEnable": 0,
            "LastChange": 1277,
            "Alias": "wan6"
        },
        "path": "Device.IP.Interface.4."
    },
    {
        "parameters": {
            "IPAddress": "",
            "IPAddressStatus": "Invalid",
            "Status": "Disabled",
            "Prefix": "Device.IP.Interface.4.IPv6Prefix.2.",
            "Anycast": 0,
            "Enable": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "AutoConfigured",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "GUA_RA"
        },
        "path": "Device.IP.Interface.4.IPv6Address.1."
    },
    {
        "parameters": {
            "IPAddress": "",
            "IPAddressStatus": "Invalid",
            "Status": "Disabled",
            "Prefix": "",
            "Anycast": 0,
            "Enable": 0,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "DHCPv6",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "DHCP"
        },
        "path": "Device.IP.Interface.4.IPv6Address.2."
    },
    {
        "parameters": {
            "IPAddress": "",
            "IPAddressStatus": "Invalid",
            "Status": "Disabled",
            "Prefix": "Device.IP.Interface.4.IPv6Prefix.3.",
            "Anycast": 0,
            "Enable": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "AutoConfigured",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "DHCP_IAPD"
        },
        "path": "Device.IP.Interface.4.IPv6Address.3."
    },
    {
        "parameters": {
            "IPAddress": "",
            "IPAddressStatus": "Preferred",
            "Status": "Disabled",
            "Prefix": "Device.IP.Interface.4.IPv6Prefix.4.",
            "Anycast": 0,
            "Enable": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "Static",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "GUA_STATIC"
        },
        "path": "Device.IP.Interface.4.IPv6Address.4."
    },
    {
        "parameters": {
            "PrefixStatus": "Invalid",
            "OnLink": 0,
            "Status": "Disabled",
            "Prefix": "",
            "ChildPrefixBits": "",
            "StaticType": "Inapplicable",
            "Enable": 1,
            "Autonomous": 0,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "PrefixDelegation",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "GUA_IAPD",
            "ParentPrefix": ""
        },
        "path": "Device.IP.Interface.4.IPv6Prefix.1."
    },
    {
        "parameters": {
            "PrefixStatus": "Invalid",
            "OnLink": 0,
            "Status": "Disabled",
            "Prefix": "",
            "ChildPrefixBits": "",
            "StaticType": "Inapplicable",
            "Enable": 1,
            "Autonomous": 0,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "RouterAdvertisement",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "GUA_RA",
            "ParentPrefix": ""
        },
        "path": "Device.IP.Interface.4.IPv6Prefix.2."
    },
    {
        "parameters": {
            "PrefixStatus": "Invalid",
            "OnLink": 0,
            "Status": "Disabled",
            "Prefix": "",
            "ChildPrefixBits": "0:0:0:FFFF::/64",
            "StaticType": "Inapplicable",
            "Enable": 1,
            "Autonomous": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "Child",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "DHCP_IAPD",
            "ParentPrefix": "Device.IP.Interface.4.IPv6Prefix.1."
        },
        "path": "Device.IP.Interface.4.IPv6Prefix.3."
    },
    {
        "parameters": {
            "PrefixStatus": "Preferred",
            "OnLink": 1,
            "Status": "Disabled",
            "Prefix": "",
            "ChildPrefixBits": "",
            "StaticType": "Static",
            "Enable": 1,
            "Autonomous": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "Static",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "GUA_STATIC",
            "ParentPrefix": ""
        },
        "path": "Device.IP.Interface.4.IPv6Prefix.4."
    },
    {
        "parameters": {
            "MulticastPacketsSent": 0,
            "ErrorsSent": 0,
            "BroadcastPacketsSent": 0,
            "BytesSent": 0,
            "PacketsSent": 0,
            "BytesReceived": 0,
            "DiscardPacketsReceived": 0,
            "ErrorsReceived": 0,
            "MulticastPacketsReceived": 0,
            "UnknownProtoPacketsReceived": 0,
            "UnicastPacketsSent": 0,
            "UnicastPacketsReceived": 0,
            "PacketsReceived": 0,
            "DiscardPacketsSent": 0,
            "BroadcastPacketsReceived": 0
        },
        "path": "Device.IP.Interface.4.Stats."
    },
    {
        "parameters": {
            "NeighborReachableTime": 30000
        },
        "path": "Device.IP.Interface.4.X_PRPL-COM_IPv4Config."
    },
    {
        "parameters": {
            "NeighborReachableTime": 30000
        },
        "path": "Device.IP.Interface.4.X_PRPL-COM_IPv6Config."
    },
    {
        "parameters": {
            "AutoIPEnable": 0,
            "IPv4AddressNumberOfEntries": 2,
            "IPv6AddressNumberOfEntries": 3,
            "Status": "Down",
            "LowerLayers": "Device.Ethernet.Link.4.",
            "MaxMTUSize": 1500,
            "Enable": 1,
            "IPv6Enable": 1,
            "Reset": 0,
            "Name": "br-guest",
            "Router": "Device.Routing.Router.1.",
            "X_PRPL-COM_Description": "",
            "Type": "Normal",
            "Loopback": 0,
            "IPv4Enable": 1,
            "IPv6PrefixNumberOfEntries": 4,
            "ULAEnable": 0,
            "LastChange": 1265,
            "Alias": "guest"
        },
        "path": "Device.IP.Interface.5."
    },
    {
        "parameters": {
            "Enable": 1,
            "IPAddress": "192.168.2.1",
            "SubnetMask": "255.255.255.0",
            "AddressingType": "Static",
            "Status": "Enabled",
            "Alias": "guest"
        },
        "path": "Device.IP.Interface.5.IPv4Address.1."
    },
    {
        "parameters": {
            "Enable": 0,
            "IPAddress": "",
            "SubnetMask": "",
            "AddressingType": "Static",
            "Status": "Disabled",
            "Alias": "public-guest"
        },
        "path": "Device.IP.Interface.5.IPv4Address.2."
    },
    {
        "parameters": {
            "IPAddress": "",
            "IPAddressStatus": "Invalid",
            "Status": "Disabled",
            "Prefix": "Device.IP.Interface.5.IPv6Prefix.1.",
            "Anycast": 0,
            "Enable": 0,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "AutoConfigured",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "ULA"
        },
        "path": "Device.IP.Interface.5.IPv6Address.1."
    },
    {
        "parameters": {
            "IPAddress": "",
            "IPAddressStatus": "Invalid",
            "Status": "Error",
            "Prefix": "Device.IP.Interface.5.IPv6Prefix.2.",
            "Anycast": 0,
            "Enable": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "AutoConfigured",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "GUA"
        },
        "path": "Device.IP.Interface.5.IPv6Address.2."
    },
    {
        "parameters": {
            "IPAddress": "",
            "IPAddressStatus": "Invalid",
            "Status": "Error",
            "Prefix": "Device.IP.Interface.5.IPv6Prefix.4.",
            "Anycast": 0,
            "Enable": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "AutoConfigured",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "GUA_STATIC"
        },
        "path": "Device.IP.Interface.5.IPv6Address.3."
    },
    {
        "parameters": {
            "PrefixStatus": "Invalid",
            "OnLink": 0,
            "Status": "Disabled",
            "Prefix": "",
            "ChildPrefixBits": "0:0:0:2::/64",
            "StaticType": "Static",
            "Enable": 0,
            "Autonomous": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "AutoConfigured",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "ULA64",
            "ParentPrefix": ""
        },
        "path": "Device.IP.Interface.5.IPv6Prefix.1."
    },
    {
        "parameters": {
            "PrefixStatus": "Invalid",
            "OnLink": 0,
            "Status": "Error",
            "Prefix": "",
            "ChildPrefixBits": "0:0:0:2::/64",
            "StaticType": "Inapplicable",
            "Enable": 1,
            "Autonomous": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "Child",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "GUA",
            "ParentPrefix": "Device.IP.Interface.3.IPv6Prefix.1."
        },
        "path": "Device.IP.Interface.5.IPv6Prefix.2."
    },
    {
        "parameters": {
            "PrefixStatus": "Invalid",
            "OnLink": 0,
            "Status": "Error",
            "Prefix": "",
            "ChildPrefixBits": "0:0:0:20::/60",
            "StaticType": "Child",
            "Enable": 1,
            "Autonomous": 0,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "Static",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "GUA_IAPD",
            "ParentPrefix": "Device.IP.Interface.3.IPv6Prefix.1."
        },
        "path": "Device.IP.Interface.5.IPv6Prefix.3."
    },
    {
        "parameters": {
            "PrefixStatus": "Invalid",
            "OnLink": 0,
            "Status": "Error",
            "Prefix": "",
            "ChildPrefixBits": "0:0:0:2::/64",
            "StaticType": "Inapplicable",
            "Enable": 1,
            "Autonomous": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "Child",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "GUA_STATIC",
            "ParentPrefix": "Device.IP.Interface.3.IPv6Prefix.4."
        },
        "path": "Device.IP.Interface.5.IPv6Prefix.4."
    },
    {
        "parameters": {
            "MulticastPacketsSent": 0,
            "ErrorsSent": 0,
            "BroadcastPacketsSent": 0,
            "BytesSent": 0,
            "PacketsSent": 0,
            "BytesReceived": 0,
            "DiscardPacketsReceived": 0,
            "ErrorsReceived": 0,
            "MulticastPacketsReceived": 0,
            "UnknownProtoPacketsReceived": 0,
            "UnicastPacketsSent": 0,
            "UnicastPacketsReceived": 0,
            "PacketsReceived": 0,
            "DiscardPacketsSent": 0,
            "BroadcastPacketsReceived": 0
        },
        "path": "Device.IP.Interface.5.Stats."
    },
    {
        "parameters": {
            "NeighborReachableTime": 30000
        },
        "path": "Device.IP.Interface.5.X_PRPL-COM_IPv4Config."
    },
    {
        "parameters": {
            "NeighborReachableTime": 30000
        },
        "path": "Device.IP.Interface.5.X_PRPL-COM_IPv6Config."
    },
    {
        "parameters": {
            "AutoIPEnable": 0,
            "IPv4AddressNumberOfEntries": 1,
            "IPv6AddressNumberOfEntries": 0,
            "Status": "Unknown",
            "LowerLayers": "Device.IP.Interface.11.",
            "MaxMTUSize": 1500,
            "Enable": 0,
            "IPv6Enable": 0,
            "Reset": 0,
            "Name": "",
            "Router": "Device.Routing.Router.1.",
            "X_PRPL-COM_Description": "",
            "Type": "Tunnel",
            "Loopback": 0,
            "IPv4Enable": 1,
            "IPv6PrefixNumberOfEntries": 0,
            "ULAEnable": 0,
            "LastChange": 1277,
            "Alias": "DSLite-entry"
        },
        "path": "Device.IP.Interface.6."
    },
    {
        "parameters": {
            "Enable": 1,
            "IPAddress": "192.0.0.2",
            "SubnetMask": "255.255.255.0",
            "AddressingType": "Static",
            "Status": "Disabled",
            "Alias": "primary"
        },
        "path": "Device.IP.Interface.6.IPv4Address.1."
    },
    {
        "parameters": {
            "MulticastPacketsSent": 0,
            "ErrorsSent": 0,
            "BroadcastPacketsSent": 0,
            "BytesSent": 0,
            "PacketsSent": 0,
            "BytesReceived": 0,
            "DiscardPacketsReceived": 0,
            "ErrorsReceived": 0,
            "MulticastPacketsReceived": 0,
            "UnknownProtoPacketsReceived": 0,
            "UnicastPacketsSent": 0,
            "UnicastPacketsReceived": 0,
            "PacketsReceived": 0,
            "DiscardPacketsSent": 0,
            "BroadcastPacketsReceived": 0
        },
        "path": "Device.IP.Interface.6.Stats."
    },
    {
        "parameters": {
            "NeighborReachableTime": 30000
        },
        "path": "Device.IP.Interface.6.X_PRPL-COM_IPv4Config."
    },
    {
        "parameters": {
            "NeighborReachableTime": 30000
        },
        "path": "Device.IP.Interface.6.X_PRPL-COM_IPv6Config."
    },
    {
        "parameters": {
            "AutoIPEnable": 0,
            "IPv4AddressNumberOfEntries": 2,
            "IPv6AddressNumberOfEntries": 3,
            "Status": "Down",
            "LowerLayers": "Device.Ethernet.Link.5.",
            "MaxMTUSize": 1500,
            "Enable": 1,
            "IPv6Enable": 1,
            "Reset": 0,
            "Name": "br-lcm",
            "Router": "Device.Routing.Router.1.",
            "X_PRPL-COM_Description": "",
            "Type": "Normal",
            "Loopback": 0,
            "IPv4Enable": 1,
            "IPv6PrefixNumberOfEntries": 4,
            "ULAEnable": 0,
            "LastChange": 1266,
            "Alias": "lcm"
        },
        "path": "Device.IP.Interface.7."
    },
    {
        "parameters": {
            "Enable": 1,
            "IPAddress": "192.168.3.1",
            "SubnetMask": "255.255.255.0",
            "AddressingType": "Static",
            "Status": "Enabled",
            "Alias": "lcm"
        },
        "path": "Device.IP.Interface.7.IPv4Address.1."
    },
    {
        "parameters": {
            "Enable": 0,
            "IPAddress": "",
            "SubnetMask": "",
            "AddressingType": "Static",
            "Status": "Disabled",
            "Alias": "public-lcm"
        },
        "path": "Device.IP.Interface.7.IPv4Address.2."
    },
    {
        "parameters": {
            "IPAddress": "",
            "IPAddressStatus": "Invalid",
            "Status": "Disabled",
            "Prefix": "Device.IP.Interface.7.IPv6Prefix.1.",
            "Anycast": 0,
            "Enable": 0,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "AutoConfigured",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "ULA"
        },
        "path": "Device.IP.Interface.7.IPv6Address.1."
    },
    {
        "parameters": {
            "IPAddress": "",
            "IPAddressStatus": "Invalid",
            "Status": "Error",
            "Prefix": "Device.IP.Interface.7.IPv6Prefix.2.",
            "Anycast": 0,
            "Enable": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "AutoConfigured",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "GUA"
        },
        "path": "Device.IP.Interface.7.IPv6Address.2."
    },
    {
        "parameters": {
            "IPAddress": "",
            "IPAddressStatus": "Invalid",
            "Status": "Error",
            "Prefix": "Device.IP.Interface.7.IPv6Prefix.4.",
            "Anycast": 0,
            "Enable": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "AutoConfigured",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "GUA_STATIC"
        },
        "path": "Device.IP.Interface.7.IPv6Address.3."
    },
    {
        "parameters": {
            "PrefixStatus": "Invalid",
            "OnLink": 0,
            "Status": "Disabled",
            "Prefix": "",
            "ChildPrefixBits": "0:0:0:3::/64",
            "StaticType": "Static",
            "Enable": 0,
            "Autonomous": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "AutoConfigured",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "ULA64",
            "ParentPrefix": ""
        },
        "path": "Device.IP.Interface.7.IPv6Prefix.1."
    },
    {
        "parameters": {
            "PrefixStatus": "Invalid",
            "OnLink": 0,
            "Status": "Error",
            "Prefix": "",
            "ChildPrefixBits": "0:0:0:3::/64",
            "StaticType": "Inapplicable",
            "Enable": 1,
            "Autonomous": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "Child",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "GUA",
            "ParentPrefix": "Device.IP.Interface.3.IPv6Prefix.1."
        },
        "path": "Device.IP.Interface.7.IPv6Prefix.2."
    },
    {
        "parameters": {
            "PrefixStatus": "Invalid",
            "OnLink": 0,
            "Status": "Error",
            "Prefix": "",
            "ChildPrefixBits": "0:0:0:30::/60",
            "StaticType": "Child",
            "Enable": 1,
            "Autonomous": 0,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "Static",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "GUA_IAPD",
            "ParentPrefix": "Device.IP.Interface.3.IPv6Prefix.1."
        },
        "path": "Device.IP.Interface.7.IPv6Prefix.3."
    },
    {
        "parameters": {
            "PrefixStatus": "Invalid",
            "OnLink": 0,
            "Status": "Error",
            "Prefix": "",
            "ChildPrefixBits": "0:0:0:3::/64",
            "StaticType": "Inapplicable",
            "Enable": 1,
            "Autonomous": 1,
            "ValidLifetime": "9999-12-31T23:59:59Z",
            "Origin": "Child",
            "PreferredLifetime": "9999-12-31T23:59:59Z",
            "Alias": "GUA_STATIC",
            "ParentPrefix": "Device.IP.Interface.3.IPv6Prefix.4."
        },
        "path": "Device.IP.Interface.7.IPv6Prefix.4."
    },
    {
        "parameters": {
            "MulticastPacketsSent": 0,
            "ErrorsSent": 0,
            "BroadcastPacketsSent": 0,
            "BytesSent": 0,
            "PacketsSent": 0,
            "BytesReceived": 0,
            "DiscardPacketsReceived": 0,
            "ErrorsReceived": 0,
            "MulticastPacketsReceived": 0,
            "UnknownProtoPacketsReceived": 0,
            "UnicastPacketsSent": 0,
            "UnicastPacketsReceived": 0,
            "PacketsReceived": 0,
            "DiscardPacketsSent": 0,
            "BroadcastPacketsReceived": 0
        },
        "path": "Device.IP.Interface.7.Stats."
    },
    {
        "parameters": {
            "NeighborReachableTime": 30000
        },
        "path": "Device.IP.Interface.7.X_PRPL-COM_IPv4Config."
    },
    {
        "parameters": {
            "NeighborReachableTime": 30000
        },
        "path": "Device.IP.Interface.7.X_PRPL-COM_IPv6Config."
    },
    {
        "parameters": {
            "AutoIPEnable": 0,
            "IPv4AddressNumberOfEntries": 1,
            "IPv6AddressNumberOfEntries": 0,
            "Status": "Down",
            "LowerLayers": "Device.Ethernet.VLANTermination.3.",
            "MaxMTUSize": 1500,
            "Enable": 1,
            "IPv6Enable": 0,
            "Reset": 0,
            "Name": "",
            "Router": "Device.Routing.Router.ETH_VOIP.",
            "X_PRPL-COM_Description": "",
            "Type": "Normal",
            "Loopback": 0,
            "IPv4Enable": 1,
            "IPv6PrefixNumberOfEntries": 0,
            "ULAEnable": 0,
            "LastChange": 26,
            "Alias": "voip"
        },
        "path": "Device.IP.Interface.8."
    },
    {
        "parameters": {
            "Enable": 1,
            "IPAddress": "",
            "SubnetMask": "",
            "AddressingType": "DHCP",
            "Status": "Disabled",
            "Alias": "primary"
        },
        "path": "Device.IP.Interface.8.IPv4Address.1."
    },
    {
        "parameters": {
            "MulticastPacketsSent": 0,
            "ErrorsSent": 0,
            "BroadcastPacketsSent": 0,
            "BytesSent": 0,
            "PacketsSent": 0,
            "BytesReceived": 0,
            "DiscardPacketsReceived": 0,
            "ErrorsReceived": 0,
            "MulticastPacketsReceived": 0,
            "UnknownProtoPacketsReceived": 0,
            "UnicastPacketsSent": 0,
            "UnicastPacketsReceived": 0,
            "PacketsReceived": 0,
            "DiscardPacketsSent": 0,
            "BroadcastPacketsReceived": 0
        },
        "path": "Device.IP.Interface.8.Stats."
    },
    {
        "parameters": {
            "NeighborReachableTime": 30000
        },
        "path": "Device.IP.Interface.8.X_PRPL-COM_IPv4Config."
    },
    {
        "parameters": {
            "NeighborReachableTime": 30000
        },
        "path": "Device.IP.Interface.8.X_PRPL-COM_IPv6Config."
    },
    {
        "parameters": {
            "AutoIPEnable": 0,
            "IPv4AddressNumberOfEntries": 1,
            "IPv6AddressNumberOfEntries": 0,
            "Status": "Down",
            "LowerLayers": "Device.Ethernet.VLANTermination.2.",
            "MaxMTUSize": 1500,
            "Enable": 1,
            "IPv6Enable": 0,
            "Reset": 0,
            "Name": "",
            "Router": "Device.Routing.Router.ETH_IPTV.",
            "X_PRPL-COM_Description": "",
            "Type": "Normal",
            "Loopback": 0,
            "IPv4Enable": 1,
            "IPv6PrefixNumberOfEntries": 0,
            "ULAEnable": 0,
            "LastChange": 61,
            "Alias": "iptv"
        },
        "path": "Device.IP.Interface.9."
    },
    {
        "parameters": {
            "Enable": 1,
            "IPAddress": "",
            "SubnetMask": "",
            "AddressingType": "DHCP",
            "Status": "Disabled",
            "Alias": "primary"
        },
        "path": "Device.IP.Interface.9.IPv4Address.1."
    },
    {
        "parameters": {
            "MulticastPacketsSent": 0,
            "ErrorsSent": 0,
            "BroadcastPacketsSent": 0,
            "BytesSent": 0,
            "PacketsSent": 0,
            "BytesReceived": 0,
            "DiscardPacketsReceived": 0,
            "ErrorsReceived": 0,
            "MulticastPacketsReceived": 0,
            "UnknownProtoPacketsReceived": 0,
            "UnicastPacketsSent": 0,
            "UnicastPacketsReceived": 0,
            "PacketsReceived": 0,
            "DiscardPacketsSent": 0,
            "BroadcastPacketsReceived": 0
        },
        "path": "Device.IP.Interface.9.Stats."
    },
    {
        "parameters": {
            "NeighborReachableTime": 30000
        },
        "path": "Device.IP.Interface.9.X_PRPL-COM_IPv4Config."
    },
    {
        "parameters": {
            "NeighborReachableTime": 30000
        },
        "path": "Device.IP.Interface.9.X_PRPL-COM_IPv6Config."
    }
]

module.exports = { data };