const hash = location.hash.substring(1).trim()
const href = location.origin + location.pathname
const authorized = [
    '2322a87e102a43974f815edd6d978dbba0e66a5b714d11470c9ffebebff00829'
]
if (location.hash === '') {
    location.href = `${href}404`
} else {
    window.onload = async () => {
        const textAsBuffer = new TextEncoder().encode(location.hash);
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', textAsBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const signature = hashArray.map((item) => item.toString(16).padStart(2, '0')).join('')
        console.log(`Signature: ${signature}`)
        let has = false
        for (let auth of authorized) {
            if (signature === auth) {
                has = true
                break
            }
        }
        if (!has) {
            location.href = `${href}404#${signature}`
        } else {
            localStorage.setItem('name', hash)
            localStorage.setItem('hahs', signature)
        }
    }
}