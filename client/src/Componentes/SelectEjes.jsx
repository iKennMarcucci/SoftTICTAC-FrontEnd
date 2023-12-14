import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ejes } from "@/utils/ejes";

export function SelectEjes({ value, onValueChange }) {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Seleccione un eje" />
      </SelectTrigger>
      <SelectContent>
        {ejes.map((eje) => (
          <SelectItem key={eje.value} value={eje.value}>
            {eje.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
