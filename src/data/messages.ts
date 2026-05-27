export interface Message {
  id: string;
  from: string;
  employer: string;
  subject: string;
  preview: string;
  time: string;
  priority: "high" | "normal";
  relatedJobId?: string;
}

export const messages: Message[] = [
  {
    id: "m1",
    from: "Sarah Kim",
    employer: "Stripe",
    subject: "Interview invite — Software Engineering Intern",
    preview: "We'd like to schedule your technical interview for next week...",
    time: "2h ago",
    priority: "high",
    relatedJobId: "1",
  },
  {
    id: "m2",
    from: "Handshake Employer",
    employer: "Notion",
    subject: "Application received",
    preview: "Thanks for applying to Frontend Developer Intern. We'll review...",
    time: "1d ago",
    priority: "high",
    relatedJobId: "3",
  },
  {
    id: "m3",
    from: "Recruiting Team",
    employer: "Acme Corp",
    subject: "Join our talent network",
    preview: "We have hundreds of open roles and think you'd be a great fit...",
    time: "3d ago",
    priority: "normal",
  },
  {
    id: "m4",
    from: "Career Fair Bot",
    employer: "Generic Inc",
    subject: "Don't miss the virtual career fair!",
    preview: "Register now for 200+ employers at this week's fair...",
    time: "5d ago",
    priority: "normal",
  },
];
