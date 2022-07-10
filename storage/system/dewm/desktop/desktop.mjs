import { translations } from "../../translations.mjs";
import { settings } from "../../settings.mjs";
import { user_data } from "../../../user/data.mjs";
import { programs } from "../../../user/programs/data.mjs";
import { structure } from "../../structure.mjs";


import * as desktop_env from "./mjs/denv.mjs";

import { notification } from "./mjs/notifications.mjs";

document.addEventListener("DOMContentLoaded", async () => {
    desktop_env.reload_desktop();
    notification("sus");
});