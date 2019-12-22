// generate uniqueId based on time
export function uniqueId() {
    return (
        "_" +
        (
            Number(String(Math.random()).slice(2)) +
            Date.now() +
            Math.round(performance.now())
        ).toString(36)
    );
}