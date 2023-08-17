interface Notification {
  id: Number
  type: "success" | "warning" | "error"
  message: string
}

interface Credential {
  email: string
  password: string
}

export { Notification, Credential }
