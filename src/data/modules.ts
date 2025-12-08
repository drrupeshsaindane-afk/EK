import { SAMPLE_VIDEO_URL } from "../config";

type ChapterType = "video" | "story";

export type Chapter = {
  id: string;
  title: string;
  type: ChapterType;
  shortDescription: string;
  videoUrl?: string;
};

export type Module = {
  id: string;
  root: "india" | "china";
  title: string;
  subtitle: string;
  chapters: Chapter[];
};

export const modules: Module[] = [
  {
    id: "module-india-1",
    root: "india",
    title: "India Basics",
    subtitle: "Simple highlights to start exploring",
    chapters: [
      {
        id: "chapter-india-story-1",
        title: "Indian Story Intro",
        type: "story",
        shortDescription: "Placeholder Indian culture story",
      },
    ],
  },
  {
    id: "module-china-1",
    root: "china",
    title: "China Basics",
    subtitle: "Introductory notes to explore",
    chapters: [
      {
        id: "chapter-china-story-1",
        title: "Chinese Story Intro",
        type: "story",
        shortDescription: "Placeholder Chinese culture story",
      },
      {
        id: "chapter-china-video-1",
        title: "Chinese Video Intro",
        type: "video",
        shortDescription: "Watch a sample video placeholder",
        videoUrl: SAMPLE_VIDEO_URL,
      },
    ],
  },
];

export const getModulesByRoot = (root: "india" | "china"): Module[] =>
  modules.filter((module) => module.root === root);

export const getModuleById = (id: string): Module | undefined =>
  modules.find((module) => module.id === id);

export const getChapterById = (id: string): Chapter | undefined => {
  for (const module of modules) {
    const chapter = module.chapters.find((ch) => ch.id === id);
    if (chapter) {
      return chapter;
    }
  }
  return undefined;
};
