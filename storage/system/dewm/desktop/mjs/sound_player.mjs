export function play(file = String, loop = Boolean) {
    if (file.startsWith(".../")) {
        file = file.replace(".../", "storage/system/sounds/");
    };
    let a = new Audio(file);
    a.loop = loop;
    a.play();
}
