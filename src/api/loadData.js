import { fetchPostJson } from "@/utils/pure_function";
import { fetchData } from "./fetcher";
import { apiPath } from "./path";

const getLocale = async ({ params }) => {
  const temp = await params;
  const locale = (await temp?.locale) || "en";
  return locale;
};

export const load_system_word = async ({ params }) => {
  const locale = await getLocale({ params });
  const dictionay = await fetchData({
    resource_type: "system_word",
    name: `system_word_${locale}`,
  });
  return dictionay;
};

export const load_page_landing = async ({ params }) => {
  const locale = await getLocale({ params });
  const result = await fetchPostJson({
    url: apiPath.data_landing,
    payload: { locale },
  });
  const {
    sectionHome,
    sectionBasicInfo,
    sectionWelcome,
    sectionAbout,
    sectionTeam,
    sectionDoctor,
    sectionServices,
    sectionApproaches,
    sectionResources,
    sectionNews,
    sectionFooter,
  } = result;

  return {
    sectionHome,
    sectionBasicInfo,
    sectionWelcome,
    sectionAbout,
    sectionTeam,
    sectionDoctor,
    sectionServices,
    sectionApproaches,
    sectionResources,
    sectionNews,
    sectionFooter,
  };
};

export const load_page_team = async ({ params }) => {
  const page = "page_team";
  const locale = await getLocale({ params });
  const result = await fetchData({
    resource_type: page,
    name: `${page}_${locale}`,
  });
  return result;
};

export const load_page_about = async ({ params }) => {
  const page = "page_about";
  const locale = await getLocale({ params });
  const result = await fetchData({
    resource_type: page,
    name: `${page}_${locale}`,
  });
  return result;
};

export const load_page_services = async ({ params }) => {
  const page = "page_services";
  const locale = await getLocale({ params });
  const result = await fetchData({
    resource_type: page,
    name: `${page}_${locale}`,
  });
  return result;
};

export const load_page_doctor = async ({ params }) => {
  const page = "page_doctor";
  const locale = await getLocale({ params });
  const result = await fetchData({
    resource_type: page,
    name: `${page}_${locale}`,
  });
  return result;
};

export const load_page_approaches = async ({ params }) => {
  const page = "page_approaches";
  const locale = await getLocale({ params });
  const result = await fetchData({
    resource_type: page,
    name: `${page}_${locale}`,
  });
  return result;
};

export const load_page_resources = async ({ params }) => {
  const page = "page_resources";
  const locale = await getLocale({ params });
  const result = await fetchData({
    resource_type: page,
    name: `${page}_${locale}`,
  });
  return result;
};

export const load_page_news = async ({ params }) => {
  const page = "page_news";
  const locale = await getLocale({ params });
  const result = await fetchData({
    resource_type: page,
    name: `${page}_${locale}`,
  });
  return result;
};

export const load_footer = async ({ locale }) => {
  return await fetchPostJson({ url: apiPath.data_footer, payload: { locale } });
};
