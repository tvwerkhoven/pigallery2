import {Component} from '@angular/core';
import {SettingsComponent} from '../_abstract/abstract.settings.component';
import {AuthenticationService} from '../../../model/network/authentication.service';
import {NavigationService} from '../../../model/navigation.service';
import {NotificationService} from '../../../model/notification.service';
import {UISettingsService} from './ui.settings.service';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {ClientConfig} from '../../../../../common/config/public/ClientConfig';
import {ThemeService} from '../../../theme.service';


@Component({
  selector: 'app-settings-ui',
  templateUrl: './ui.settings.component.html',
  styleUrls: ['./ui.settings.component.css',
    '../_abstract/abstract.settings.component.css'],
  providers: [UISettingsService],
})
export class UISettingsComponent
  extends SettingsComponent<ClientConfig.UIConfig> {

  constructor(_authService: AuthenticationService,
              _navigation: NavigationService,
              _settingsService: UISettingsService,
              notification: NotificationService,
              i18n: I18n,
              private _themeService: ThemeService) {
    super(i18n('User Interface'), _authService, _navigation, _settingsService, notification, i18n, s => s.Client.UI);
  }

  public async save(): Promise<boolean> {
    const val = await super.save();
    // Apply new theme if save as successful
    if (val === true) {
      const config = this.stateToSettings();
      if (config.darkMode) {
        this._themeService.setThemeDark();
      } else {
        this._themeService.setThemeLight();
      }
    }
    return val;
  }

}



