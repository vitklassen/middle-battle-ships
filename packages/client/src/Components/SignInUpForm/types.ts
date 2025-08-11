export interface submitData {
  // затычка ленивой типизации
  [key: string]: string
}

export type FormItem = {
  pageName: string
  submitText: string
  fields: formField[]
}

type formField = {
  name: string
  requiredError: string
  placeholder: string
  minLength?: lenghtObject
  maxLength?: lenghtObject
  pattern?: patternObject
}

type lenghtObject = {
  value: number
  message: string
}

type patternObject = {
  value: RegExp
  message: string
}
