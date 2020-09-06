import {Injectable} from '@angular/core';
import {NetworkService} from '../../../model/network/network.service';
import {SettingsService} from '../settings.service';
import {AbstractSettingsService} from '../_abstract/abstract.settings.service';
import {ClientConfig} from '../../../../../common/config/public/ClientConfig';
import {ServerConfig} from '../../../../../common/config/private/PrivateConfig';

@Injectable()
export class UISettingsService extends AbstractSettingsService<ClientConfig.UIConfig> {
  constructor(private _networkService: NetworkService,
              _settingsService: SettingsService) {
    super(_settingsService);

  }

  showInSimplifiedMode(): boolean {
    return true;
  }

  public updateSettings(settings: ClientConfig.UIConfig): Promise<void> {
    return this._networkService.putJson('/settings/ui', {settings: settings});
  }

}
