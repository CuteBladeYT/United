export let structure = {
    wallpaper: {
        self: "div#wallpaper",
        wp: "div#wallpaper > :nth-child(1)"
    },
    taskbar: {
        self: "div#taskbar",
        program_launcher: {
            self: "div#taskbar > button#program_launcher",
            icon: "div#taskbar > button#program_launcher > img"
        },
        programs: {
            self: "div#taskbar > div#programs"
        },
        tray: {
            self: "div#taskbar > button#tray",
            imgs: {
                notif: "div#taskbar > button#tray > img#notif",
                battery: "div#taskbar > button#tray > img#battery",
                volume: "div#taskbar > button#tray > img#volume",
                connection: "div#taskbar > button#tray > img#connect"
            }
        },
        clock: {
            self: "div#taskbar > button#clock"
        }
    }
}