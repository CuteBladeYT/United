import { settings } from "../../../settings.mjs";
import { structure } from "../../../structure.mjs";
import { get_translation } from "../../../translations.mjs";

export function reload() {
    let notifs = document.querySelector(structure.notifications.self);
    notifs.style = `max-height: calc(100% - ${settings.desktop.taskbar.height}px - 1vh)`;
}