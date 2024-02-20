import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";



export const appGuard: CanActivateFn = (route, state) => {
    const token = localStorage.getItem('token');
    const router = inject(Router);
    if (token) {
        return new Promise<boolean>((res, rej) => {
            inject(HttpClient).get('http://localhost:3000/auth').subscribe({
                next: () => res(true),
                error: () => {
                    localStorage.clear();
                    router.navigate(['common/login']);
                    rej(false);
                }
            });
        })
    } else {
        router.navigate(['common/login']);
        return false;
    }
}