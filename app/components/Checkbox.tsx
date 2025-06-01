"use client";

import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

export default function CustomCheckbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <Checkbox
      icon={<RadioButtonUncheckedIcon sx={{ color: "#B3B3B3" }} />}
      checkedIcon={<CheckCircleIcon sx={{ color: "#B3B3B3" }} />}
      checked={checked}
      onChange={onChange}
    />
  );
}

