// The answers on this page are generated per `?q=` query, so every search
// would become its own thin, near-duplicate URL. Keep it out of the index
// while leaving it fully usable for visitors.
export const metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function AskLayout({ children }) {
  return children;
}
