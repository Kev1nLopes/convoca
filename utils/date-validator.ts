import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions
} from 'class-validator';
import { isAfter, isBefore, subYears } from 'date-fns';


export function DataNascimentoValidator(validationOptions: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsValidBirthdate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!(value instanceof Date)) {
            console.log("Não é uma data válida")
            return false
          }

          const today = new Date();
          const eightyYearAgo = subYears(today, 80);

          return (
            isBefore(value, today) && isAfter(value, eightyYearAgo)
          )
        },
        defaultMessage(args: ValidationArguments) {
          return 'Data de nascimento deve ser uma data válida no passado'
        },
      }
    })
    }
}
