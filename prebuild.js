const prebuildify = require('prebuildify')

const targets = [
  { platform: 'darwin', arch: 'arm64' },
  { platform: 'darwin', arch: 'x64' },
  { platform: 'linux', arch: 'arm64' },
  { platform: 'linux', arch: 'x64' },
  { platform: 'win32', arch: 'x64' },
  { platform: 'win32', arch: 'x86' }
]

function prebuild (i = 0) {
  const target = targets[i]

  if (!target) {
    return
  }

  const opts = { ...target, napi: true, strip: true }

  prebuildify(opts, (error) => {
    if (error) {
      console.error(error)
    }

    prebuild(i + 1)
  })
}

prebuild()
