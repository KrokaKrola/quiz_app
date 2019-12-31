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

export const baseUrl = 'https://opentdb.com/';

export const removeActiveState = () => {
    document.querySelectorAll('.Answers__item').forEach(item => {
        item.classList.remove('active');
    });
};