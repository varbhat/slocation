import { writable } from "svelte/store";
const slocation = (() => {
    const { subscribe, set } = writable(location, (set) => {
        const locupdate = () => {
            set(location);
        };
        addEventListener("popstate", locupdate, false);
        addEventListener("hashchange", locupdate, false);
        return () => {
            removeEventListener("popstate", locupdate, false);
            removeEventListener("hashchange", locupdate, false);
        };
    });
    return {
        subscribe,
        pushState(data, title, url) {
            history.pushState(data, title, url);
            set(location);
        },
        replaceState(data, title, url) {
            history.replaceState(data, title, url);
            set(location);
        },
        goto(url, replace = false) {
            replace ? this.replaceState({}, "", url) : this.pushState({}, "", url);
        },
        reset() {
            set(location);
        },
    };
})();
export default slocation;
