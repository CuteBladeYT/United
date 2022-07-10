import * as wallpaper from "./wallpaper.mjs";
import * as taskbar from "./taskbar.mjs";
import * as program_launcher from "./program_launcher.mjs";

export function reload_desktop() {
    wallpaper.reload_wallpaper();
    taskbar.reload_taskbar();
    program_launcher.reload_launcher();
}