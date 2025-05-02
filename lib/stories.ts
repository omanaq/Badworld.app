// lib/stories.ts
import {
  generateAlienationStory,
  generateExistentialBreakdownStory,
  generateFacingTruthStory,
  generateInternalConflictStory,
  generateNostalgiaStory,
  generatePastPresentConflictStory,
  generateRebellionStory,
} from './story-content';

// Additional dummy content for missing chapters
function generateStory8() { return '<p>فصل تجريبي رقم 8</p>'; }
function generateStory9() { return '<p>فصل تجريبي رقم 9</p>'; }
function generateStory10() { return '<p>فصل تجريبي رقم 10</p>'; }
function generateStory11() { return '<p>فصل تجريبي رقم 11</p>'; }
function generateStory12() { return '<p>فصل تجريبي رقم 12</p>'; }
function generateStory13() { return '<p>فصل تجريبي رقم 13</p>'; }
function generateStory14() { return '<p>فصل تجريبي رقم 14</p>'; }
function generateStory15() { return '<p>فصل تجريبي رقم 15</p>'; }
function generateStory16() { return '<p>فصل تجريبي رقم 16</p>'; }

export const allStories = [
  {
    id: 1,
    title: "الفصل 1",
    image: "/images/story-1.jpg",
    getContent: generateAlienationStory
  },
  {
    id: 2,
    title: "الفصل 2",
    image: "/images/story-2.jpg",
    getContent: generateExistentialBreakdownStory
  },
  {
    id: 3,
    title: "الفصل 3",
    image: "/images/story-3.jpg",
    getContent: generateFacingTruthStory
  },
  {
    id: 4,
    title: "الفصل 4",
    image: "/images/story-4.jpg",
    getContent: generateInternalConflictStory
  },
  {
    id: 5,
    title: "الفصل 5",
    image: "/images/story-5.jpg",
    getContent: generateNostalgiaStory
  },
  {
    id: 6,
    title: "الفصل 6",
    image: "/images/story-6.jpg",
    getContent: generatePastPresentConflictStory
  },
  {
    id: 7,
    title: "الفصل 7",
    image: "/images/story-7.jpg",
    getContent: generateRebellionStory
  },
  {
    id: 8,
    title: "الفصل 8",
    image: "/images/story-8.jpg",
    getContent: generateStory8
  },
  {
    id: 9,
    title: "الفصل 9",
    image: "/images/story-9.jpg",
    getContent: generateStory9
  },
  {
    id: 10,
    title: "الفصل 10",
    image: "/images/story-10.jpg",
    getContent: generateStory10
  },
  {
    id: 11,
    title: "الفصل 11",
    image: "/images/story-11.jpg",
    getContent: generateStory11
  },
  {
    id: 12,
    title: "الفصل 12",
    image: "/images/story-12.jpg",
    getContent: generateStory12
  },
  {
    id: 13,
    title: "الفصل 13",
    image: "/images/story-13.jpg",
    getContent: generateStory13
  },
  {
    id: 14,
    title: "الفصل 14",
    image: "/images/story-14.jpg",
    getContent: generateStory14
  },
  {
    id: 15,
    title: "الفصل 15",
    image: "/images/story-15.jpg",
    getContent: generateStory15
  },
  {
    id: 16,
    title: "الفصل 16",
    image: "/images/story-16.jpg",
    getContent: generateStory16
  }
]
