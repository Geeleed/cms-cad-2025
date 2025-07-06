"use client";
import styled from "styled-components";

export const ButtonP = styled.label`
  background-color: var(--primary-1);
  color: var(--neutral-100);
  text-align: center;
  transform-style: preserve-3d;
  border-radius: 12px;
  padding: 24px 32px;
  font-weight: 700;
  line-height: 1.111em;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 0 var(--shadow-1);
`;

export const ButtonPS = styled.span`
  padding: 20px 24px;
  font-size: 16px;
  line-height: 1em;
`;

export const ButtonPrimarySmall = styled.span`
  padding: 20px 24px;
  font-size: 16px;
  line-height: 1em;
  background-color: var(--primary-1);
  color: var(--neutral-100);
  text-align: center;
  transform-style: preserve-3d;
  border-radius: 12px;
  font-weight: 700;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 0 var(--shadow-1);
  cursor: pointer;
  border: 0;
  text-decoration: none;
  display: inline-block;
  &:hover {
    color: var(--neutral-100);
    transform: translate3d(0, -4px, 0.01px);
    box-shadow: 0 4px 15px var(--shadow-2);
    outline: 0;
  }
`;

export const ButtonPrimaryMedium = styled.span`
  background-color: var(--primary-1);
  color: var(--neutral-100);
  text-align: center;
  transform-style: preserve-3d;
  border-radius: 12px;
  padding: 24px 32px;
  font-weight: 700;
  line-height: 1.111em;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 0 var(--shadow-1);
  cursor: pointer;
  border: 0;
  text-decoration: none;
  display: inline-block;
  &:hover {
    color: var(--neutral-100);
    transform: translate3d(0, -4px, 0.01px);
    box-shadow: 0 4px 15px var(--shadow-2);
    outline: 0;
  }
`;

export const ButtonPrimaryLarge = styled.span`
  padding: 24px 68px;
  font-size: 22px;
  line-height: 1.091em;
  background-color: var(--primary-1);
  color: var(--neutral-100);
  text-align: center;
  transform-style: preserve-3d;
  border-radius: 12px;
  font-weight: 700;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 0 var(--shadow-1);
  cursor: pointer;
  border: 0;
  text-decoration: none;
  display: inline-block;
  &:hover {
    color: var(--neutral-100);
    transform: translate3d(0, -4px, 0.01px);
    box-shadow: 0 4px 15px var(--shadow-2);
    outline: 0;
  }
`;

export const ButtonSecondarySmall = styled.span`
  padding: 20px 24px;
  font-size: 16px;
  line-height: 1em;
  border: 1px solid var(--neutral-300);
  background-color: var(--neutral-100);
  color: var(--primary-1);
  text-align: center;
  transform-style: preserve-3d;
  border-radius: 12px;
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s, color 0.3s,
    background-color 0.3s;
  box-shadow: 0 1px 3px var(--shadow-3), 0 2px 6px var(--shadow-4);
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  &:hover {
    color: var(--primary-1);
    transform: translate3d(0, -4px, 0.01px);
    box-shadow: 0 1px 3px var(--shadow-3), 0 5px 17px var(--shadow-5);
    outline: 0;
  }
`;

export const ButtonSecondaryMedium = styled.span`
  border: 1px solid var(--neutral-300);
  background-color: var(--neutral-100);
  color: var(--primary-1);
  text-align: center;
  transform-style: preserve-3d;
  border-radius: 12px;
  padding: 24px 32px;
  line-height: 1.111em;
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s, color 0.3s,
    background-color 0.3s;
  box-shadow: 0 1px 3px var(--shadow-3), 0 2px 6px var(--shadow-4);
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  &:hover {
    color: var(--primary-1);
    transform: translate3d(0, -4px, 0.01px);
    box-shadow: 0 1px 3px var(--shadow-3), 0 5px 17px var(--shadow-5);
    outline: 0;
  }
`;

export const ButtonSecondaryLarge = styled.span`
  padding: 24px 68px;
  font-size: 22px;
  line-height: 1.091em 24.002px;
  border: 1px solid var(--neutral-300);
  background-color: var(--neutral-100);
  color: var(--primary-1);
  text-align: center;
  transform-style: preserve-3d;
  border-radius: 12px;
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s, color 0.3s,
    background-color 0.3s;
  box-shadow: 0 1px 3px var(--shadow-3), 0 2px 6px var(--shadow-4);
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  &:hover {
    color: var(--primary-1);
    transform: translate3d(0, -4px, 0.01px);
    box-shadow: 0 1px 3px var(--shadow-3), 0 5px 17px var(--shadow-5);
    outline: 0;
  }
`;

export const NavLink = styled.span`
  color: var(--neutral-800);
  border-radius: 8px;
  padding: 10px 13px;
  font-size: 16px;
  line-height: 1.125em;
  text-decoration: none;
  transition: background-color 0.35s, color 0.35s;
  display: inline-block;
  background-color: #0000;
  cursor: pointer;
  &:hover {
    background-color: var(--secondary-1);
    color: var(--primary-1);
    outline: 0;
  }
`;
