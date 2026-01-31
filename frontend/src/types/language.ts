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
