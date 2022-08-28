export let struct = {
    header: "body > h1:nth-child(1)",
    savebutton: "body > button#save",
    sections: {
        appearance: {
            self: "details#appearance",
            header: "details#appearance > summary",
            wallpaper: {
                self: "details#appearance > div > div#wallpaper",
                header: "details#appearance > div > div#wallpaper > h3:nth-child(1)",
                items: "details#appearance > div > div#wallpaper > div#items",
                type: "details#appearance > div > div#wallpaper > select#type",
                fitmode: "details#appearance > div > div#wallpaper > select#fit_mode",
                bgcolor: "details#appearance > div > div#wallpaper > input#bg_color"
            },
            taskbar: {
                self: "details#appearance > div > div#taskbar",
                header: "details#appearance > div > div#taskbar > h3:nth-child(1)",
                tbheight: "details#appearance > div > div#taskbar > input#tb_height",
                autohide: "details#appearance > div > div#taskbar > input#autohide",
                clockseconds: "details#appearance > div > div#taskbar > input#clock_seconds"
            }
        },
        accesibility: {
            self: "details#accessibility",
            header: "details#accessibility > summary",
            
            language: "details#accessibility > div > select#language"
        },
        features: {
            self: "details#features",
            header: "details#features > summary",

            experimentalmode: "details#features > div > input#experimental_mode"
        }
    }
}

import * as wp_ from "./mod/wallpaper.mjs";
import * as lang_ from "./mod/languages.mjs";
import { settings } from "../../../system/settings.mjs";

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(struct.savebutton).onclick = () => {
        // WALLPAPER TYPE
        settings.desktop.wallpaper.type = 
            document.querySelector(struct.sections.appearance.wallpaper.type).value;
        
        // WALLPAPER FIT MODE
        settings.desktop.wallpaper.fit =
            document.querySelector(struct.sections.appearance.wallpaper.fitmode).value;
        
        // WALLPAPER BACKGROUND
        settings.desktop.wallpaper.background = 
            document.querySelector(struct.sections.appearance.wallpaper.bgcolor).value


        // TASKBAR HEIGHT
        settings.desktop.taskbar.height = 
            document.querySelector(struct.sections.appearance.taskbar.tbheight).value;

        // TASKBAR AUTOHIDE
        settings.desktop.taskbar.auto_hide = 
            document.querySelector(struct.sections.appearance.taskbar.autohide).checked;

        // TASKBAR CLOCK SECONDS
        settings.desktop.taskbar.clock.show_seconds = 
            document.querySelector(struct.sections.appearance.taskbar.clockseconds).checked;

        // LANGUAGE
        settings.language = 
        document.querySelector(struct.sections.accesibility.language).value;

        // EXPERIMENTAL MODE
        settings.experimental_mode = 
        document.querySelector(struct.sections.features.experimentalmode).checked;

        socket.emit("save_settings", settings);
    };

    // ------------------------------------ //
    
    wp_.load_wallpapers();
    lang_.load_languages();

    // ------------------------------------ //

    // WALLPAPER TYPE
    document.querySelector(struct.sections.appearance.wallpaper.type).value = 
        settings.desktop.wallpaper.type
    
    // WALLPAPER FIT MODE
    document.querySelector(struct.sections.appearance.wallpaper.fitmode).value = 
        settings.desktop.wallpaper.fit
    
    // WALLPAPER BACKGROUND
    document.querySelector(struct.sections.appearance.wallpaper.bgcolor).value = 
        settings.desktop.wallpaper.background


    // TASKBAR HEIGHT
    document.querySelector(struct.sections.appearance.taskbar.tbheight).value = 
        settings.desktop.taskbar.height;

    // TASKBAR AUTOHIDE
    document.querySelector(struct.sections.appearance.taskbar.autohide).checked = 
        settings.desktop.taskbar.auto_hide;

    // TASKBAR CLOCK SECONDS
    document.querySelector(struct.sections.appearance.taskbar.clockseconds).checked = 
        settings.desktop.taskbar.clock.show_seconds;


    // LANGUAGE
    document.querySelector(struct.sections.accesibility.language).value = 
        settings.language;

    // EXPERIMENTAL MODE
    document.querySelector(struct.sections.features.experimentalmode).checked = 
        settings.experimental_mode;
});
