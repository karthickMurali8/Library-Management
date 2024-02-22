import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const canAuthorise: CanActivateFn = (route, state) => {
    const isAdmin = JSON.parse(JSON.parse(localStorage.getItem('user') || '')?.isAdmin);
    const segments = route.url.map(seg => seg.path);
    if (
        (isAdmin && segments.includes('myBooks')) ||
        (!isAdmin && segments.includes('customers'))
    ) {
        inject(Router).navigate(['/app/library']);
        return false;
    }
    return true;
}