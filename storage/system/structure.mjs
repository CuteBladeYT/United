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
    },
    program_launcher: {
        self: "div#program_launcher",
        user: {
            name: "div#program_launcher > span#user_name",
            image: "div#program_launcher > img#user_image"
        },
        programs: {
            self: "div#program_launcher > div#programs",
            input: "div#program_launcher > div#programs > input[type=search]:nth-child(1)",
            list: "div#program_launcher > div#programs > div#list"
        },
        actions: {
            self: "div#program_launcher > div#actions",
            buttons: {
                shutdown: "div#program_launcher > div#actions > button#shutdown",
                reload: "div#program_launcher > div#actions > button#reload"
            }
        }
    }
}