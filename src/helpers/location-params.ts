export default {
  combine: (params: { [key: string]: string | string[] | number[] | undefined }) => {
    const result = Object.entries(params).reduce((acc: string[], param) => {
      const [key, value] = param;
      if (!value || !value.length) return acc;

      const formattedValue = typeof value === 'string' ? value : value.join(',');
      return [...acc, `${encodeURIComponent(key)}=${encodeURIComponent(formattedValue)}`]
    }, []).join('&');

    return result ? `?${result}` : '';
  },
};
