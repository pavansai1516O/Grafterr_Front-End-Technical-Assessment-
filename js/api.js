const API_URL = "./data/content.json";

export const api = {
  async fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const response = await fetch(API_URL);
          if (!response.ok) throw new Error("Network response was not ok");
          const data = await response.json();
          resolve(data);
        } catch (error) {
          reject(error);
        }
      }, 1500);
    });
  },
};
