import { getPlural, Plural } from 'src/helpers/get-plural';

export default function formatDuration(duration: number, pluralHours: Plural, pluralMinutes: Plural) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return [getValue(hours, getPlural(hours, pluralHours)), getValue(minutes, getPlural(minutes, pluralMinutes))].filter(Boolean).join(' ');
}

function getValue(value: number, postfix: string) {
  return value ? `${value} ${postfix}` : undefined;
}

