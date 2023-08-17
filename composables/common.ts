/*
 * Common Functions
 * */

interface FormError {
  [key: string]: String | Number
}

const applyErrors = function (formErrors: FormError, errors: any) {
  Object.keys(formErrors).forEach((key) => {
    // format:errors = { model: ['error message'] }
    formErrors[key] = errors[key] ? errors[key][0] : ""
  })
}
export { applyErrors }
