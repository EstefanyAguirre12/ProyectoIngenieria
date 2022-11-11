import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/tenant',        title: 'Huespedes',         icon:'nc-single-02',       class: '' },
    { path: '/beds',          title: 'Camas',             icon:'nc-bookmark-2',    class: '' },
    { path: '/treatments',    title: 'Tratamientos',      icon:'nc-paper',      class: '' },
    { path: '/treatments-given',  title: 'Tratamientos dados',   icon:'nc-calendar-60',  class: '' },
    { path: '/medicines',     title: 'Medicinas',         icon:'nc-book-bookmark',    class: '' },
    { path: '/visits',        title: 'Visitas',           icon:'nc-badge',  class: '' },
    { path: '/events',        title: 'Eventos',           icon:'nc-tile-56',    class: '' },
    { path: '/donations',     title: 'Donaciones',        icon:'nc-box', class: '' },
    { path: '/users',         title: 'Usuarios',          icon:'nc-single-copy-04',  class: '' },
    //{ path: '/profile',       title: 'Perfil',            icon:'nc-circle-10',  class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
