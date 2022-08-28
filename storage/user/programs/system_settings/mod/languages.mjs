import { struct } from "../script.mjs";
import { settings } from "../../../../system/settings.mjs";
import { translations } from "../../../../system/translations.mjs"; 

export function load_languages() {
    let sel = document.querySelector(struct.sections.accesibility.language);

    translations.SUPPORTED_LANGUAGES.forEach(language => {
        let opt = document.createElement("option");
        opt.value = language.id;
        opt.id = language.id;
        let langn = `${language.name.en}*|*|*${language.name.og}`;
        if (langn.match(" "))
            langn = langn.replace("*|*|*", "; ");
        else langn = langn.replace("*|*|*", " ");
        opt.textContent = langn;
        sel.appendChild(opt);
    });
}
