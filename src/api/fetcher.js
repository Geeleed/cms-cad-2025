import { fetchGetJson, fetchPostJson } from "@/utils/pure_function";
import { apiPath } from "./path";

export const getTeam = async () =>
  await fetchGetJson({ url: apiPath.page.team });

export const getHome = async () =>
  await fetchGetJson({ url: apiPath.page.home });

export const getAbout = async () =>
  await fetchGetJson({ url: apiPath.page.about });

export const getApproach = async () =>
  await fetchGetJson({ url: apiPath.page.approach });

export const getContact = async () =>
  await fetchGetJson({ url: apiPath.page.contact });

export const getDoctor = async () =>
  await fetchGetJson({ url: apiPath.page.doctor });

export const getService = async () =>
  await fetchGetJson({ url: apiPath.page.service });

export const getVideo = async () =>
  await fetchGetJson({ url: apiPath.resource.video });

export const getArticle = async () =>
  await fetchGetJson({ url: apiPath.resource.article });

export const getNews = async () => await fetchGetJson({ url: apiPath.news });

export const getArticleWithIdArticle = async (id_article) =>
  await fetchGetJson({ url: `${apiPath.resource.article}/${id_article}` });

export const postArticle = async (payload) =>
  await fetchPostJson({ url: apiPath.resource.article, payload });

export const getVideoWithRevalidate = async ({ revalidate = 60 }) =>
  await fetchGetJson({
    url: apiPath.resource.video,
    nextOptions: { revalidate },
  });
