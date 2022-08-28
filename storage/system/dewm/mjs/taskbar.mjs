import * as time from "../../time.mjs";
import { settings } from "../../settings.mjs";
import { structure } from "../../structure.mjs";
import { get_translation } from "../../translations.mjs";


import * as programs_data from "../../../user/programs/data.mjs";

import * as program_launcher_util from "./program_launcher.mjs";
import * as window_api from "./window_manager.mjs";

let clock_interval;
let clock_show_date = false;
let clock_month_name = false;

const TASKBAR_PROGRAMS_BUTTONS_ID = "TASKBAR_PROGRAMS_BUTTONS";

let CURRENT_LANGUAGE = settings.language;

export function reload() {
    // get all elements
    let taskbar = document.querySelector(structure.taskbar.self);
    let program_launcher = document.querySelector(structure.taskbar.program_launcher.self);
    let program_launcher_icon = document.querySelector(structure.taskbar.program_launcher.icon);
    let programs = document.querySelector(structure.taskbar.programs.self);
    let tray = document.querySelector(structure.taskbar.tray.self);
    let tray_imgs = {
        notif: document.querySelector(structure.taskbar.tray.imgs.notif),
        battery: document.querySelector(structure.taskbar.tray.imgs.battery),
        volume: document.querySelector(structure.taskbar.tray.imgs.volume),
        connection: document.querySelector(structure.taskbar.tray.imgs.connection)
    };
    let clock = document.querySelector(structure.taskbar.clock.self);

    // assign height to variable
    let taskbar_height = settings.desktop.taskbar.height;



    taskbar.style.height = `${taskbar_height}px`;

    if (settings.desktop.taskbar.auto_hide == true) {
        taskbar.onmouseenter = () => {
            if (document.querySelector(structure.program_launcher.self).style.display == "none") {
                taskbar.style.bottom = `0`;
                taskbar.style.opacity = "1";
            };
        };
        taskbar.onmouseleave = () => {
            if (document.querySelector(structure.program_launcher.self).style.display == "none") {
                taskbar.style.bottom = `calc(1px - ${taskbar_height}px)`;
                taskbar.style.opacity = "0";
            };
        };
    };

    program_launcher.title = get_translation(CURRENT_LANGUAGE, `structure.taskbar.program_launcher.hover`);
    program_launcher.style.width = `${taskbar_height}px`;
    if (settings.experimental_mode)
        program_launcher_icon.src = "storage/system/icns/nightly.png";
    else program_launcher_icon.src = "storage/system/icns/icon.png";
    program_launcher.onclick = () => program_launcher_util.change_visibility();
    program_launcher_icon.draggable = false;

    programs.style = `left: calc(${taskbar_height}px + 4px);
                        width: calc(100% - (${taskbar_height}px * 4) - (${taskbar_height}px * 4) - (4px))
    `;

    let programs_buttons_css = document.head.querySelector(`style#${TASKBAR_PROGRAMS_BUTTONS_ID}`);
    if (programs_buttons_css)
        programs_buttons_css.remove();
    
    programs_buttons_css = document.createElement("style");
    programs_buttons_css.id = TASKBAR_PROGRAMS_BUTTONS_ID;
    programs_buttons_css.textContent = `
    div#taskbar > div#programs > button {
        width: ${taskbar_height}px;
        height: ${taskbar_height}px;
    }
    `;
    document.head.appendChild(programs_buttons_css);

    tray.title = get_translation(CURRENT_LANGUAGE, `structure.taskbar.tray`);
    tray.style = `right: calc(${taskbar_height}px * 3);
                    width: calc(${taskbar_height}px * 4)
    `;
    

    // clock.title = get_translation(CURRENT_LANGUAGE, `structure.taskbar.clock`);
    clock.style = `right: 0;
                    width: calc(${taskbar_height}px * 3);
                    font-size: calc(${taskbar_height}px / 2);
                    font-family: ${settings.desktop.font};
    `;
    clock.onmouseenter = () => clock_show_date = true;
    clock.onmouseleave = () => clock_show_date = false;
    clock.onclick = () => clock_month_name = !clock_month_name;

    if (clock_interval) clearInterval(clock_interval);
    clock_interval = setInterval(() => {
        let t = time.get_parsed();

        if (clock_show_date == true) {
            if (clock_month_name == true)
                clock.textContent = `${t.day} ${get_translation(settings.language, `dates.months[${parseInt(t.monthd)}].short`)} ${t.year}`,
                    clock.style.fontSize = `calc(${taskbar_height}px / 2.5)`;
            else
                clock.textContent = `${t.day}.${t.monthd}.${t.year}`,
                    clock.style.fontSize = `calc(${taskbar_height}px / 2)`;
        } else {
            clock.textContent = `${t.hour}:${t.minute}`;
            if (settings.desktop.taskbar.clock.show_seconds == true && clock_show_date == false)
                clock.textContent += `:${t.second}`;
            clock.style.fontSize = `calc(${taskbar_height}px / 2)`;
        };
    }, 100);

    programs_data.programs.forEach(program => {
        if (program.on_taskbar == true) {
            add_tb_item(program);
        };
    });
}


export function add_tb_item(app_data = {
    name: String,
    id: String,
    icon: String,
    src: String,
    on_taskbar: Boolean
}) {
    let btn = document.createElement("button");
    btn.id = app_data.id;
    btn.title = app_data.name;
    btn.className = `on_taskbar_${app_data.on_taskbar}`;
    btn.onclick = () => window_api.new_window(app_data);

    let icn = document.createElement("img");
    icn.src = app_data.icon;

    btn.appendChild(icn);
    document.querySelector(structure.taskbar.programs.self).appendChild(btn);
}

export function remove_tb_button(id = String) {
    let btn = document.querySelector(`${structure.taskbar.programs.self} > button#${id}`);
    if (btn != null)
        if (btn.className.endsWith("false"))
            btn.remove();
    else return Error(`404: Button of ID ${id} not found`);
    return 0
}

export function change_tb_button_state(id = String, state = String) {
    let btn = document.querySelector(`${structure.taskbar.programs.self} > button#${id}`);
    if (!btn)
        return Error(`404: Button of ID ${id} not found`);

    let states = [
        "",
        "active",
        "opened",
        "awaiting"
    ];

    let state_found = false;
    states.forEach(s => {
        if (state == s)
            state_found = true;
    });
    if (state_found)
        btn.className = state;
    else return Error(`404: Button state ${state} not found`);
    return 0
}

export function check_if_exist(app_id = String) {
    let btn_exist = false;

    document.querySelector(structure.taskbar.programs.self).childNodes.forEach(btn => {
        if (app_id = btn.id) btn_exist = true;
    });

    return btn_exist
}
