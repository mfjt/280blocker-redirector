const BASE_URI: string = 'https://280blocker.net/files/'

export async function handleRequest(request: Request): Promise<Response> {
  let filename: string = request.url.slice(request.url.lastIndexOf('/') + 1)
  if (!filename) {
    return new Response(null, {
      status: 400,
    })
  }

  let extensionIndex: number = filename.lastIndexOf('.')
  let extension: string =
    extensionIndex >= 0 ? filename.slice(extensionIndex) : ''
  let baseName: string = extension
    ? filename.slice(0, -extension.length)
    : filename

  let date: Date = new Date()
  var year: string = date.getFullYear().toString()
  let month: string = ('0' + (date.getMonth() + 1)).slice(-2)
  let redirectTo: string = BASE_URI + baseName + '_' + year + month + extension

  return Response.redirect(redirectTo, 303)
}
