import { ComponentType } from "react";
export type LangCode =
    | 'th' | 'en' | 'zh' | 'ja' | 'ko'
    | 'vi' | 'id' | 'ms' | 'lo' | 'km'
    | 'my' | 'fr' | 'de' | 'es' | 'pt'
    | 'ru' | 'ar' | 'hi' | 'it' | 'nl'

export type LangItem = {
    code: LangCode,
    label: string,
    flag: string
}

export type Icon = ComponentType<{
  size?: number;
  className?: string;
}>;
export type Menu = {
    name: string;
    path: string;
    icon: Icon;
    link?: string;
    permission: string;
    children?: Omit<Menu, 'icon'>[]
}