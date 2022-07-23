import { user_data } from "../../../user/data.mjs";
import { settings } from "../../settings.mjs";
import { structure } from "../../structure.mjs";
import { get_translation } from "../../translations.mjs";


import * as programs_data from "../../../user/programs/data.mjs";
import * as window_api from "./window_manager.mjs";

const PROGRAM_LAUNCHER_PROGRAMS_CSS_ID = "PROGRAM_LAUNCHER_PROGRAMS_BUTTONS";

export function reload() {
    let pl = document.querySelector(structure.program_launcher.self);
    let user = {
        name: document.querySelector(structure.program_launcher.user.name),
        image: document.querySelector(structure.program_launcher.user.image)
    };
    let programs = {
        self: document.querySelector(structure.program_launcher.programs.self),
        input: document.querySelector(structure.program_launcher.programs.input),
        list: document.querySelector(structure.program_launcher.programs.list)
    };
    let actions = {
        self: document.querySelector(structure.program_launcher.actions.self),
        shutdown: document.querySelector(structure.program_launcher.actions.buttons.shutdown),
        reload: document.querySelector(structure.program_launcher.actions.buttons.reload)
    };

    // assign height to variable
    let taskbar_height = settings.desktop.taskbar.height;

    pl.style = `bottom: ${taskbar_height}px;
                height: calc(100% - (${taskbar_height}px * 2));
                display: none;
    `;

    user.name.textContent = user_data.name;
    user.image.src = user_data.image;
    user.image.draggable = false;

    user.name.style = `font-family: ${settings.desktop.font};
    `;

    let prgbtncss = document.head.querySelector(`style#${PROGRAM_LAUNCHER_PROGRAMS_CSS_ID}`);
    if (prgbtncss) prgbtncss.remove();
    prgbtncss = document.createElement("style");
    prgbtncss.id = PROGRAM_LAUNCHER_PROGRAMS_CSS_ID;
    prgbtncss.textContent = `
    div#program_launcher > div#programs > div#list > button {
        font-family: ${settings.desktop.font};
    }
    `;
    document.head.appendChild(prgbtncss);

    actions.shutdown.style = `font-family: ${settings.desktop.font}`;
    actions.reload.style = `font-family: ${settings.desktop.font}`;
    actions.shutdown.onclick = () => socket.emit("quit");
    actions.reload.onclick = () => socket.emit("reload");

    programs_data.programs.forEach(program => {
        let btn = document.createElement("button");
        btn.id = program.id;
        btn.textContent = program.name;
        btn.onclick = () => {
            window_api.new_window(program);
            change_visibility();
        };
    
        let icn = document.createElement("img");
        icn.src = program.icon;
    
        btn.appendChild(icn);
        document.querySelector(structure.program_launcher.programs.list).appendChild(btn);
    });
}

export function change_visibility() {
    let l = document.querySelector(structure.program_launcher.self);
    let isVis = l.style.display == "unset";
    if (isVis)
        l.style.display = "none";
    else
        l.style.display = "unset";
}
