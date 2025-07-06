"use client";
import React from "react";
import styled from "styled-components";

export const H1 = styled.h1`
  color: var(--neutral-800);
  letter-spacing: 0.01em;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 58px;
  font-weight: 700;
  line-height: 1.034em;
`;

export const H2 = styled.h2`
  color: var(--neutral-800);
  letter-spacing: 0.03em;
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 38px;
  font-weight: 700;
  line-height: 1.237em;
`;

export const H3 = styled.h3`
  color: var(--neutral-800);
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.25em;
`;

export const H4 = styled.h4`
  color: var(--neutral-800);
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4em;
`;

export const H5 = styled.h5`
  color: var(--neutral-800);
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.222em;
`;

export const H6 = styled.h6`
  color: var(--neutral-800);
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.375em;
`;

export const PS = styled.p`
  font-size: 16px;
  line-height: 1.625em;
`;

export const PM = styled.p`
  font-size: 18px;
`;

export const PL = styled.p`
  font-size: 24px;
  line-height: 1.583em;
`;

export const A1 = styled.a`
  color: var(--primary-1);
  text-decoration: underline;
  transition: color 0.35s;
`;

export const Bold = styled.strong`
  color: var(--neutral-800);
  font-weight: 700;
`;

export const Italic = styled.em`
  font-style: italic;
`;

export const Psubtitle = styled.p`
  border: 1px solid var(--neutral-300);
  background-color: var(--neutral-100);
  color: var(--primary-1);
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 12px 14px;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.125em;
  display: inline-block;
  box-shadow: 0 1px 4px #0f0c3105, 0 5px 15px #5d4fff1f;
`;

export const BQ = styled.blockquote`
  border-left: 9px solid var(--primary-1);
  background-color: var(--neutral-100);
  color: var(--primary-1);
  border-radius: 8px 32px 32px 8px;
  margin-bottom: 10px;
  padding: 57px 77px 56px;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.5em;
  box-shadow: 0 4px 32px #080f3417;
`;

export const Ul = styled.ul`
  margin-top: 0;
  margin-bottom: 10px;
  padding-left: 40px;
`;

export const Ol = styled.ol`
  margin-top: 0;
  margin-bottom: 10px;
  padding-left: 40px;
`;

export const Li = styled.li`
  margin-bottom: 16px;
  display: list-item;
  text-align: -webkit-match-parent;
  unicode-bidi: isolate;
  list-style-type: disc;
`;
