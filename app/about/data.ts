export type Milestone = {
  year: number;
  title: string;
  story: string;
  achievement: string;
  image: string;
  alt: string;
};

export type Leader = {
  role: string;
  name: string;
  description: string;
  image: string;
  alt: string;
  linkedin: string;
};

export const milestones: Milestone[] = [
  {
    year: 1988,
    title: "A school begins with a big idea",
    story:
      "ABC School opens its doors with a simple promise: every child deserves to be known, encouraged, and challenged. A close-knit first community lays the foundations for a school built around belonging.",
    achievement: "The first classrooms welcome our founding students.",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=85",
    alt: "A historic school building in warm afternoon light",
  },
  {
    year: 2000,
    title: "Growing together",
    story:
      "A new century brings new families and fresh possibilities. ABC grows its learning spaces while holding on to the personal care and community spirit that shaped its early years.",
    achievement: "A new campus brings more room to learn and play.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85",
    alt: "Students learning together in a bright classroom",
  },
  {
    year: 2012,
    title: "Learning beyond the classroom",
    story:
      "Hands-on projects, creative arts, and meaningful service become an even bigger part of the student experience. Learning connects to the world outside school walls.",
    achievement: "Project-based learning and community partnerships take root.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=85",
    alt: "Students collaborating on a classroom activity",
  },
  {
    year: 2024,
    title: "A community without borders",
    story:
      "As the world changes, ABC strengthens its focus on global understanding, thoughtful technology, and the skills students need to make a positive difference.",
    achievement: "A refreshed global learning program connects students and ideas.",
    image:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=85",
    alt: "Students sharing ideas in a sunlit learning space",
  },
  {
    year: 2026,
    title: "The next chapter is yours",
    story:
      "Today, the ABC community keeps looking ahead. We are building on generations of care and curiosity, making space for every student to find their voice and shape what comes next.",
    achievement: "Celebrating 38 years of learning, belonging, and growth.",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85",
    alt: "A welcoming modern school campus",
  },
];

export const leaders: Leader[] = [
  {
    role: "Board of Trustees",
    name: "Guiding our community",
    description:
      "Our trustees steward the school’s mission and long-term vision, bringing care, experience, and a commitment to students’ futures.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85",
    alt: "School community members meeting together",
    linkedin:
      "https://www.linkedin.com/search/results/companies/?keywords=ABC%20School",
  },
  {
    role: "Principal",
    name: "Leading with purpose",
    description:
      "Our principal works alongside teachers, students, and families to make sure every learner feels seen, supported, and ready to grow.",
    image:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=900&q=85",
    alt: "Educator smiling in a bright school setting",
    linkedin:
      "https://www.linkedin.com/search/results/people/?keywords=ABC%20School%20Principal",
  },
];
