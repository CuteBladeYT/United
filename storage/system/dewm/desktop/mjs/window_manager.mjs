import { settings } from "../../../settings.mjs";
import { structure } from "../../../structure.mjs";
import { get_translation } from "../../../translations.mjs";

export function reload() {
    let taskbar_height = settings.desktop.taskbar.height;
    let wm = document.querySelector(structure.windows.self);
    let wmw = document.querySelector(structure.windows.window.self);
    wm.style = `top: 0;
                left: calc(${taskbar_height}px / 2);
                width: calc(100% - (${taskbar_height}px * 2) / 2);
                height: calc(100% - (${taskbar_height}px * 4) / 2.5);
    `;
    wmw.style = `top: calc(${taskbar_height}px);
                height: calc(100% - (${taskbar_height}px));
    `;
}

// export function new_window(
//     app_data = {
//         name: String,
//         icon: String,
//         path: String,
//         on_taskbar: Boolean
//     }
// )