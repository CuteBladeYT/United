import * as wallpaper from "./wallpaper.mjs";
import * as taskbar from "./taskbar.mjs";
import * as program_launcher from "./program_launcher.mjs";
import * as notifs from "./notifications.mjs";
import * as de_icons from "./desktop_icons.mjs";
import * as wm from "./window_manager.mjs";

export function reload_desktop() {
    wallpaper.reload();
    taskbar.reload();
    program_launcher.reload();
    notifs.reload();
    de_icons.reload();
    wm.reload();
}