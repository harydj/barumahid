import { cp, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const projectRoot = join(__dirname, '..')
const standaloneDir = join(projectRoot, '.next', 'standalone')
const publicSource = join(projectRoot, 'public')
const publicDest = join(standaloneDir, 'public')
const staticSource = join(projectRoot, '.next', 'static')
const staticDest = join(standaloneDir, '.next', 'static')

async function copyStaticAssets() {
  try {
    // Check if standalone directory exists
    if (!existsSync(standaloneDir)) {
      console.log('Standalone directory does not exist. Run "npm run build" first.')
      return
    }

    // Copy public folder
    if (existsSync(publicSource)) {
      console.log('Copying public folder to standalone...')
      await cp(publicSource, publicDest, { recursive: true })
      console.log('✓ Public folder copied successfully!')
    } else {
      console.log('⚠ Public folder does not exist, skipping...')
    }

    // Copy .next/static folder
    if (existsSync(staticSource)) {
      console.log('Copying .next/static folder to standalone...')
      // Ensure .next directory exists in standalone
      const standaloneNextDir = join(standaloneDir, '.next')
      if (!existsSync(standaloneNextDir)) {
        await mkdir(standaloneNextDir, { recursive: true })
      }
      await cp(staticSource, staticDest, { recursive: true })
      console.log('✓ Static folder copied successfully!')
    } else {
      console.log('⚠ .next/static folder does not exist, skipping...')
    }

    console.log('\n✓ All static assets copied successfully!')
  } catch (error) {
    console.error('Error copying static assets:', error)
    process.exit(1)
  }
}

copyStaticAssets()

