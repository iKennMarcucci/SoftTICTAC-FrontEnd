import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { ejes } from "@/utils/ejes";

export function SelectEjes({ value, onValueChange }) {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Seleccione un eje" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Eje</SelectLabel>
          <SelectItem value={null}>Todos los ejes</SelectItem>
          {ejes.map((eje) => (
            <SelectItem key={eje.value} value={eje.value}>
              {eje.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
