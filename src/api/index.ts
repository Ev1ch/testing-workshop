export type Get = <TResponse = unknown>(url: string) => Promise<TResponse>

export type Post = <TResponse>(url: string, data: unknown) => Promise<TResponse>

export const get: Get = (url) => new Promise((resolve) => {
  setTimeout(() => url, 1000)
})

export const post: Post = (url, data) => new Promise((resolve) => {
  setTimeout(() => url, 1000)
})