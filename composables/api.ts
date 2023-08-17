import { useAppStore } from "~/stores/appStore"

const api = (endpoint: string, opts: any) => {
  return new Promise((resolve, reject) => {
    const config = Object.assign(
      {
        baseURL: "http://localhost/api/v1",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${useAppStore().getToken}`,
        },

        onResponseError(ctx: any) {
          switch (ctx.response.status) {
            // GET Error messages from Form Validation
            case 422:
              reject(ctx.response._data.errors)
              break

            case 401:
              // Logout and delete token
              useAppStore().logout()
              break
          }
        },
        onResponse(ctx: any) {
          if (ctx.response.status === 200) {
            resolve(ctx.response._data)
          }
        },
      },
      opts,
    )

    useFetch(endpoint, config)
  })
}

export { api }
