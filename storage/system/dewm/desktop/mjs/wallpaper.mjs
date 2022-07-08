import { settings } from "../../../settings.mjs";
import { structure } from "../../../structure.mjs";

export function reload_wallpaper() {
    let wpel = document.querySelector(structure.wallpaper.wp);
    if (wpel) wpel.remove();
    wpel = document.createElement(settings.desktop.wallpaper.type);
    wpel.src = settings.desktop.wallpaper.path;
    if (settings.desktop.wallpaper.type == "video") {
        wpel.autoplay = true;
        wpel.muted = true;
    };
    wpel.style.height = `calc(100vh - ${settings.desktop.taskbar.height}px)`;
    wpel.style.objectFit = settings.desktop.wallpaper.fit;
    wpel.style.background = settings.desktop.wallpaper.background;
    wpel.draggable = false;
    document.querySelector(structure.wallpaper.self).appendChild(wpel);
}