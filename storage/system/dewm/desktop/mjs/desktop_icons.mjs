import { settings } from "../../../settings.mjs";
import { structure } from "../../../structure.mjs";
import { get_translation } from "../../../translations.mjs";


import * as programs_data from "../../../../user/programs/data.mjs";
import * as window_api from "./window_manager.mjs";

export function reload() {
    let dicn = document.querySelector(structure.dekstop_icons.self);
    dicn.style = `height: calc(100% - ${settings.desktop.taskbar.height}px)`;

    dicn.childNodes.forEach(btn => {
        btn.remove();
    });
    programs_data.programs.forEach(program => {
        if (program.on_desktop == true) {
            let btn = document.createElement("button");
            btn.id = program.id;
            btn.onclick = () => window_api.new_window(program);

            let icn = document.createElement("img");
            icn.src = program.icon;

            let name = document.createElement("span");
            name.textContent = program.name;

            btn.appendChild(icn);
            btn.appendChild(name);

            dicn.appendChild(btn);
        };
    });
}