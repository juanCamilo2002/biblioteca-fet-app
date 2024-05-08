export const formatterDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
};