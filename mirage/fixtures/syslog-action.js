const data = [
    {
        parameters: {},
        path: "Syslog."
    },
    {
        parameters: {},
        path: "Syslog.Action."
    },
    {
        parameters: {
            FilePath: "/var/log/messages/wifi"
        },
        path: "Syslog.Action.wifi.LogFile."
    },
    {
        parameters: {
            FilePath: "/var/log/messages/firewall"
        },
        path: "Syslog.Action.firewall.LogFile."
    },
    {
        parameters: {
            FilePath: "/var/log/messages/dhcp"
        },
        path: "Syslog.Action.dhcp.LogFile."
    },
    {
        parameters: {
            FilePath: "/var/log/messages/lcm"
        },
        path: "Syslog.Action.lcm.LogFile."
        
    },
    {
        parameters: {
            FilePath: "/var/log/messages/messages"
        },
        path: "Syslog.Action.messages.LogFile."
    },
    {
        parameters: {
            FilePath: "/var/log/messages/messages_remote"
        },
        path: "Syslog.Action.messages_remote.LogFile."
    },
]

module.exports = { data };