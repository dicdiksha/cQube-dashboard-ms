import { environment } from "src/environments/environment";

function formatNumber(number: number, formatter: any): string {

    if (formatter.format === 'short') {
        if (formatter.locale === 'en-IN') {
            if (number < 1000) {
                return `${number}`;
            } else if (number > 999 && number <= 99999) {
                return `${(number / 1000).toFixed(2)}K`;
            } else if (number > 99999 && number <= 9999999) {
                return `${(number / 100000).toFixed(2)}L`;
            } else {
                return `${(number / 10000000).toFixed(2)}Cr`;
            }
        } else {
            if (number < 1000) {
                return `${number}`;
            } else if (number > 999 && number <= 999999) {
                return `${(number / 100000).toFixed(2)}K`;
            } else if (number > 999999 && number <= 999999999) {
                return `${(number / 1000000).toFixed(2)}M`;
            } else {
                return `${(number / 1000000000).toFixed(2)}B`;
            }
        }
    }

    return new Intl.NumberFormat(formatter.locale).format(number);
}

function numberLabelFormat(number: number, config: any, axisRef?: any): string {
    if (typeof number === 'number') {
        if (config.locale === 'en-IN') {
            if (number < 1000) {
                return `${number}`;
            } else if (number > 999 && number <= 9999) {
                return `${number / 1000}K`;
            } else if (number > 9999 && number <= 9999999) {
                return `${number / 100000}L`;
            } else {
                return `${number / 10000000}Cr`;
            }
        } else {
            if (number < 1000) {
                return `${number}`;
            } else if (number > 999 && number <= 999999) {
                return `${(number / 100000).toFixed(2)}K`;
            } else if (number > 999999 && number <= 999999999) {
                return `${(number / 1000000).toFixed(2)}M`;
            } else {
                return `${(number / 1000000000).toFixed(2)}B`;
            }
        }
    }

    return number;
}

function removeFormat(string, config) {

    let result;
    let char = string.charAt(string.length - 1)
    let number = Number(string.split(char)[0])
    console.log(char, number)
    if (config.locale === 'en-IN') {
      if(char === 'K') {
        result = number*1000
      }
      else if(char === 'L') {
        result = number*100000
      }
      else if(char === 'Cr') {
        result = number*10000000
      }
    }
    else {
      if(char === 'K') {
        result = number*1000
      }
      else if(char === 'M') {
        result = number*1000000
      }
      else if(char === 'B') {
        result = number*1000000000
      }
    }
    return result;

}

export function formatNumberForReport(number: number, formatter?: any): string {
    formatter = formatter ? formatter : environment.numberFormat.reports;
    return formatNumber(number, formatter);
}

export function numberLabelFormatForReport(number: number, axisRef?: any): string {
    return numberLabelFormat(number, environment.numberFormat.reports, axisRef);
}

export function formatNumberForKeyMetric(number: number): string {
    return formatNumber(number, environment.numberFormat.reports);
}

export function numberLabelFormatForKeyMetric(number: number, axisRef?: any): string {
    return numberLabelFormat(number, environment.numberFormat.reports, axisRef);
}

export function formatNumberForVanityMetric(number: number): string {
    return formatNumber(number, environment.numberFormat.reports);
}

export function numberLabelFormatForVanityMetric(number: number, axisRef?: any): string {
    return numberLabelFormat(number, environment.numberFormat.reports, axisRef);
}
export function removeFormatForReport(number) {
    return removeFormat(number, environment.numberFormat.reports);
}
