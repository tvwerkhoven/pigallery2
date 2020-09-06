import { Injectable } from '@angular/core';

export class ThemeVariable {
    public readonly varName: string;
    varValue: string;
    constructor(varName: string, value: string = '') {
        this.varName = varName;
        this.varValue = value;
    }
}

export class Theme {
    public readonly vars: Array<ThemeVariable>;
    constructor () {
        this.vars = [];
        this.vars.push(new ThemeVariable('--text-color'));
        this.vars.push(new ThemeVariable('--background-color'));
        this.vars.push(new ThemeVariable('--background-color-secondary'));
        this.vars.push(new ThemeVariable('--text-color-secondary'));
        this.vars.push(new ThemeVariable('--text-color-disabled'));
        this.vars.push(new ThemeVariable('--divider-color'));
        this.vars.push(new ThemeVariable('--blue','#94c5f9'));
        this.vars.push(new ThemeVariable('--primary','var(--blue)'));
    }
    public setVar(varName: string, varValue: string) {
      let tv = this.vars.find(v => v.varName == varName);
      if (tv) {
        tv.varValue = varValue;
      } else {
        throw new Error(varName + ' is not a valid Theme variable.');
      }
    }
}

export const themeDark = new Theme();
themeDark.setVar('--text-color', 'var(--light)');
themeDark.setVar('--background-color', 'var(--dark)');
themeDark.setVar('--text-color-secondary', 'var(--light)');
themeDark.setVar('--background-color-secondary', 'var(--gray)');
themeDark.setVar('--text-color-disabled', 'var(--gray)');
themeDark.setVar('--divider-color', 'var(--dark)');

export const themeLight = new Theme();
themeLight.setVar('--text-color', 'var(--dark)');
themeLight.setVar('--background-color','var(--light)');
themeLight.setVar('--text-color-secondary', 'var(--light)');
themeLight.setVar('--background-color-secondary', 'var(--gray)');
themeLight.setVar('--text-color-disabled', 'var(--gray)');
themeLight.setVar('--divider-color', 'var(--dark)');

@Injectable({ providedIn: 'root' })
export class ThemeService {
  setThemeDark() {
    this.setTheme(themeDark);
  }

  setThemeLight() {
    this.setTheme(themeLight);
  }

  private setTheme(theme: Theme) {
    for (let tv of theme.vars) {
        document.documentElement.style.setProperty(tv.varName, tv.varValue);
    }
  }
}
