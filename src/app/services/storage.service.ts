import { Injectable } from '@angular/core';
import { defaultConfig } from '../configs/default-config';
import { Config } from '../models/config.model';
import { PlayerData } from '../models/player-data.model';

const CONFIG_KEY = 'CONFIG';
const ENDLESS_MODE_KEY = 'ENDLESS_MODE';
const PLAYER_DATA_KEY = 'PLAYER_DATA';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  getConfig(): Config {
    const defaultValue = { ...defaultConfig, name: 'Current' };
    return this.read(CONFIG_KEY, defaultValue);
  }

  setConfig(config: Config): void {
    this.write(CONFIG_KEY, config);
  }

  getPlayerData(): PlayerData | undefined {
    return this.read(PLAYER_DATA_KEY);
  }

  setPlayerData(playerData: PlayerData): void {
    this.write(PLAYER_DATA_KEY, playerData);
  }

  getEndlessMode(): boolean {
    return this.read(ENDLESS_MODE_KEY, true);
  }

  setEndlessMode(endlessMode: boolean): void {
    this.write(ENDLESS_MODE_KEY, endlessMode);
  }

  private read(key: string, defaultValue?: any): any {
    const json = localStorage.getItem(key);
    return json ? JSON.parse(json) : defaultValue;
  }

  private write(key: string, value: any): void {
    const json = JSON.stringify(value);
    localStorage.setItem(key, json);
  }
}
