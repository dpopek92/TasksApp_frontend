import { useState } from "react";
import { debounce } from "lodash";

const debounceControledInput = debounce(
  (value: string, dispatch: (v: string) => void) => dispatch(value),
  700
);

export const useControledDebounce = () => {
  const [value, setValue] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useState<string>("");

  const handleDebouncedValue = (v: string) => {
    setValue(v);
    return debounceControledInput(v, setDebouncedValue);
  };

  return { value, debouncedValue, handleDebouncedValue };
};
