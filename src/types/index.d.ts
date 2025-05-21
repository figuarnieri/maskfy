export interface IMaskfyOptions {
  mask?: string;
  reverse?: boolean;
  keybind?: { [key: string]: RegExp };
  prefix?: string;
  suffix?: string;
}

export interface IMaskfyOptionsResponse {
  mask: string;
  reverse: boolean;
  keybind: { [key: string]: RegExp };
  prefix: string;
  suffix: string;
}

declare function maskfy(value: string, options?: IMaskfyOptions): string;

declare function maskfySettings(options: IMaskfyOptions): IMaskfyOptionsResponse;
