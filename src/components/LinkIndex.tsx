import type { IndexGroup } from "@/content/site";

// Directory-style list with dot leaders, like the index at the back of a book.
export default function LinkIndex({ groups }: { groups: IndexGroup[] }) {
  return (
    <div className="index-grid">
      {groups.map((group) => (
        <div className="index-group" key={group.title}>
          <h3>{group.title}</h3>
          <ul data-reveal="stagger">
            {group.items.map((item) => (
              <li key={item.name}>
                <a href={item.href}>
                  <span className="name">{item.name}</span>
                  <span className="leader" />
                  <span className={item.href.startsWith("http") ? "detail ext" : "detail"}>{item.detail}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
