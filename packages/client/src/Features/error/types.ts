export type Error = {
  reason: string
  status?: number
}

export type ErrorState = {
  value: Error | null
}
