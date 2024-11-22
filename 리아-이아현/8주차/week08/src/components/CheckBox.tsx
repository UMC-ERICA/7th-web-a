import { ChangeEvent } from "react";

interface ICheckBox {
  id: number;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function CheckBox({ id, checked, onChange }: ICheckBox) {
  return (
    <>
      <input
        id={String(id)}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    </>
  );
}

export default CheckBox;
