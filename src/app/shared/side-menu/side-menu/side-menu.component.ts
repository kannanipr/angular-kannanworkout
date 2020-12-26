import { Component, OnInit, Input } from '@angular/core';
import {
  faArrowAltCircleLeft
} from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from '../models/side-menu.models';
import { MENU_CONST as CONST} from '../constants/side-menu.constant';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { WindowSize, WindowsSizeListenerService } from '@common/services/util/windows-size-listener.service';
import { AuthStateModel } from 'src/app/auth/models/auth.models';
import { AuthStateService } from 'src/app/auth/auth-state.service';


@Component({
  selector: 'ces-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

  public menuList: MenuItem[] = [];

  public icMinifyMenu = faArrowAltCircleLeft;

  @Input() showMenu = false;

  public windowSize: WindowSize;

  private _authState: AuthStateModel;

  constructor(private _authStateService: AuthStateService,
    private _router: Router,
    private _sizeListenerService: WindowsSizeListenerService) {}

  ngOnInit(): void {

    this._subscribeWindowSizeChange();
    this._subscribeRouteChange();
    this._subscribeAuthState();
    this._updateMenuList();

  }

  private _subscribeWindowSizeChange(): void {

    this._sizeListenerService.getWindowSizeState().subscribe(newSize => {

      this.windowSize = newSize;

    });

  }

  private _subscribeAuthState(): void {
    this._authStateService.getAuthState().subscribe((state) => {

      this._authState = state;
      this._updateMenuList();

    });
  }

  private _subscribeRouteChange(): void {

    this._router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {

        const urlSegments = event.urlAfterRedirects.split('/');

        this.menuList.map(menu => {

          menu.isActive = false;
          menu.isChildActive = false;

          if (menu.route === urlSegments[1]) {

            menu.isActive = true;

          }

          if (menu.children && menu.children.length) {

            menu.children.map(childMenu => {

              childMenu.isActive = false;

              if (childMenu.route === urlSegments[1]) {

                childMenu.isActive = true;
                menu.isChildActive = true;
    
              }

            });

          }

        });

      }

    });

  }

  private _updateMenuList(): void {

    this.menuList = this._getAutherizedMenuList(CONST.MENU_LIST);

  }

  private _getAutherizedMenuList(menuItems: MenuItem[]): MenuItem[] {

    let authMenuList: MenuItem[] = [];

    menuItems.map(item => {

      if (item.screens && item.screens.length) {

        if (!this._authState || !this._authState.userAccessData || !this._authState.userAccessData.length) {

          return;

        }

        const haveRouteAutherized = this._authState.userAccessData.some(userAccess => {

          return item.screens.some(screenId => userAccess.screen_id === screenId && !!userAccess.accesslevel_id);

        });

        if (!haveRouteAutherized) {
          return;
        }

      }

      const newMenuItem = {...item};

      if (newMenuItem.children && newMenuItem.children.length) {

        newMenuItem.children = this._getAutherizedMenuList(newMenuItem.children);

      }

      authMenuList.push(newMenuItem);

    });

    return authMenuList;

  }

  public navigate(menu: MenuItem): void {

    if (menu.route) {
      this._router.navigateByUrl(menu.route);

      if(this.windowSize && this.windowSize.isMobile) {

        this.showMenu = false;

      }
    }

  }

}
