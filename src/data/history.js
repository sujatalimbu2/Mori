export const getTodayKey = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getSavedHistory = () => {
  const savedHistory = localStorage.getItem("mori-history");

  return savedHistory ? JSON.parse(savedHistory) : {};
};

export const saveHistory = (history) => {
  localStorage.setItem(
    "mori-history",
    JSON.stringify(history)
  );
};