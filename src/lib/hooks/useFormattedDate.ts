import { useState, useEffect } from 'react';

/**
 *
 * @param date
 * 직접적으로 클라이언트에서 Date를 조작하여 사용하기 위한 hook
 * @description 초기 hydration 과정에서 Server Date가 Client Date와 달라 발생하는 문제를 해결하기 위한 hook
 * @link https://github.com/vercel/next.js/discussions/38263
 */
const useFormattedDate = (date: Date | string) => {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(
    () => setFormattedDate(new Date(date).toLocaleDateString()),
    [date],
  );

  return formattedDate;
};

export default useFormattedDate;
