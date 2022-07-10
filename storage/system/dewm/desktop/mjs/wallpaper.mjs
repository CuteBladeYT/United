import { settings } from "../../../settings.mjs";
import { structure } from "../../../structure.mjs";

export function reload() {
    let wpel = document.querySelector(structure.wallpaper.wp);
    if (wpel) wpel.remove();
    wpel = document.createElement(settings.desktop.wallpaper.type);

    if (settings.desktop.wallpaper.type == "video") {
        wpel.autoplay = true;
        wpel.muted = true;
    };
    if (settings.desktop.taskbar.auto_hide == true)
        wpel.style.height = `100vh`;
    else wpel.style.height = `calc(100vh - ${settings.desktop.taskbar.height}px)`;
    wpel.style.objectFit = settings.desktop.wallpaper.fit;
    wpel.style.background = settings.desktop.wallpaper.background;
    wpel.src = settings.desktop.wallpaper.path;
    wpel.draggable = false;

    document.querySelector(structure.wallpaper.self).appendChild(wpel);
}