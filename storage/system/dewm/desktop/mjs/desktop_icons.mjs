import { settings } from "../../../settings.mjs";
import { structure } from "../../../structure.mjs";
import { get_translation } from "../../../translations.mjs";

export function reload() {
    let dicn = document.querySelector(structure.dekstop_icons.self);
    dicn.style = `height: calc(100% - ${settings.desktop.taskbar.height}px)`;
}