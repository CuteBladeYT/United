import * as time from "../../../time.mjs";
import { settings } from "../../../settings.mjs";
import { structure } from "../../../structure.mjs";
import { get_translation } from "../../../translations.mjs";


import * as program_launcher_util from "./program_launcher.mjs";

let clock_interval;

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
            taskbar.style.bottom = `0`;
            taskbar.style.opacity = "1";
        };
        taskbar.onmouseleave = () => {
            taskbar.style.bottom = `calc(1px - ${taskbar_height}px)`;
            taskbar.style.opacity = "0";
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
    

    clock.title = get_translation(CURRENT_LANGUAGE, `structure.taskbar.clock`);
    clock.style = `right: 0;
                    width: calc(${taskbar_height}px * 3);
                    font-size: calc(${taskbar_height}px / 2);
                    font-family: ${settings.desktop.font};
    `;

    if (clock_interval) clearInterval(clock_interval);
    clock_interval = setInterval(() => {
        let t = time.get_parsed();

        clock.textContent = `${t.hour}:${t.minute}`;
        if (settings.desktop.taskbar.clock.show_seconds == true)
            clock.textContent += `:${t.second}`;
    }, 1000);
}