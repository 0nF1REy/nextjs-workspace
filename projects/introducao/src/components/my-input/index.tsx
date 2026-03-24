import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { HTMLProps, RefAttributes } from 'react';
import { LabelProps } from '@radix-ui/react-label';

interface IMyInputProps {
    labelProps: LabelProps & RefAttributes<HTMLLabelElement>;
    labelText: string;
    inputProps: HTMLProps<HTMLInputElement>;
}

export default function MyInputComponent ({labelProps, inputProps, labelText}: IMyInputProps) {
    return (
        <div className="grid gap-2">
        <Label {...labelProps}>{labelText}</Label>
        <Input {...inputProps} />
      </div>
    );
}