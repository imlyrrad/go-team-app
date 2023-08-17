/**
 * setCookie = allow you to set cookies
 * @param name
 * @param value
 * @param days
 */
const setCookie = (name: string, value: number, days: number) => {
  let expires = ""
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = "; expires=" + date.toUTCString()
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/"
}

/**
 * getCookie = allow you to get cookies values
 * @param name
 */
const getCookie = (name: string) => {
  const nameEQ = name + "="
  const ca = document.cookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == " ") c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

/**
 * deleteCookie = allow you to delete cookies values
 * @param name
 */
const deleteCookie = (name: string) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
}

export { setCookie, getCookie, deleteCookie }
