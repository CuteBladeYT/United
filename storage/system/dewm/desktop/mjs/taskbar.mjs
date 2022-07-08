import * as time from "../../../time.mjs";
import { settings } from "../../../settings.mjs";
import { structure } from "../../../structure.mjs";

export function reload_taskbar() {
    let taskbar = document.querySelector(structure.taskbar.self);
    let program_launcher = document.querySelector(structure.taskbar.program_launcher.self);

    taskbar.style.height = `${settings.desktop.taskbar.height}px`;

    program_launcher.style.width = `${settings.desktop.taskbar.height}px`;
    if (settings.experimental_mode)
        program_launcher.firstChild.src = "storage/system/icns/nightly.png";
    else program_launcher.firstChild.src = "storage/system/icns/icon.png";
}