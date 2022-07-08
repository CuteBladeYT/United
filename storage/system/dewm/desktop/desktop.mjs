import { translations } from "../../translations.mjs";
import { settings } from "../../settings.mjs";
import { user_data } from "../../../user/data.mjs";
import { programs } from "../../../user/programs/data.mjs";
import { structure } from "../../structure.mjs";


import * as wallpaper_util from "./mjs/wallpaper.mjs";
import * as teskbar_util from "./mjs/taskbar.mjs";
import * as desktop_env from "./mjs/denv.mjs";

document.addEventListener("DOMContentLoaded", async () => {
    desktop_env.reload_desktop();
});