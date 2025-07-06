// const BASE_URL = "http://localhost:8000";
const BASE_URL = process.env.BASE_URL;

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
  },
};
