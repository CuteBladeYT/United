import { struct } from "../script.mjs";
import * as wputil from "../../../../system/dewm/mjs/wallpaper.mjs";


export function load_wallpapers() {
    let ret_channel = "SYSSETT_WALLPAPER_LIST";
    let wp_dir = {
        abs: "storage/user/wallpapers",
        rel: "../../wallpapers"
    };
    socket.emit("list_files", wp_dir.abs, ret_channel);

    socket.on(ret_channel, (files) => {
        files.forEach(wp => {
            let img = document.createElement("img");
            img.id = wp;
            img.src = `${wp_dir.rel}/${wp}`;
            img.onclick = () => {
                settings.desktop.wallpaper.path = `${wp_dir.abs}/${wp}`;
                socket.emit("save_settings", settings);
                wputil.reload();
            };
            document.querySelector(struct.sections.appearance.wallpaper.items).appendChild(img);
        });
    });};
