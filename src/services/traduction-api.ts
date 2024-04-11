interface Status {
  [key: number]: string;
}

export const statusCode: Status =
{
  200: 'tormenta con lluvia ligera',
  201: 'tormenta con lluvia',
  202: 'tormenta con lluvia intensa',
  210: 'tormenta ligera',
  211: 'tormenta',
  212: 'tormenta intensa',
  221: 'tormenta irregular',
  230: 'tormenta con llovizna ligera',
  231: 'tormenta con llovizna',
  232: 'tormenta con llovizna intensa',
  300: 'llovizna de intensidad ligera',
  301: 'llovizna',
  302: 'llovizna de intensidad fuerte',
  310: 'llovizna de intensidad ligera',
  311: 'lluvia',
  312: 'llovizna de intensidad fuerte',
  313: 'aguaceros lluvia y llovizna',
  314: 'lluvia intensa lluvia y llovizna',
  321: 'lluvia fina',
  500: 'lluvia ligera',
  501: 'lluvia moderada',
  502: 'lluvia intensa',
  503: 'lluvia muy intensa',
  504: 'lluvia extrema',
  511: 'lluvia helada',
  520: 'lluvia de intensidad ligera',
  521: 'aguacero de lluvia',
  522: 'aguacero de lluvia con intensidad fuerte',
  531: 'aguacero de lluvia irregular',
  600: 'nieve ligera',
  601: 'nieve',
  602: 'nieve fuerte',
  611: 'aguanieve',
  612: 'aguanieve con aguacero ligero',
  613: 'aguacero de nieve',
  615: 'lluvia ligera y nieve',
  616: 'lluvia y nieve',
  620: 'lluvia de intensidad ligera y nieve',
  621: 'aguacero de lluvia y nieve',
  622: 'aguacero de lluvia con intensidad fuerte y nieve',
  701: 'niebla',
  711: 'humo',
  721: 'nebulosa',
  731: 'polvo arena/polvo remolinos',
  741: 'vapor',
  751: 'arena',
  761: 'polvo',
  762: 'ceniza volcánica',
  771: 'tempestad, tormenta del mar',
  781: 'tornado',
  800: 'Cielo despejado',
  801: 'pocas nubes: 11-25%',
  802: 'nubes dispersas: 25-50%',
  803: 'nubes fragmentadas: 51-84%',
  804: 'cubierto: 85-100%',
}

export const translateDescription = (id: number): string | null => {
  const translated = statusCode[id];
  return translated ? translated : null;
};