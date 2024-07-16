import { BaseEntity } from "src/entities/base-entity";
export type InputPatch<T> = { [K in keyof T]?: T[K] | null };

export function patchEntity<T extends BaseEntity, I extends InputPatch<T>>(
  entity: T,
  input: I,
): T {
  for (const key of Object.keys(entity)) {
    const value = input[key as keyof T];
    if (key === "customFields" && value) {
      patchEntity((entity as any)[key], value as any);
    } else if (value !== undefined && key !== "id") {
      entity[key as keyof T] = value as any;
    }
  }
  return entity;
}
