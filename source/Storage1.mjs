export class Storage {
    static async setData(name, content) {
        try {
            const response = await fetch(
                `https://felipejanaina.000webhostapp.com/storage?name=${name}`,
                {
                    method: 'POST',
                    body: content,
                }
            )
            if (!response.ok) {
                throw new Error(response.text)
            }
            return true
        } catch (e) {
            console.error(e)
            return false
        }
    }

    static async getData(name) {
        try {
            const response = await fetch(
                `https://felipejanaina.000webhostapp.com/storage?name=${name}`
            )
            if (!response.ok) {
                throw new Error(response.text)
            }
            return response.text
        } catch (e) {
            console.error(e)
            return null
        }
    }
}