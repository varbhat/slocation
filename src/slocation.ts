import { writable } from "svelte/store";
import type { Readable } from "svelte/store";

export interface Slocation extends Readable<Location> {
  pushState: (
    data: any,
    title: string,
    url?: string | null | undefined
  ) => void;
  replaceState: (
    data: any,
    title: string,
    url?: string | null | undefined
  ) => void;
  goto: (url?: string, replace?: boolean | undefined) => void;
  reset: () => void;
}

const slocation = ((): Slocation => {
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
    pushState(data: any, title: string, url?: string | null | undefined): void {
      history.pushState(data, title, url);
      set(location);
    },
    replaceState(
      data: any,
      title: string,
      url?: string | null | undefined
    ): void {
      history.replaceState(data, title, url);
      set(location);
    },
    goto(url?: string, replace = false): void {
      replace ? this.replaceState({}, "", url) : this.pushState({}, "", url);
    },
    reset(): void {
      set(location);
    },
  };
})();

export default slocation;
