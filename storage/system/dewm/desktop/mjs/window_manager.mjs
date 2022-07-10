import { settings } from "../../../settings.mjs";
import { structure } from "../../../structure.mjs";
import { get_translation } from "../../../translations.mjs";

export function reload() {
    let taskbar_height = settings.desktop.taskbar.height;
    let wm = document.querySelector(structure.windows.self);
    wm.style = `top: calc(${taskbar_height}px / 2);
                left: calc(${taskbar_height}px / 2);
                width: calc(100% - (${taskbar_height}px * 2) / 2);
                height: calc(100% - (${taskbar_height}px * 4) / 2);
    `;
}