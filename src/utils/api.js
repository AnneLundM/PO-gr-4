const API_BASE_URL = "https://gowala-t3pes.ondigitalocean.app";

export async function fetchJson(path, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
        const response = await fetch(`${API_BASE_URL}${path}`, {
            ...options,
            signal: controller.signal,
        });

        if (!response.ok) {
            throw new Error("API'et svarede ikke korrekt.");
        }

        return await response.json();
    } catch (err) {
        if (err.name === "AbortError") {
            throw new Error("Serveren svarer ikke. Prøv igen om lidt.", { cause: err });
        }
        if (!navigator.onLine) {
            throw new Error("Du ser ud til at være offline. Tjek din internetforbindelse.", { cause: err });
        }
        throw err;
    } finally {
        clearTimeout(timeout);
    }
}
