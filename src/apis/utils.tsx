export const fetcher = (url: string) => {
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

export const buildQueryString = (baseUrl: string, obj: any): string => {
    const params = new URLSearchParams();

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (value === undefined) {
                continue; // Skip undefined values
            }

            // Handle arrays by joining values
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    params.append(key, String(item)); // Append each item in the array
                });
            } 
            else if (typeof value === "object" && value !== null) {
                // Handle nested objects (optional)
                for (const subKey in value) {
                    if (value.hasOwnProperty(subKey)) {
                        params.append(`${key}[${subKey}]`, String(value[subKey]));
                    }
                }
            } 
            else {
                params.set(key, String(value)); // Set other values as strings
            }
        }
    }

    return `${baseUrl}?${params.toString()}`;
}

export const removeNumericPrefixes = (obj: any): any => {
    let newData: any = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (value === undefined) {
                continue; // Skip undefined values
            }
            
            const newKey = key.replace(/^\d+\.\s*/, '');
            newData[newKey] = String(value); 
        }
    }
    return newData
}
