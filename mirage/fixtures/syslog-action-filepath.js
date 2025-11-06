const data = [
    {
        "parameters": {
            "Enable": 1,
            "VendorLogFileRef": "DeviceInfo.VendorLogFile.2",
            "FilePath": "file:///var/log/messages_wifi"
        },
        "path": "Device.Syslog.Action.1.LogFile."
    },
    {
        "parameters": {
            "Enable": 1,
            "VendorLogFileRef": "DeviceInfo.VendorLogFile.6",
            "FilePath": "file:///var/log/messages_firewall"
        },
        "path": "Device.Syslog.Action.2.LogFile."
    },
    {
        "parameters": {
            "Enable": 1,
            "VendorLogFileRef": "DeviceInfo.VendorLogFile.4",
            "FilePath": "file:///var/log/messages_dhcp"
        },
        "path": "Device.Syslog.Action.3.LogFile."
    },
    {
        "parameters": {
            "Enable": 1,
            "VendorLogFileRef": "DeviceInfo.VendorLogFile.5",
            "FilePath": "file:///var/log/messages_lcm.log"
        },
        "path": "Device.Syslog.Action.4.LogFile."
    },
    {
        "parameters": {
            "Enable": 1,
            "VendorLogFileRef": "DeviceInfo.VendorLogFile.3",
            "FilePath": "file:///var/log/messages"
        },
        "path": "Device.Syslog.Action.5.LogFile."
    },
    {
        "parameters": {
            "Enable": 0,
            "VendorLogFileRef": "",
            "FilePath": ""
        },
        "path": "Device.Syslog.Action.6.LogFile."
    }
]

module.exports = { data };