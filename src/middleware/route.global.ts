export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== from.path && process.client) {
      const mainElement = document.getElementById('main')
      if (!mainElement) return

      if (to.hash) {
          findEl(to.hash, 0).then((hashElement: HTMLElement) => mainElement.scrollTo({ top: (hashElement.offsetTop ?? 0) + window.innerHeight, behavior: 'smooth' }))
      }

      return mainElement.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

const findEl = async (hash: string, x: number): Promise<HTMLElement> => {
  return (
      document.querySelector<HTMLElement>(hash) ||
      new Promise((resolve, reject) => {
          if (x > 20) {
              return reject()
          }
          setTimeout(() => {
              resolve(findEl(hash, x++ || 1))
          }, 250)
      })
  )
}
