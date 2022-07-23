import { settings } from "../../settings.mjs";
import { structure } from "../../structure.mjs";
import { get_translation } from "../../translations.mjs";

export function reload() {
    let notifs = document.querySelector(structure.notifications.self);
    notifs.style = `max-height: calc(100% - ${settings.desktop.taskbar.height}px - 1vh)`;
}

export function notification(text = String, icon = String, onclick) {
    let notif = document.createElement("div");
    notif.onclick = () => onclick;
    notif.oncontextmenu = () => {
        notif.remove();
    };

    let iconel = document.createElement("img");
    iconel.src = icon;

    let btn = document.createElement("button");
    btn.textContent = text;

    let progress = document.createElement("progress");
    progress.min = 0;
    progress.max = 1000;
    progress.value = 0;

    notif.appendChild(iconel);
    notif.appendChild(btn);
    notif.appendChild(progress);
    document.querySelector(structure.notifications.self).appendChild(notif);

    let i = 0;
    let inv = setInterval(() => {
        i += 1;
        if (progress.value == progress.max) {
            clearInterval(inv);
            notif.remove();
        };
        progress.value += 1;
    }, 10);
}
