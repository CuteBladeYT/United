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
        }
    }
}