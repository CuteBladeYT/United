

export function get_parsed() {
    let date = new Date();
    let d = date.getDate();
    let dof = date.getDay();
    let mo = date.getMonth();
    let mod = date.getMonth() + 1;
    let y = date.getFullYear();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ms = date.getMilliseconds();
    let var_date = date.toTimeString();

    if (d.toString().length == 1) d = "0" + d;
    if (mo.toString().length == 1) mo = "0" + mo;
    if (mod.toString().length == 1) mod = "0" + mod;
    if (h.toString().length == 1) h = "0" + h;
    if (m.toString().length == 1) m = "0" + m;
    if (s.toString().length == 1) s = "0" + s;

    return {
        year: y,
        month: mo,
        monthd: mod,
        day: d,
        day_of_week: dof,
        hour: h,
        minute: m,
        second: s,
        milisecond: ms,
        date: var_date
    }
}