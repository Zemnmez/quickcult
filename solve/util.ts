export function quote(s: string | undefined) {
    if (s == undefined) return 'undefined';
    return `"${s.replace(/"/g, '\'')}"`
}

export function quoteIfNotIdentifier(s: string | undefined) {
    if (s == undefined) return 'undefined';
    if (s.indexOf(" ") !== -1) return quote(s);
    return s;
}

