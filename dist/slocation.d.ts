import type { Readable } from "svelte/store";
export interface Slocation extends Readable<Location> {
    pushState: (data: any, title: string, url?: string | null | undefined) => void;
    replaceState: (data: any, title: string, url?: string | null | undefined) => void;
    goto: (url?: string, replace?: boolean | undefined) => void;
    reset: () => void;
}
declare const slocation: Slocation;
export default slocation;
