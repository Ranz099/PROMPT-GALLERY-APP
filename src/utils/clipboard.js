import { toast } from './toast.js'


export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text)
        toast('Copied to clipboard')
    } catch {
        const ta = document.createElement('textarea')
        ta.value = text
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        toast('Copied to clipboard')
    }
}