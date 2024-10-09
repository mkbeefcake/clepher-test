const fetcher = (url: string) => {
    return fetch(url).then((response) => {
        if (response.ok) {
            return response.json()
        }

        const errorData = response.json()
        return {
            error: true,
        }
    })
}

export default fetcher