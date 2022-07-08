export const translations = {
    SUPPORTED_LANGUAGES: [
        {
            name: {
                og: "English",
                en: "English",
                pl: "Angielski",
                bul: ""
            },
            id: "en"
        },
        {
            name: {
                og: "Polski",
                en: "Polish",
                pl: "Polski",
                bul: ""
            },
            id: "pl"
        },
        {
            name: {
                og: "Български",
                en: "Bulgarian",
                pl: "Bułgarski",
                bul: "Български"
            },
            id: "bul"
        }
    ],
    structure: {
        taskbar: {
            programLauncher: {
                self: {
                    en: "Launcher",
                    pl: "Programy",
                    bul: "Програми"
                },
                hover: {
                    en: "Launch programs",
                    pl: "Uruchom programy",
                    bul: ""
                }
            },
        },
    },
    states: {
        battery: {
            en: "Battery",
            pl: "Bateria",
            bul: "Батерия",
            charging: {
                en: "Charging",
                pl: "Ładowanie",
                bul: "Зареждане"
            }
        },
        volume: {
            en: "Volume",
            pl: "Głośność",
            bul: "Ниво на звука",
            muted: {
                en: "Muted",
                pl: "Wyciszone",
                bul: "Заглушен"
            }
        },
        connection: {
            en: "Internet",
            pl: "Internet",
            bul: "Интернет",
            state: {
                true: {
                    en: "Connected",
                    pl: "Połączony",
                    bul: "Свързан"
                },
                false: {
                    en: "Disconnected",
                    pl: "Niepołączony",
                    bul: "Изключен"
                }
            }
        }
    }
}