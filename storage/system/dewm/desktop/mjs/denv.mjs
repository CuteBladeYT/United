import * as wallpaper from "./wallpaper.mjs";
import * as taskbar from "./taskbar.mjs";

export function reload_desktop() {
    wallpaper.reload_wallpaper();
    taskbar.reload_taskbar();
}