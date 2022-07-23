import { settings } from "../../settings.mjs";
import { structure } from "../../structure.mjs";
import { get_translation } from "../../translations.mjs";


import { change_tb_button_state, remove_tb_button, add_tb_item } from "./taskbar.mjs";

let windows = [];

let current_opened_window = {
  name: String,
  id: String
};


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

    control.hide.onclick = () => show_desktop();

    let wm_height = "";

    if (settings.desktop.taskbar.auto_hide == true)
        wm_height = `calc(100% - (${taskbar_height}px * 2) / 4)`;
    else
        wm_height = `calc(100% - (${taskbar_height}px * 4) / 2.5)`;
    wm.style = `top: 0;
                left: calc(${taskbar_height}px / 2);
                width: calc(100% - (${taskbar_height}px * 2) / 2);
                height: ${wm_height};
                display: none;
    `;
    wmw.style = `top: calc(${taskbar_height}px);
                height: calc(100% - (${taskbar_height}px));
    `;
    control.title.style = `font-family: ${settings.desktop.font}`;
}

export function set_control_info() {
    // let c = document.querySelector(structure.windows.control.self);
    let wm = document.querySelector(structure.windows.self);
    let i = {
        title: document.querySelector(structure.windows.control.title),
        hide: document.querySelector(structure.windows.control.hide),
        close: document.querySelector(structure.windows.control.close)
    };
    let wid = current_opened_window.id;
    i.title.textContent = current_opened_window.name;

    if (wid == "")
        wm.style.display = "none";
    else wm.style.display = "unset";

    i.close.onclick = () => close_window(wid);
}

export function show_desktop() {
    let wm = document.querySelector(structure.windows.self);
    let c = document.querySelector(structure.windows.control.self);
    let vw = document.querySelector(structure.windows.window.self);

    if (vw.style.display == "none")
        vw.style.display = "unset",
        wm.style.height = wm_height;
    else
        vw.style.display = "none",
        wv.style.height = "10vh";
}

export function switch_to_window(win_id = String) {
    let wfound = false;
    windows.forEach(w => {
        if (w.app_data.id == win_id) {
            //document.querySelector(structure.windows.window.self).appendChild(w.element);
            wfound = true;
            w.element.style.display = "flex";
            current_opened_window.name = w.app_data.name;
            current_opened_window.id = w.app_data.id;
            set_control_info();
        } else w.element.style.display = "none";
    });
    if (wfound == false) return Error("404: Window ID not found");
    return 0
}

export function close_window(win_id = String) {
    let wfound = false;
    windows.forEach(w => {
        if (w.app_data.id == win_id)
            wfound = true,
            w.element.remove(),
            windows.splice(windows.indexOf(w), 1),
            current_opened_window.id = "",
            current_opened_window.name = "";
    });
    if (wfound == false) return Error("404: Window ID not found");

    change_tb_button_state(win_id, "");
    remove_tb_button(win_id);

    if (windows.length > 0)
        switch_to_window(windows[windows.length - 1].app_data.id);
    else set_control_info();

    return 0;
}
export function new_window(app_data = {
    name: String,
    id: String,
    icon: String,
    src: String,
    on_taskbar: Boolean
}) {
    let vw = document.querySelector(structure.windows.window.self);
    let win_exist = false;
    windows.forEach(w => {
    if (app_data.id == w.app_data.id)
        win_exist = true;
    });
    if (win_exist == true)
        switch_to_window(app_data.id),
        windows.forEach(w => {
        change_tb_button_state(w.element.id, "opened");
    });
    else {
        vw.innerHTML += `<webview id="${app_data.id}" src="${app_data.src}"></webview>`;
        if (windows.length > 4) close_window(windows[0].app_data.id);
        windows.push({
            app_data: app_data,
            element: document.querySelector(structure.windows.window.last)
        });
    };
    current_opened_window.name = app_data.name;
    current_opened_window.id = app_data.id;
    set_control_info();
    change_tb_button_state(app_data.id, "active");
    switch_to_window(app_data.id);
}
