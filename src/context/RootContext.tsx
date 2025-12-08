import React, { createContext, useContext, useMemo, useState } from "react";

export type Root = "india" | "china" | null;

export type RootContextValue = {
  currentRoot: Root;
  currentProfileName: string | null;
  lastViewedChapterIdByProfile: Record<string, string | null>;
  setCurrentRoot: (root: Root) => void;
  setCurrentProfileName: (name: string | null) => void;
  setLastViewedChapterForProfile: (profileName: string, chapterId: string) => void;
};

const RootContext = createContext<RootContextValue | undefined>(undefined);

export const RootProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoot, setCurrentRootState] = useState<Root>(null);
  const [currentProfileName, setCurrentProfileNameState] = useState<string | null>(null);
  const [lastViewedChapterIdByProfile, setLastViewedChapterIdByProfile] = useState<
    Record<string, string | null>
  >({});

  const setLastViewedChapterForProfile = (profileName: string, chapterId: string) => {
    setLastViewedChapterIdByProfile((prev) => ({
      ...prev,
      [profileName]: chapterId,
    }));
  };

  const setCurrentRoot = (root: Root) => {
    setCurrentRootState(root);
  };

  const setCurrentProfileName = (name: string | null) => {
    setCurrentProfileNameState(name);
  };

  const value = useMemo(
    () => ({
      currentRoot,
      currentProfileName,
      lastViewedChapterIdByProfile,
      setCurrentRoot,
      setCurrentProfileName,
      setLastViewedChapterForProfile,
    }),
    [currentRoot, currentProfileName, lastViewedChapterIdByProfile]
  );

  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
};

export const useRootContext = (): RootContextValue => {
  const ctx = useContext(RootContext);
  if (!ctx) {
    throw new Error("useRootContext must be used within a RootProvider");
  }
  return ctx;
};
