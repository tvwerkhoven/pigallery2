import {Component} from "@angular/core";
import {MapSettingsService} from "./map.settings.service";
import {SettingsComponent} from "../_abstract/abstract.settings.component";
import {AuthenticationService} from "../../model/network/authentication.service";
import {NavigationService} from "../../model/navigation.service";
import {NotificationService} from "../../model/notification.service";
import {ClientConfig} from "../../../../common/config/public/ConfigClass";

@Component({
  selector: 'settings-map',
  templateUrl: './map.settings.component.html',
  styleUrls: ['./map.settings.component.css',
    './../_abstract/abstract.settings.component.css'],
  providers: [MapSettingsService],
})
export class MapSettingsComponent extends SettingsComponent<ClientConfig.MapConfig> {

  constructor(_authService: AuthenticationService,
              _navigation: NavigationService,
              _settingsService: MapSettingsService,
              notification: NotificationService) {
    super("Map", _authService, _navigation, <any>_settingsService, notification);
  }


}


