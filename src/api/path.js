const BASE_URL =
  typeof window === "undefined"
    ? `http://localhost:${process.env.PORT || 3000}/api`
    : "/api";

export const apiPath = {
  page: {
    home: `${BASE_URL}/page/home`,
    about: `${BASE_URL}/page/about`,
    approach: `${BASE_URL}/page/approach`,
    contact: `${BASE_URL}/page/contact`,
    doctor: `${BASE_URL}/page/doctor`,
    service: `${BASE_URL}/page/service`,
    team: `${BASE_URL}/page/team`,
  },
  resource: {
    video: `${BASE_URL}/resource/video`,
    article: `${BASE_URL}/resource/article`,
  },
  news: `${BASE_URL}/news`,
  data: `${BASE_URL}/data`,
  data_landing: `${BASE_URL}/data/landing`,
  data_footer: `${BASE_URL}/data/footer`,
};
