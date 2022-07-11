import { settings } from "../../../settings.mjs";
import { structure } from "../../../structure.mjs";
import { get_translation } from "../../../translations.mjs";

let windows = [];

export function reload() {
    let taskbar_height = settings.desktop.taskbar.height;
    let wm = document.querySelector(structure.windows.self);
    let wmw = document.querySelector(structure.windows.window.self);
    let control = {
        self: document.querySelector(structure.windows.control.self),
        title: document.querySelector(structure.windows.control.title),
        hide: document.querySelector(structure.windows.control.hide),
        close: document.querySelector(structure.windows.control.close)
    };
    wm.style = `top: 0;
                left: calc(${taskbar_height}px / 2);
                width: calc(100% - (${taskbar_height}px * 2) / 2);
                height: calc(100% - (${taskbar_height}px * 4) / 2.5);
    `;
    wmw.style = `top: calc(${taskbar_height}px);
                height: calc(100% - (${taskbar_height}px));
    `;
    control.title.style = `font-family: ${settings.desktop.font}`;
}

export function switch_to_window(win_id = String) {
    let wfound = false;
    windows.forEach(w => {
        if (w.app_data.id == win_id)
            document.querySelector(structure.windows.window.self).appendChild(w.element);
    });
    if (wfound == false) return Error("404: Window ID not found");
    return 0
}

export function close_window(win_id = String) {
    let wfound = false;
    windows.forEach(w => {
        if (w.app_data.id == win_id)
            w.element.remove(),
                windows.splice(windows.indexOf(w), 1),
                wfound = true;
    });
    if (wfound == false) return Error("404: Window ID not found");
    return 0
}
export function new_window(app_data = {
    name: String,
    id: String,
    icon: String,
    path: String,
    on_taskbar: Boolean
}) {
    let vw = document.querySelector(structure.windows.window.self);
    vw.innerHTML += `<webview id="${app_data.id}" src="${app_data.path}"></webview>`;
    windows.push({
        app_data: app_data,
        element: document.querySelector(structure.windows.window.last)
    });
}